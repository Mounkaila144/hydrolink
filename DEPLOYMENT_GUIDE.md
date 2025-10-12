# Guide de Déploiement - Commandes Sans Frontière

Ce guide détaille les étapes pour déployer l'application e-commerce sur le serveur avec Apache et PHP 8.2.

### Installation et Configuration
```bash
# Aller dans le répertoire backend
cd /var/www/hydrolink/hydrolinkbacken

# Installer les dépendances Composer (production)
composer install

# Copier et configurer l'environnement
cp .env.example .env
nano .env
```

### Configuration .env pour la Production
```env
APP_NAME="Commandes Sans Frontière"
APP_ENV=production
APP_KEY=base64:VOTRE_CLE_GENEREE
APP_DEBUG=false
APP_URL=https://hydrolink.ptrniger.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hydrolink_db
DB_USERNAME=root
DB_PASSWORD=mounkaila144

# JWT Configuration
JWT_SECRET=VOTRE_JWT_SECRET

# Queue Configuration
QUEUE_CONNECTION=database

# Cache Configuration
CACHE_DRIVER=file
SESSION_DRIVER=file
```

### Commandes de Déploiement Laravel
```bash
# Générer la clé d'application
php artisan key:generate

# Exécuter les migrations
php artisan migrate --force

# Optimisations pour la production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Appliquer les modifications CORS
php artisan config:clear
php artisan config:cache

# Créer le lien symbolique pour le storage
php artisan storage:link

# Installer les dépendances Node.js et construire les assets

```

## 2. Préparation du Frontend Next.js

### Configuration des Variables d'Environnement
```bash
# Aller dans le répertoire frontend
cd /var/www/hydrolink

# Copier et configurer l'environnement
cp .env.local.example .env.local
nano .env.local
```

### Configuration .env.local pour la Production
```env
# Backend API URLs
NEXT_PUBLIC_BACKEND_URL=https://hydrolink.ptrniger.com
NEXT_PUBLIC_API_BASE_URL=https://hydrolink.ptrniger.com/api

# Environnement
NODE_ENV=production
```

### Commandes de Déploiement Next.js
```bash
# Installer les dépendances
npm install

# Construire pour la production
npm run build

# Installer PM2 globalement (si pas déjà installé)
npm install -g pm2

# Démarrer l'application Next.js avec PM2
pm2 start npm --name "hydrolink" -- start

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
```

## 3. Configuration Apache

### Créer le fichier VirtualHost
Créer le fichier `/etc/apache2/sites-available/hydrolink.ptrniger.com.conf` :

```apache
 <VirtualHost *:443>
      ServerName hydrolink.ptrniger.com
      DocumentRoot /var/www/html

      # SSL Configuration
      SSLEngine on
      SSLCertificateFile /etc/letsencrypt/live/hydrolink.ptrniger.com/fullchain.pem
      SSLCertificateKeyFile /etc/letsencrypt/live/hydrolink.ptrniger.com/privkey.pem
      Include /etc/letsencrypt/options-ssl-apache.conf

      # Enable RewriteEngine
      RewriteEngine On

      # Handle API requests - rewrite to Laravel backend
      RewriteCond %{REQUEST_URI} ^/api/(.*)$
      RewriteRule ^/api/(.*)$ /var/www/hydrolink/hydrolinkbacken/public/index.php [L]

      # Handle storage files - serve from Laravel
      RewriteCond %{REQUEST_URI} ^/storage/(.*)$
      RewriteRule ^/storage/(.*)$ /var/www/hydrolink/hydrolinkbacken/storage/app/public/$1 [L]

      # Everything else - proxy to Next.js
      RewriteCond %{REQUEST_URI} !^/api/
      RewriteCond %{REQUEST_URI} !^/storage/
      RewriteRule ^/(.*)$ http://localhost:3030/$1 [P,L]

      # Enable proxy modules
      ProxyRequests Off
      ProxyPreserveHost On

      # Laravel backend directory configuration
      <Directory /var/www/hydrolink/hydrolinkbacken/public>
          Options -Indexes +FollowSymLinks
          AllowOverride All
          Require all granted
          DirectoryIndex index.php
      </Directory>

      # Storage directory configuration
      Alias /storage /var/www/hydrolink/hydrolinkbacken/storage/app/public
      <Directory /var/www/hydrolink/hydrolinkbacken/storage/app/public>
          Options -Indexes +FollowSymLinks
          AllowOverride None
          Require all granted
      </Directory>
  </VirtualHost>
```

### Activation du Site
```bash
# Activer les modules Apache nécessaires
a2enmod proxy
a2enmod proxy_http
a2enmod rewrite
a2enmod ssl
a2enmod headers
a2enmod deflate
a2enmod expires

# Activer le site
a2ensite hydrolink.ptrniger.com.conf

# Tester la configuration Apache
apache2ctl configtest

# Redémarrer Apache
systemctl reload apache2
```

## 4. Configuration des Permissions

```bash
# Configurer les permissions pour Laravel
sudo chown -R www-data:www-data /var/www/hydrolink/hydrolinkbacken
sudo chmod -R 755 /var/www/hydrolink/hydrolinkbacken
sudo chmod -R 775 /var/www/hydrolink/hydrolinkbacken/storage
sudo chmod -R 775 /var/www/hydrolink/hydrolinkbacken/bootstrap/cache

# Sécuriser le fichier .env
sudo chmod 600 /var/www/hydrolink/hydrolinkbacken/.env

# Configurer les permissions pour Next.js
sudo chown -R www-data:www-data /var/www/hydrolink
sudo chmod -R 755 /var/www/hydrolink
```

## 5. Configuration SSL avec Let's Encrypt

```bash
# Obtenir le certificat SSL pour le domaine
sudo certbot --apache -d hydrolink.ptrniger.com
```

## 7. Vérifications Post-Déploiement

### Vérifier les Services
```bash
# Vérifier PM2
pm2 status

# Vérifier les logs
sudo tail -f /var/log/apache2/hydrolink.ptrniger-error.log
pm2 logs hydrolink --lines 20
```

### Vérifier les Variables d'Environnement
```bash
# Vérifier que les variables sont correctes
cd /var/www/hydrolink
cat .env.local

# Les URLs doivent pointer vers le domaine de production :
# NEXT_PUBLIC_BACKEND_URL=https://hydrolink.ptrniger.com
# NEXT_PUBLIC_API_BASE_URL=https://hydrolink.ptrniger.com/api
```

### Tests Fonctionnels
1. **Frontend** : Accéder à `https://hydrolink.ptrniger.com`
2. **API Backend** : Tester `https://hydrolink.ptrniger.com/api/health`
3. **Storage** : Vérifier l'accès aux images `https://hydrolink.ptrniger.com/storage/`

## 8. Maintenance et Mises à Jour

### Commandes de Maintenance Laravel
```bash
# Nettoyer les caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Reconstruire les caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations
php artisan migrate --force
```

### Commandes de Maintenance Next.js
```bash
# Redéployer le frontend
cd /var/www/hydrolink
npm run build
pm2 restart hydrolink

# Vérifier les logs PM2
pm2 logs hydrolink

# Redémarrer PM2 si nécessaire
pm2 restart hydrolink
pm2 status
```

## 9. Sauvegarde

### Script de Sauvegarde Automatique
```bash
#!/bin/bash
# /usr/local/bin/backup-commande.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/commande"
PROJECT_DIR="/var/www/hydrolink"

# Créer le répertoire de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
mysqldump -u commande_user -p'VOTRE_MOT_DE_PASSE' commande_db > $BACKUP_DIR/commande_db_$DATE.sql

# Sauvegarder les fichiers
tar -czf $BACKUP_DIR/commande_files_$DATE.tar.gz -C $PROJECT_DIR .

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -type f -mtime +7 -delete
```

### Configurer la Sauvegarde Automatique
```bash
# Rendre le script exécutable
sudo chmod +x /usr/local/bin/backup-commande.sh

# Ajouter au crontab pour une sauvegarde quotidienne à 2h du matin
sudo crontab -e
# Ajouter : 0 2 * * * /usr/local/bin/backup-commande.sh
```

## 10. Surveillance et Logs

### Fichiers de Logs Importants
- Apache : `/var/log/apache2/hydrolink.ptrniger-error.log`
- Laravel : `/var/www/hydrolink/hydrolinkbacken/storage/logs/laravel.log`
- PM2 : `pm2 logs hydrolink`

### Commandes de Surveillance
```bash
# Surveiller les logs en temps réel
sudo tail -f /var/log/apache2/hydrolink.ptrniger-error.log
sudo tail -f /var/www/hydrolink/hydrolinkbacken/storage/logs/laravel.log
pm2 logs hydrolink --lines 50

# Vérifier l'espace disque
df -h

# Vérifier l'utilisation mémoire
free -h

# Vérifier les processus
ps aux | grep php
ps aux | grep node
```

---

**Note** : Remplacer tous les `VOTRE_MOT_DE_PASSE` et `VOTRE_CLE` par des valeurs sécurisées réelles lors du déploiement.