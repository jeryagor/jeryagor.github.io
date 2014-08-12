---
layout: default
title: "Installation du SDK Tizen sur Windows 8"
date: "2013-06-26"
description: "Tizen, le nouvel OS mobile, a de quoi plaire. Suivez le guide, installez le SDK Tizen sur Windows 8 et commencez à coder dès maintenant !"
excerpt: |
  Tizen, le nouvel OS mobile de la Linux Foundation soutenu notamment par Samsung et Intel, a de quoi plaire.
  Mais avez-vous tous les outils pour vous lancer dans l'aventure ?
  Suivez le guide, installez le SDK Tizen sur Windows 8 et commencez à coder le plus rapidement possible !
category: tizen
---

[Tizen](https://www.tizen.org/ "Site officiel de Tizen") est le nouveau système d'exploitation mobile de la Linux Foundation, soutenu par de nombreux industriels dont Intel et Samsung. Destiné à un usage multi-plateformes (smartphones, tablettes, TV connectées, automobile...), il devrait être officiellement disponible dès la rentrée sur un téléphone Samsung haut de gamme. Quoi d'étonnant pour un développeur de s'essayer à ce nouvel environnement ? C'est ce que je vous propose de faire tout de suite, sans quitter votre Windows 8, en installant le SDK Tizen.

## Prérequis

Avant de commencer, vous devez installer la dernière version du JDK en vous rendant sur le [site d'Oracle](http://www.oracle.com/technetwork/java/javase/downloads/index.html "Téléchargement du JDK") (le JRE ne suffit pas !).

Vous allez également avoir besoin de l'Install Manager de Tizen, disponible sur le [site officiel de Tizen](https://developer.tizen.org/downloads/tizen-sdk "Téléchargement du SDK Tizen") : la version Windows 7 64 bits fera l'affaire.

## Installation du SDK Tizen

A l'heure de l'écriture de cet article, le SDK Tizen en est à sa version 2.1.4 et son installation nécessite quelques petites bidouilles, d'où la nécessité de ce tutoriel.

Si vous essayez d'exécuter l'Install Manager fraîchement téléchargé, vous risquez de tomber sur une horrible erreur comme celle ci-dessous.

![Message d'erreur au lancement de l'Install Manager du SDK Tizen](/img/uploads/01_Message_Erreur_Install_Manager_Tizen.png)

Je vous propose donc de suivre le guide :

* Installez [7-Zip](http://www.7-zip.org/ "Site officiel de 7-Zip") et lancez "7-Zip File Manager".
* Naviguez jusqu'à l'endroit où se trouve l'exécutable du SDK Tizen sur votre disque et sélectionnez-le : il s'agit d'une archive que vous allez "Extraire".

![Extraction du SDK Tizen](/img/uploads/02_Extraire_Install_Manager_Tizen.png)

* L'extraction a créé un nouveau répertoire contenant un ensemble de fichiers dont un nouvel exécutable et un fichier InstallManager.jar.

![SDK Tizen extrait](/img/uploads/03_Install_Manager_Extrait.png)

* Ouvrez une invite de commande en mode administrateur (Windows + X puis "Invite de commandes (admin)" sous Windows 8), naviguez vers le dossier extrait puis lancez InstallManager.jar (voir les commandes ci-dessous).

`cd C:\Users\Jeremy\Downloads\tizen-sdk-windows64-v2.1.4`

`javaw -jar InstallManager.jar`

* Suivez l'assistant d'installation du SDK Tizen de manière classique : il y aura tout d'abord une phase de téléchargement (environ 1.8 Go pour la version 2.1 du SDK) et une phase d'installation. Pendant l'installation, il vous sera proposé  d'installer Intel Hardware Accelerated Execution Manager (HAXM), à faire absolument pour éviter tout problème avec l'émulateur ultérieurement.

Une fois l'installation terminée, il faut changer le raccourci vers l'IDE car celui créé par défaut (tizen-sdk\ide\IDE.exe) ne fonctionne pas sous Windows 8 (erreur au lancement) et l'exécutable launcher.exe ne donne pas de meilleurs résultats (l'IDE se bloque dans une boucle CPU à la création / au lancement d'une application Web). A la place, créez un raccourci pointant vers tizen-sdk\ide\**eclipse.exe**. Au besoin, pour récupérer l'icône de l'IDE, un fichier .ico se trouve dans tizen-sdk\ide\resources\icons.

Si vous ne souhaitez pas utiliser l'IDE, il est possible de tout faire en ligne de commandes avec [Tizen CLI](/post/tizen-cli-application-ligne-commandes "Développement d'applications Tizen en ligne de commandes CLI"), ce qui ravira au passage les détracteurs d'Eclipse. :)
