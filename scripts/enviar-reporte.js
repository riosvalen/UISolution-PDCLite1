const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');


const SMTP_CONFIG = {
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: 'a191cb001@smtp-brevo.com',
        pass: process.env.BREVO_SMTP_PASS  // Tu Master Password de Brevo
    }
};

const EMAIL_DETAILS = {
    from: '"Cypress Automation" <vrios+allure@alquilerargentina.com>',
    to: 'vrios@alquilerargentina.com, fcornier@alquilerargentina.com, ptoloza@alquilerargentina.com, agiraudo@alquilerargentina.com', // Lista de destinatarios
    subject: `Reporte de Pruebas Apollo - ${new Date().toLocaleDateString()}`,
};

// ---------------------

async function zipReport(sourceDir, outPath) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => resolve());
        archive.on('error', (err) => reject(err));

        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
}

function getStatsFromResultDir(resultsDir) {
    const stats = { total: 0, passed: 0, failed: 0, skipped: 0, viewport: 'N/A', failures: [] };
    try {
        if (!fs.existsSync(resultsDir)) return null;

        const files = fs.readdirSync(resultsDir);
        files.forEach(file => {
            if (file.endsWith('-result.json')) {
                const content = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
                stats.total++;
                if (content.status === 'passed') {
                    stats.passed++;
                } else if (content.status === 'failed' || content.status === 'broken') {
                    stats.failed++;
                    // Capturar el nombre de la prueba fallida
                    stats.failures.push(content.name || 'Prueba sin nombre');
                } else {
                    stats.skipped++;
                }
            }
        });

        // Get viewport from environment.properties
        const envPath = path.join(resultsDir, 'environment.properties');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const viewportLine = content.split('\n').find(l => l.startsWith('Viewport='));
            if (viewportLine) stats.viewport = viewportLine.split('=')[1];
        }
    } catch (e) {
        console.warn(`Error procesando resultados en ${resultsDir}:`, e);
    }
    return stats;
}

function generateStatsCard(title, stats, color) {
    if (!stats) return '';
    const passRate = stats.total > 0 ? ((stats.passed / stats.total) * 100).toFixed(1) : 0;

    let failuresHtml = '';
    if (stats.failures.length > 0) {
        failuresHtml = `
            <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #dc3545;">
                <p style="margin: 0 0 5px 0; color: #dc3545; font-weight: bold;">⚠️ Pruebas que fallaron:</p>
                <ul style="margin: 0; padding-left: 20px; color: #666; font-size: 14px;">
                    ${stats.failures.map(f => `<li style="margin-bottom: 3px;">${f}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    return `
        <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; border-left: 5px solid ${color}; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">${title} (Viewport: ${stats.viewport})</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                <tr>
                    <td style="padding: 8px 0;">Total de Pruebas:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${stats.total}</td>
                </tr>
                <tr style="color: #28a745;">
                    <td style="padding: 8px 0;">✅ Pasaron:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${stats.passed}</td>
                </tr>
                <tr style="color: #dc3545;">
                    <td style="padding: 8px 0;">❌ Fallaron:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${stats.failed}</td>
                </tr>
                <tr style="color: #6c757d;">
                    <td style="padding: 8px 0;">⏭️ Saltados:</td>
                    <td style="padding: 8px 0; font-weight: bold;">${stats.skipped}</td>
                </tr>
                <tr style="font-size: 18px; border-top: 2px solid #ddd;">
                    <td style="padding: 15px 0; font-weight: bold;">📈 Tasa de Éxito:</td>
                    <td style="padding: 15px 0; font-weight: bold;">${passRate}%</td>
                </tr>
            </table>
            ${failuresHtml}
        </div>
    `;
}

function getEnvironmentInfo(resultsDir) {
    try {
        const envPath = path.join(resultsDir, 'environment.properties');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const lines = content.split('\n').filter(line => line.trim() !== '');
            let envHtml = `
                <div style="background-color: #f8f9fa; border-radius: 8px; padding: 15px; border-left: 5px solid #6c757d; margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #333;">🌍 Información del Entorno</h3>
                    <table style="width: 100%; border-collapse: collapse;">
            `;
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key !== 'Viewport') { // Skip viewport here as it's in the cards
                    envHtml += `
                        <tr>
                            <td style="padding: 5px 0; font-weight: bold; color: #555; width: 40%;">${key}:</td>
                            <td style="padding: 5px 0; color: #333;">${value}</td>
                        </tr>
                    `;
                }
            });
            envHtml += '</table></div>';
            return envHtml;
        }
    } catch (e) {
        console.warn('No se pudo leer environment.properties.');
    }
    return '';
}

function getSummaryStats() {
    const desktopPath = path.join(__dirname, '../allure-results/desktop');
    const mobilePath = path.join(__dirname, '../allure-results/mobile');
    const generalPath = path.join(__dirname, '../allure-results');

    const desktopStats = getStatsFromResultDir(desktopPath);
    const mobileStats = getStatsFromResultDir(mobilePath);
    const generalStats = getStatsFromResultDir(generalPath);

    // Get environmental info from the first valid directory
    const envHtml = getEnvironmentInfo(desktopStats ? desktopPath : (mobileStats ? mobilePath : generalPath));

    let html = envHtml;
    let globalTotal = 0;
    let globalPassed = 0;

    if (desktopStats && desktopStats.total > 0) {
        html += generateStatsCard('💻 Resumen Desktop', desktopStats, '#007bff');
        globalTotal += desktopStats.total;
        globalPassed += desktopStats.passed;
    }

    if (mobileStats && mobileStats.total > 0) {
        html += generateStatsCard('📱 Resumen Mobile', mobileStats, '#fd7e14');
        globalTotal += mobileStats.total;
        globalPassed += mobileStats.passed;
    }

    if (!html && generalStats && generalStats.total > 0) {
        html += generateStatsCard('📊 Resumen General', generalStats, '#28a745');
        globalTotal += generalStats.total;
        globalPassed += generalStats.passed;
    }

    return {
        html: html || '<p>No se encontraron resultados de pruebas.</p>',
        globalTotal,
        globalPassed
    };
}

async function sendEmail() {
    const reportDir = path.join(__dirname, '../allure-report');
    const zipPath = path.join(__dirname, '../allure-report.zip');

    if (!fs.existsSync(reportDir)) {
        console.error('La carpeta allure-report no existe. Genera el reporte primero.');
        process.exit(1);
    }

    console.log('Comprimiendo reporte...');
    await zipReport(reportDir, zipPath);
    console.log('Reporte comprimido con éxito.');

    const { html: statsHtml, globalTotal, globalPassed } = getSummaryStats();

    // Calcular icono según tasa de éxito global (90%)
    const globalPassRate = globalTotal > 0 ? (globalPassed / globalTotal) * 100 : 0;
    const statusIcon = globalPassRate >= 90 ? '✅' : '❌';

    // Try to get environment for the subject
    let envName = 'N/A';
    const desktopPath = path.join(__dirname, '../allure-results/desktop');
    const targetEnvPath = path.join(fs.existsSync(desktopPath) ? desktopPath : path.join(__dirname, '../allure-results'), 'environment.properties');
    if (fs.existsSync(targetEnvPath)) {
        const content = fs.readFileSync(targetEnvPath, 'utf8');
        const envLine = content.split('\n').find(l => l.startsWith('ENV='));
        if (envLine) envName = envLine.split('=')[1].trim();
    }

    const transporter = nodemailer.createTransport(SMTP_CONFIG);

    const mailOptions = {
        ...EMAIL_DETAILS,
        subject: `Reporte de Pruebas Apollo [${envName}] ${statusIcon} - ${new Date().toLocaleDateString()}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="text-align: center; color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">📋 Reporte de Automatización Apollo</h2>
                <p style="color: #666;">Hola,</p>
                <p style="color: #666;">Se ha completado una nueva ejecución de pruebas automatizadas. Este es el resumen de lo mas importante:</p>
                
                ${statsHtml}
                
                <p style="color: #666; font-size: 13px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                    Saludos,<br>
                    <strong>QA Team Alquiler Argentina</strong>
                </p>
            </div>
        `,
        /* attachments: [
            {
                filename: 'allure-report.zip',
                path: zipPath
            }
        ] */
    };

    console.log('Enviando email...');
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar el email:', error);
    } finally {
        // Opcional: eliminar el zip después de enviar
        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    }
}

sendEmail();
