# Configuración de Automatización en EC2

Este documento explica cómo configurar la ejecución diaria de los tests de Cypress en tu instancia de EC2.

## Requisitos Previos

1.  **Git**: El repositorio debe estar clonado en la instancia.
2.  **Node.js & npm**: Instálalos con estos comandos (versión 20.x recomendada):
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
    ```
3.  **Cypress Dependencies**: Asegúrate de que las dependencias de sistema de Cypress estén instaladas:
    ```bash
    sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb
    ```
4.  **Google Chrome**: Tus scripts están configurados para usar Chrome. Instálalo con:
    ```bash
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    sudo apt install -y ./google-chrome-stable_current_amd64.deb
    ```

## Configuración de Git (SSH)

Para que el script pueda hacer `git pull` automáticamente sin pedir contraseña, debes configurar una **SSH Key**:

1. **Genera la llave** en el EC2:
   ```bash
   ssh-keygen -t ed25519 -C "ec2-automation"
   # Presiona Enter a todo (sin passphrase)
   ```

2. **Copia la llave pública**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

3. **Agrégala a GitLab**:
   - Ve a tu proyecto en GitLab -> **Settings** -> **Repository**.
   - Busca la sección **Deploy keys**.
   - Haz clic en **Add key**.
   - Pégale el contenido que copiaste y ponle un título (ej: "EC2 Automation").

4. **Clona el repositorio** (una vez configurada la llave):
   ```bash
   git clone git@gitlab.com:aa-dev/uisolution-apollo.git
   ```

*(Nota: Si ya habías clonado el repo usando HTTPS, tendrías que cambiar el remoto a SSH con `git remote set-url origin git@gitlab.com:aa-dev/uisolution-apollo.git`).*

5. **Prueba la conexión**:
   ```bash
   ssh -T git@gitlab.com
   ```

## Pasos de Configuración

### 1. Preparar el script

Asegúrate de que el script sea ejecutable:

```bash
chmod +x scripts/automate_tests.sh
```

### 2. Configurar variables de entorno

Crea un archivo llamado `.env.automation` en la raíz del proyecto para guardar la URL del webhook y otras configuraciones:

```bash
# .env.automation
WEBHOOK_URL="TU_URL_DE_GOOGLE_CHAT"
REPORT_BASE_URL="http://TU_IP_O_DOMINIO"
TEST_ENV="TST"
REPO_BRANCH="main"
```

### 3. Programar los Cron Jobs

Para correr los tests en distintos ambientes, pasa el nombre del ambiente como argumento (`TST` o `PROD`):

```bash
crontab -e
```

Añade las líneas para cada ejecución (ej: Testing a las 8 AM, Prod a las 9 AM):

```cron
0 8 * * * /home/ubuntu/uisolution-apollo/scripts/automate_tests.sh TST
0 9 * * * /home/ubuntu/uisolution-apollo/scripts/automate_tests.sh PROD
```

## Cómo ver los reportes desde la Web

Para que el link que llega al chat funcione, no basta con tener el puerto 80 "abierto" en AWS. Abrir el puerto es como abrir la puerta de una casa, pero **necesitas que alguien esté adentro para atender el pedido** (ese es el servidor web). Sin un proceso como Nginx escuchando, el navegador dirá "conexión rechazada".

### Configuración con Nginx (Recomendado)

1. **Instala Nginx**:
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

2. **Crea los links simbólicos**:
   Este paso hace que la carpeta de reportes sea accesible desde la web:
   ```bash
   # Para Testing (tst)
   sudo ln -fnsv /home/ubuntu/uisolution-apollo/jsonlogs/report_tst /var/www/html/reports/tst
   
   # Para Producción (prod)
   sudo ln -fnsv /home/ubuntu/uisolution-apollo/jsonlogs/report_prod /var/www/html/reports/prod
   ```

3. **Verifica el Firewall**: Asegúrate de que el puerto 80 esté abierto en el "Security Group" de AWS.

Ahora, los links del chat (ej: `http://TU-IP/reports/tst/index.html`) deberían abrir el reporte automáticamente.
