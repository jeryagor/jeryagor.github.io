---
layout: default
title: "Migration WordPress : déplacer votre blog sur un nouveau serveur"
date: "2013-09-03"
description: "Une marche à suivre pour réussir la migration Wordpress sur un nouveau serveur, accompagnée d'une piqûre de rappel pour l'installation d'un serveur web."
excerpt: |
  Dans cet article, découvrez une marche à suivre pour réussir la migration de votre blog Wordpress sur un nouveau serveur.
  Pour ceux qui, comme moi, se tournent vers du dédié / VPS, vous trouverez également une petite piqûre de rappel concernant l'installation d'un serveur web.
category: wordpress
---

En cas de changement de serveur pour l'hébergement de votre blog, vous aurez probablement envie de conserver toutes vos données (contenu, extensions, configuration...). Voici une démarche à suivre pour réussir votre migration WordPress.

**Notes :**

* Les personnes utilisant un hébergement mutualisé disposant déjà d'un serveur Web fonctionnel peuvent passer directement à la partie "Migration de WordPress sur le nouveau serveur".
* La démarche qui suit a été testée sous Debian 7, certains aménagements peuvent être nécessaire pour d'autres distributions, en particulier dans la phase d'installation !
* L'article suppose que les commandes sont exécutée en root. Dans le cas contraire, il vous faudra ajouter des *sudo* devant la plupart des commandes.

## Installation des outils web

Tout d'abord, voici quelques notes, pas forcément détaillées, pour installer et configurer tous vos outils Web. C'est nécessaire si vous disposez d'un serveur dédié nu, sinon autant passer directement à la partie traitant de la migration WordPress.

### Installation d'un serveur web Apache

```
apt-get install apache2
/etc/init.d/apache2 start
```

Un petit accès sur l'IP de votre serveur pour confirmer que l'installation s'est bien déroulée, vous devriez avoir la page ci-dessous.

![Page de confirmation du fonctionnement d'Apache](/img/uploads/test_apache.png)

### Installation d'un serveur FTP

```
apt-get install proftpd
```

Sélectionnez un serveur "standalone" dans la majorité des cas.

proftpd se sert des utilisateurs enregistrés sur système mais l'accès root n'est pas possible par défaut, question de sécurité j'imagine. Il faut donc créer un nouvel utilisateur afin de pouvoir vous connecter en FTP :

```
adduser USER_NAME
```

Il vous faudra saisir le mot de passe et quelques autres informations sur ce nouvel utilisateur.

Vous pouvez tester avec votre client FTP que tout fonctionne bien.

### Installation d'un serveur MySQL

```
apt-get install mysql-server
```

Il vous sera demandé de saisir un mot de passe root pour votre base.

On sécurise tout ça :

```
mysql_secure_installation
```

*   Change the root password? > y si vous avez laissé un mot de passe vide, n sinon
*   Remove anonymous users? > y
*   Disallow root login remotely? > y
*   Remove test database and access to it? > y
*   Reload privilege tables now? > y

### Installation de phpMyAdmin

```
apt-get install phpmyadmin
```

Choisir apache2 comme serveur web. Il vous sera également demandé de saisir le mot de passe permettant d'accéder à votre base de données ainsi que celui que vous souhaitez utiliser pour phpMyAdmin.

phpmyadmin ne semblant pas s'installer par défaut dans /var/www, il faudra créer un lien symbolique pour que apache sache où aller chercher :

```
ln -s /usr/share/phpmyadmin /var/www/phpmyadmin
```

### Installation d'un serveur SMTP

Une dernière installation, pour pouvoir envoyer des mails, ça peut être utile pour un formulaire de contact sur votre blog !

```
apt-get install sendmail
```

### Configuration d'un hôtel virtuel

Pour créer un nouvel hôte virtuel, il faut créer un nouveau fichier dans le répertoire /etc/apache2/sites-available/

Par exemple, pour un site ayant pour alias MON_SITE:

```
nano /etc/apache2/sites-available/MON_SITE
```

Dans ce fichier, copier le contenu suivant en remplaçant les valeurs en majuscules :

```
<VirtualHost *:80>
  DocumentRoot /var/www/MON_SITE
  ServerAdmin EMAIL_ADMIN
  ServerName MON_SITE.fr
  ServerAlias MON_SITE.com
  <Directory /var/www/MON_SITE>
    Order Allow,Deny
    Allow from All
  </Directory>
  ErrorLog /var/log/apache2/MON_SITE-error_log
  TransferLog /var/log/apache2/MON_SITE-access_log
</VirtualHost>
```

Il faut ensuite ajouter ce nouvel hôte et redémarrer Apache :

```
a2ensite MON_SITE
/etc/init.d/apache2 restart
```

Tout est prêt, place à la migration WordPress.

## Migration de WordPress sur le nouveau serveur {#part2}

Nous voici arrivés à la migration WordPress en elle-même ! Rien de bien compliqué, rassurez-vous.

### Copie des données

Sur votre ancien serveur, rendez-vous via FTP dans votre répertoire WordPress et  récupérez :

* L'intégralité du dossier wp-content ;
* Le fichier .htaccess.

Via phpMyAdmin, toujours sur l'ancien serveur, faites une copie du contenu de la base :

* Sélectionnez la base de données utilisée par WordPress.
* Dans l'onglet "Exporter", sélectionnez l'option Personnalisée et sélectionnez toutes les tables de WordPress (préfixe *wp_* par défaut) et cliquez sur Exécuter.

Un fichier .sql est téléchargé, gardez-le de côté.

### Installation fraîche

Sur le nouveau serveur, faites une [nouvelle installation de WordPress](http://fr.wordpress.org/txt-install/ "Installation de WordPress").

### Restauration des données

Une fois la nouvelle installation terminée, supprimez le dossier wp-content et remplacez-le par l'ancien. Profitez-en pour copier votre fichier .htaccess à la racine du nouveau répertoire.

Pour restaurer le contenu de la base de données, commencez par supprimer toutes les tables de la nouvelle base dans phpMyAdmin :

* Sélectionnez la base à vider.
* Cliquez sur Tout sélectionner en bas de la liste des tables.
* Choisissez Supprimer dans le menu déroulant puis acceptez la suppression.

Ensuite, dans l'onglet SQL, collez le contenu du fichier .sql téléchargé plus haut et exécutez l'ensemble de requêtes.

### Activation de la réécriture d'URL

Sur mon serveur dédié, je me suis rendu compte que la réécriture d'URL n'était pas activée : seule ma page d'accueil était accessible, les autres pages utilisant des règles de réécriture.

Cette étape peut être passée dans le cas des hébergements mutualisés : si le module de réécriture n'est pas activé, demandez à votre hébergeur. Pour les autres, voici comment activer le module de réécriture :

```
a2enmod rewrite
```

Déplacez le fichier .htaccess de votre ancien blog à la racine du nouveau répertoire WordPress. Chez moi, ce fichier ressemble à ça :

```
# BEGIN WordPress

RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# END WordPress
```

Un petit redémarrage d'Apache et c'est bon :

```
/etc/init.d/apache2 restart
```

### Mise à jour des DNS

Auprès du gestionnaire de votre nom de domaine, vous devrez changer le serveur vers lequel pointe votre nom de domaine.

Par exemple, chez OVH, rendez-vous dans la Zone DNS et modifiez l'IP pointée par l'enregistrement de type A, comme montré sur les images ci-dessous :

![Accès à la zone DNS sur OVH](/img/uploads/dns_01.png)

![Modification de l'IP pointée pour la migration WordPress](/img/uploads/dns_02.png)

La propagation peut prendre de quelques minutes à plusieurs heures d'après la documentation OVH, ça a été plutôt rapide dans mon cas.

Votre migration WordPress est à présent terminée. Est-ce que tout fonctionne comme vous le souhaitiez ? :)

## Problèmes courants

Selon le serveur sur lequel vous migrez, vous pourriez rencontrer différents problèmes, par exemple :

* Les permissions des fichiers : il vous faudra peut-être revoir les permissions d'accès pour que WordPress ait bien tous les accès en lecture / écriture nécessaires. Il peut notamment arriver que WordPress vous demande sans cesse vos identifiants FTP lors de modifications de thèmes ou d'installations d'extensions : dans ce cas, il faudra veiller à assigner les fichiers au groupe correspondant au serveur Web (*www-data* généralement).
* Les extensions pour PHP qui ne sont pas toujours présentes par défaut : je pense notamment à GD (*apt-get install php5-gd*).
