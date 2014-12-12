---
layout: post
title: "Développer sur un chromebook"
description: "Dans cet article, je vous propose d'explorer quelques pistes pour utiliser un chromebook comme machine de développement."
category: chrome
---

Ayant eu l'occasion d'utiliser pendant quelques semaines un chromebook [Asus C300]({% post_url 2014-10-26-test-chromebook-asus-c300 %} "Test du chromebook Asus C300"), je me suis demandé quels outils étaient disponibles pour développer sur ce type de machine.

Je vous propose ici de faire un tour de toutes les solutions envisagées, n'hésitez pas à commenter si vous avez d'autres idées à partager.

## Solution 1 : travailler sur une machine distante

Pour certaines tâches, avoir accès à un simple shell sur une autre machine distante peut suffire. Il est donc envisageable d'utiliser votre serveur personnel (VPS ou autre) comme machine de travail.

Pour vous y connecter, il existe un client SSH officiel pour Chrome qui s'appelle [Secure Shell](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo).

C'est basique, pas toujours très pratique... mais ça fait le boulot !

## Solution 2 : se tourner vers une distribution Linux

Plutôt que de batailler avec Chrome OS, pourquoi ne pas se trouver vers une distribution Linux complète ?

Il existe pour cela deux solutions :

### Dual boot

Vous pouvez installer une distribution Linux en parallèle de votre Chrome OS et choisir quel système lancer au démarrage du chromebook.

Je n'ai pas testé mais c'est abordé sur ce tutoriel concernant [ChrUbuntu](http://chromeos-cr48.blogspot.fr/2012/04/chrubuntu-1204-now-with-double-bits.html) ou encore sur la [communauté Google+ coreboot on Chromebooks](https://plus.google.com/communities/112479827373921524726).

Ce n'est pas possible sur tous les chromebooks donc renseignez-vous bien.

### Crouton

Clairement plus simple à mettre en place que le dual boot, [Crouton](https://github.com/dnschneid/crouton) est un ensemble de scripts qui vous permet de mettre en place un environnement Ubuntu via chroot (il existe un [fork pour ArchLinux](https://github.com/drinkcat/chroagh/) également).

Le seul pré-requis est de passer votre machine en mode développeur. Une fois que c'est fait, tout est très bien documenté sur la page github du projet, vous pouvez avoir quelque chose d'opérationnel en moins d'une demi-heure.

Les avantages sont nombreux : pas de problèmes de compatibilité au niveau du matériel car tout repose sur le noyau de Chrome OS, le répertoire de téléchargement local est partagé entre les deux systèmes, la basculement d'un OS à l'autre se fait par une simple combinaison de touches sur le clavier...

Attention toutefois si votre chromebook est équipé d'un processeur ARM, il est possible que certains paquets ne soient pas disponibles pour cette architecture.

## Solution 3 : utiliser des outils en ligne

J'ai récemment écrit un article concernant les [IDE en ligne]({% post_url 2014-08-21-test-ide-en-ligne %} "Test de quelques IDE en ligne") tels que Cloud9 ou Nitrous.IO.

Les chromebooks étant des machines tournées vers le cloud, il s'agit d'une solution qui s'inscrit bien dans la philosophie de l'OS.

Toutefois, ces outils ne sont pas aussi évolués que leurs équivalents en local sur nos machines de développement. Tout dépend donc de vos besoin, je vous invite à tester pour vous faire une idée.

## Solution 4 : travailler en local sur Chrome OS

De plus en plus d'applications Chrome font leur apparition sur le Chrome Web Store.

On y trouve notamment des diteurs de texte très sympathiques : mes préférés sont [Caret](https://chrome.google.com/webstore/detail/caret/fljalecfjciodhpcledpamjachpmelml), [Zed](http://zedapp.org/) et [Super Neutron Drive](https://super.neutrondrive.com/). Google développe également un environnement de développement pour Dart et Javascript qui s'appelle [Chrome Dev Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg).

Au niveau transfert de fichiers, [sFTP Client](https://chrome.google.com/webstore/detail/sftp-client-ftp-sftp-ssh/jajcoljhdglkjpfefjkgiohbhnkkmipm) fonctionne très bien mais il vous faudra débourser quelques euros.

Des projets comme [js-git](https://github.com/creationix/js-git) laissent penser qu'on pourrait bientôt voir débarquer des gestionnaires de version sous Chrome OS.

Selon votre usage, ces outils peuvent être suffisants et vous permettre de travailler en local, sans complications.

## Conclusion

Parmi les solutions proposées, Crouton est celle qui me paraît la plus viable à l'heure actuelle. Le changement d'OS se fait rapidement, sans impact sur les performances, et on a accès à tous les outils nécessaires. Attention toutefois sur les processeurs ARM où certains paquets pourraient ne pas être disponibles...

Il serait plus agréable de pouvoir travailler en local : je suis curieux de voir comment évolueront les outils en ligne et les applications Chrome dans les années à venir pour venir combler le manque à ce niveau là.
