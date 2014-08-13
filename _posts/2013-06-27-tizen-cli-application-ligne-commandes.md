---
layout: post
title: "Tizen CLI : application Tizen en ligne de commandes"
date: 2013-06-27
description: "Le SDK Tizen est fourni avec tous les outils pour déployer votre application en dehors de Tizen IDE. Découvrez les commandes de Tizen CLI !"
category: tizen
redirect_from:
  - /post/tizen-cli-application-ligne-commandes/
  - /tizen-cli-application-ligne-commandes/
---

Que vous soyez amateur de lignes de commandes ou détracteur d'Eclipse (sur lequel Tizen IDE s'appuie), Tizen CLI (Command Line Interface) vous fournit tous les outils nécessaires au déploiement d'une application mobile.

L'article suppose que vous avez déjà [installé le SDK Tizen](/post/installation-du-sdk-tizen-sur-windows-8 "Tutoriel d'installation du SDK Tizen sur Windows 8") !

## Découverte de Tizen CLI

La plupart des scripts qui nous intéressent se trouvent dans le répertoire tizen-sdk\tools\ide\bin (tizen-sdk étant le répertoire d'installation du SDK Tizen).

Pour la version 2.1.4 du SDK, 18 scripts sont présents dans ce répertoire :

![Scripts Tizen CLI](/img/uploads/01_Tizen_CLI_Scripts.png)

Ces scripts sont scindés en deux parties : les scripts liés au développement d'applications Web (web-\*) et ceux liés au développement d'applications natives (native-\*). La documentation officielle de Tizen CLI se trouve [ici](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.web.appprogramming%2Fhtml%2Fide_sdk_tools%2Fcommand_line_interface.htm "Documentation Tizen CLI pour applications Web") et [là](https://developer.tizen.org/dev-guide/2.2.0/?topic=%2Forg.tizen.native.appprogramming%2Fhtml%2Fide_sdk_tools%2Fcommand_line_interface.htm "Documentation Tizen CLI pour applications natives").

Vous aurez également besoin du [certificate generator](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Fcertificate_generator.htm "Certificate generator") livré avec le SDK Tizen : celui-ci se trouve dans le répertoire tizen-sdk\tools\certificate-generator.

Avant de commencer à travailler, je vous invite donc à mettre à jour votre PATH de la façon suivante (j'ai installé le SDK dans C:\tizen-sdk) :

{% highlight bat %}
set PATH=%PATH%;C:\tizen-sdk\tools\ide\bin;C:\tizen-sdk\tools\certificate-generator
{% endhighlight %}

Certaines commandes ci-après nécessitent qu'un appareil soit connecté : vous devez soit connecter un appareil physique soit lancer une émulateur via le [Device Emulator](https://developer.tizen.org/help/index.jsp?topic=%2Forg.tizen.gettingstarted%2Fhtml%2Fdev_env%2Femulator.htm "Device Emulator").

## Création d'un certificat

Si vous avez bien mis à jour votre PATH comme indiqué en début d'article, il vous suffit d'exécuter la commande suivante et d'entrer les informations demandées :

{% highlight bat %}
certificate-generator
{% endhighlight %}

![Génération d'un fichier .p12 pour Tizen avec certificate-generator](/img/uploads/06_certificate_generator_cli.png)

Cette commande a pour effet de créer un fichier portant le nom indiqué en dernier lors du lancement de *certificate-generator* (test.p12 dans le cas illustré au-dessus).

Vous devez faire un lien vers ce fichier .p12 dans votre fichier de profils (faites une copie du modèle se trouvant dans tizen-sdk\tools\ide\sample\profiles.xml), comme le montre l'image ci-dessous :

![Liste des profils pour le certificate-generator Tizen](/img/uploads/06_certificate_generator_profiles.png)

Ce fichier de certificat sera utilisé pour signer vos applications.

## Applications Web : Tizen Web CLI

### Création d'un projet vierge

Utilisez la commande *web-gen*, en spécifiant un nom de projet (et éventuellement un nom de répertoire si vous voulez créer le projet ailleurs que dans le répertoire courant) :

{% highlight bat %}
web-gen -n PROJECT_NAME -p PROJECT_PATH
{% endhighlight %}

**ATTENTION ! **N'utilisez pas de caractères spéciaux dans le nom de votre projet (type "_"), cela peut créer dans d'autres commandes (comme *web-install* par exemple).

### Création d'un projet à partir d'un template

Si vous préférez partir d'un template, vous devez utiliser *web-template* à la place de* web-gen*.

Pour lister les templates Tizen existants, exécutez la commande suivante :

{% highlight bat %}
web-template -s tizen
{% endhighlight %}

Pour le SDK 2.1.4, j'obtiens le résultat suivant :

![Résultat de la commande web-template de Tizen CLI](/img/uploads/02_web_template_tizen.png)

Pour créer un projet à partir d'un des templates, il suffit d'exécuter la commande suivante (attention, le projet sera créé dans le répertoire courant !) :

{% highlight bat %}
web-template TEMPLATE_NAME
{% endhighlight %}

Par exemple, pour utiliser le template "Single Page" :

{% highlight bat %}
web-template tizenwebuifw-singlepage
{% endhighlight %}

Il vous est alors demandé de renseigner quelques informations : meta description et titre de la page, thème Tizen à utiliser, nom du widget à créer... Vous retrouverez ces données dans les fichiers index.html et config.xml qui ont été créés par cette commande.

### Packaging d'une application

Le package (aussi appelé widget) est créé avec la commande *web-packaging* (-o permet d'écraser un package généré précédemment) :

{% highlight bat %}
web-packaging WIDGET_NAME.wgt PROJECT_PATH
{% endhighlight %}

Répondez oui ('y') dans le cas où il vous est demandé si vous souhaitez continuer.

Si le widget existe déjà, il faut ajouter l'option *-o* pour écraser la version précédente.

### Signature d'une application

Pour signer une application, il faut d'abord avoir créé un fichier de certificat (voir plus haut).

Ensuite, avec *web-signing* en précisant le profil suivi de deux points et du chemin vers votre fichier profiles.xml (il faut également préciser le path du projet s'il ne s'agit pas du répertoire courant) :

{% highlight bat %}
web-signing -p PROFILE_NAME PATH_TO_PROFILES_XML_FILES PROJECT_PATH
{% endhighlight %}

Il vous sera demandé de saisir votre mot de passe.

Par exemple, pour signer mon application se trouvant dans le répertoire C:\Users\Jeremy\Downloads\test_tizen en utilisant le profil "test" du fichier profiles.xml se trouvant dans le répertoire courant :

![Signature d'une application web Tizen CLI](/img/uploads/07_web_signing_cli.png)

### Installation / Désinstallation d'un widget

La commande *web-install* permet d'installer un widget (créé avec *web-packaging*) :

{% highlight bat %}
web-install -w WIDGET_NAME.wgt
{% endhighlight %}

**ATTENTION !** Si la commande échoue, vérifiez que le nom de votre application ne comporte pas de caractères spéciaux (du type "_"), notamment dans l'id de l'application (voir fichier config.xml).

Pour désinstaller le widget, vous devez utiliser *web-uninstall* en spécifiant l'ID du package, que vous pouvez trouver soit dans le fichier config.xml du projet (voir image ci-dessous) soit en lançant la commande *web-list*.

{% highlight bat %}
web-uninstall -i PACKAGE_ID
{% endhighlight %}

![Récupération de l'ID de package dans le fichier config.xml du projet Tizen](/img/uploads/04_web_uninstall_package_id.png)

### Liste des applications installées

Pour lister les applications que vous avez installé sur l'appareil / émulateur connecté, utilisez *web-list*.

{% highlight bat %}
web-list
{% endhighlight %}

La commande vous renvoie un ensemble d'informations que vous pouvez retrouver dans le fichier config.xml du projet comme l'ID du package et de l'application.

![Résultat de la commande web-list de Tizen CLI](/img/uploads/03_web_list_tizen.png)

### Lancement d'une application

Chaque application dispose d'un ID (à ne pas confondre avec celui du package !). Par défaut, il s'agit de l'ID du package suivi d'un point et du nom du projet (dans l'exemple ci-dessus, la commande *web-list* nous montre que l'ID de l'application est PZHIp5N34B.HelloWorld).

Pour lancer une application, utilisez *web-run* en spécifiant son ID :

{% highlight bat %}
web-run -i APP_ID
{% endhighlight %}

Si plusieurs appareils sont connectés, utilisez l'option *-d* pour les différencier.

### Debug d'une application

Pour debugger une application, utilisez *web-debug* en spécifiant son ID (cette commande (re)lancera l'application sur l'appareil connecté) :

{% highlight bat %}
web-debug -i APP_ID
{% endhighlight %}

En cas d'échec, relancez la commande plusieurs fois.

Une fois exécutée, vous devriez récupérer une URL à copier-coller dans votre navigateur Web : celle-ci donne accès au *Web Inspector* qui vous permet de debugger votre application.

![web-debug retourne une URL](/img/uploads/05_web_debug_url.png)

![Accès au Web Inspector via web-debug](/img/uploads/05_web_debug_inspector.png)

## Applications natives : Tizen Native CLI

Les commandes pour les applications natives sont très similaires à celles utilisées pour les applications Web, je vais donc passer plus rapidement.

### Création d'un projet

Pour créer un projet vide dans le répertoire courant, utilisez native-gen comme suit :

{% highlight bat %}
native-gen -s TEMPLATE_NAME -n PROJECT_NAME
{% endhighlight %}

Cela créera un dossier nommé PROJECT_NAME sera créé pour le projet dans le répertoire courant.

TEMPLATE_NAME peut prendre plusieurs valeurs : *empty* pour une page vide, *form* pour une page simple...

### Compilation d'un projet

Pour compiler le projet, placez-vous dans son sous-répertoire "CommandLineBuild" et lancez *native-make* :

{% highlight bat %}
cd PROJECT_NAME\CommandLineBuild
native-make
{% endhighlight %}

### Packaging et signature d'une application

Toujours dans le sous-répertoire "CommandLineBuild", utilisez native-packaging an pointant vers le fichier de certificat (*.p12) créé avec certificate-generator (voir plus haut) et en précisant le mot de passe correspondant :

{% highlight bat %}
native-packaging --sign-author-key CERTIFICATE_PATH.p12 --sign-author-pwd CERTIFICATE_PASSWORD
{% endhighlight %}

Un package est créé dans le répertoire de travail, vous pouvez afficher son nom avec la commande suivante :

{% highlight bat %}
ls *.tpk
{% endhighlight %}

### Installation / Désinstallation d'une application

Pour installer un package (fichier .tpk) sur un appareil connecté, utilisez *native-install* :

{% highlight bat %}
native-install -p PACKAGE_NAME.tpk
{% endhighlight %}

Le package porte un ID, il s'agit de la première partie du nom du fichier .tpk : par exemple, si votre package se nomme TgYzgiStDH-1.0.0-i386.tpk, l'ID est TgYzgiStDH. Cette valeur se retrouve également dans le fichier manifest.xml du projet, comme le montre l'image ci-dessous.

![ID du package Tizen natif dans le fichier manifest.xml](/img/uploads/08_native_package_id.png)

Pour le désinstaller, vous devez préciser l'ID du package à *native-uninstall* :

{% highlight bat %}
native-uninstall -p PACKAGE_ID
{% endhighlight %}

### Lancement d'une application

Pour lancer l'application, utilisez *native-run* comme suit :

{% highlight bat %}
native-run -p PACKAGE_ID
{% endhighlight %}

### Debug d'une application

En utilisant *native-debug*, une invite de commandes gdb s'ouvrira :

{% highlight bat %}
native-debug -p PACKAGE_ID
{% endhighlight %}

Ce tour d'horizon des commandes de Tizen CLI est terminé. J'espère que cet article vous sera utile, n'hésitez pas à partager vos trucs / astuces et à poser des questions dans les commentaires !
