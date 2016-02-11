---
layout: post
title: "Sauvegarde automatique sur WD My Book Live sous Ubuntu"
description: "Une marche à suivre détaillée sous Ubuntu pour mettre en place des sauvegardes automatiques de vos données sur un disque réseau WD My Book Live."
category: mybooklive
redirect_from:
  - /post/sauvegarde-my-book-live-ubuntu/
  - /sauvegarde-my-book-live-ubuntu/
---

J'ai récemment acquis un disque dur réseau Western Digital, le dénommé My Book Live, afin de faire des sauvegardes incrémentales de mes données personnelles (les photos abondent vite et je ne souhaite plus payer de l'espace de stockage en ligne).

## Accès au My Book Live par SSH

Commençons par activer l'accès au disque par SSH sans avoir à saisir de mot de passe, étape essentielle pour automatiser le processus de sauvegarde.

* Connectez votre My Book Live au réseau local.
* Ouvrez un navigateur et rendez-vous sur [http://mybooklive/](http://mybooklive/ "Accès à la page d'administration du My Book Live") : on vous proposera de choisir une langue et vous pourrez créer des comptes utilisateurs / dossier de partage comme vous le souhaitez.
* Rendez-vous ensuite sur [http://mybooklive/UI/ssh](http://mybooklive/UI/ssh "Page d'activation du SSH sur le My Book Live") et cochez "Activer SSH" : par défaut, l'identifiant est "root" et le mot de passe "welc0me" (avec un zéro à la place du O).
* Dans une console, connectez vous en ssh sur le disque et changez le mot de passe root :

```sh
ssh root@MyBookLive
passwd root
```

*   Sur votre ordinateur, générez une clé RSA dans votre dossier personnel :

```sh
ssh-keygen -t rsa
```

*   Créez un répertoire caché .ssh sur le NAS et ajoutez-y la clé, il vous sera demandé de saisir votre mot de passe root pour le disque :

```sh
ssh root@MyBookLive mkdir -p .ssh
cat .ssh/id_rsa.pub | ssh root@MyBookLive 'cat >> .ssh/authorized_keys'
ssh root@MyBookLive
chmod -R go-rwx .ssh
exit
```

A partir de maintenant, vous pouvez vous connecter sur votre disque My Book Live sans saisir votre mot de passe (depuis la machine où a été générée la clé uniquement, bien entendu), un premier pas vers l'automatisation. Pour cela, il vous suffira de :

```sh
ssh root@MyBookLive
```

## Sauvegarde des données avec rsync

Maintenant, voilà un tout petit script que j'ai appelé sync\_data\_nas.sh et qui va synchroniser votre répertoire personnel avec un répertoire présent sur le My Book Live (des commentaires ont été ajoutés directement dans le script pour une meilleure lisibilité) :

```sh
# Répertoire local à synchroniser
# Dans mon cas, je synchronise le dossier personnel
LOCAL_DIR=/home/jeremy/

# Adresse de votre répertoire personnel sur le disque réseau (ici, le My Book Live)
# Par défault, les partages créés via l'interface utilisateur se trouvent dans /shares
REMOTE_DIR=root@MyBookLive:/shares/jeremy/

# Lancement de la synchronisation
# Options utilisées pour rsync :
# --delete : supprime du disque réseau tous les fichiers qui n'existent plus en local
# --size-only : utilise uniquement les tailles des fichiers pour déterminer si un fichier a été modifié depuis le dernier backup (plus rapide)
# --filter : filtre les fichiers qu'on ne souhaite pas sauvegarder (dans mon cas, les fichiers temporaires suffixés avec '~', les répertoires cachés commençant par '.' et le dossier "Téléchargements")
rsync -ar $LOCAL_DIR $REMOTE_DIR --delete --size-only --progress --filter "- *~" --filter "- .*" --filter "- Téléchargements"
```

La première copie peut être longue selon la quantité de donnée que vous stockez. Pour cette première copie, vous pouvez même opter pour une copie directe des plus gros répertoires, la copie directe étant bien plus rapide que rsync.

## Planification de sauvegardes régulières

Pour exécuter le script périodiquement, une tâche cron fera l'affaire.

Pour éditer la table de configuration de Cron :

```sh
crontab -e
```

La syntaxe pour spécifier la tâche à exécuter et le moment où elle est exécutée est la suivante :

```text
minute heure jour mois jour_semaine commande
```

Une valeur peut être remplacée par * pour signifer que toute valeur de ce champ est acceptable.

Dans mon cas, je veux l'exécuter chaque jour à 20h30, j'ajoute donc la ligne suivante en pointant vers le répertoire où le script sync\_data\_nas.sh se trouve :

```text
30 20 * * * SCRIPT_FOLDER/sync_data_nas.sh
```

Ctrl + O et Entrée pour sauvegarder.

Et c'est réglé, vos données seront sauvegardées régulièrement et automatiquement sur votre My Book Live !
