---
layout: post
title: "Test de quelques environnements de développement en ligne"
description: "Avant d'envisager le saut vers le tout en ligne, cet article propose une revue de quelques IDE en ligne : Cloud9, codeanywhere, Cobebox et Nitrous.IO."
category: online
---

Je me renseigne actuellement sur les possibilités de développement dans un evironnement exclusivement en ligne, éventuellement pour me tourner vers un Chromebook comme ordinateur principal à mon domicile dans les mois qui viennent.

L'offre d'environnements de développement en ligne (IDE) est florissante et il peut être difficile de s'y retrouver, que ce soit en terme de fonctionnalités, d'ergonomie, de tarif...

Pour me faire une idée de ce que proposent réellement ces services, je me suis donc lancé dans quelques tests sur quatre d'entre eux qui me paraissaient prometteurs, à savoir [Cloud9](https://c9.io/), [codeanywhere](https://codeanywhere.com/), [Cobebox](https://www.codebox.io/) et [Nitrous.IO](https://www.nitrous.io/).

C'est parti !

## Cloud9 : *Your development environment, in the cloud*

La création d'un espace de travail sur Cloud9 est très simple, que ce soit en clônant un dépôt existant ou en commençant sur un projet vierge. Certains environnements prédéfinis existent (Django, Wordpress, Node...) mais on peut aussi choisir l'option *Custom* pour faire tout ça à notre sauce.

On a accès à une console qui nous permet d'installer toutes les dépendances nécessaires, comme sur n'importe quelle machine Linux : on peut donc tout faire à partir de cette console (compilation, test, gestion de version).

L'éditeur utilisé est [Ace](https://github.com/ajaxorg/ace), il est open source.

La coloration syntaxique a déjà été implémentée pour pas mal de langages : si un des langages que vous utilisez n'est pas encore supporté, il vous est possible de contribuer au projet en suivant les instructions données [ici](http://ace.c9.io/#nav=higlighter) ou [là](https://github.com/ajaxorg/ace/wiki/Importing-.tmtheme-and-.tmlanguage-Files-into-Ace) si vous souhaitez démarrer d'un fichier .tmLanguage existant (Text Mate, Sublime Text).

Il existe des fonctionnalités intéressantes notamment pour le Markdown, avec une prévisualisation en direct du document en cours d'édition.

L'auto-complétion, le *Jump to definition* et le renommage sont disponibles pour certains langages que j'ai pu tester (C++, Go) mais par pour tous (pas de support pour Elixir par exemple, qui n'a pas encore de coloration syntaxique non plus).

Vous pouvez créer un nombre illimité de workspaces publics mais un seul workspace privé dans l'offre gratuite. Dans son offre Premium (actuellement à 19$ par mois), Cloud9 augmente le nombre de workspaces privés à 6 mais permet également de mettre en place des workspaces FTP ou encore de se connecter à sa propre machine virtuelle.

![Cloud9 IDE](/img/uploads/cloud9_ide.png)

## codeanywhere : *Online code editor*

Sur codeanywhere, on démarre avec une DevBox qui correspond en gros à une machine virtuelle préconfigurée. Comme pour Cloud9, on a accès à une console qui nous permet d'installer tout outil manquant.

L'IDE permet de se connecter à différents services de stockage (serveur FTP, Google Drive, Dropbox et Github).

J'ai trouvé l'éditeur de texte beaucoup plus sommaire que celui de Cloud9 : on a bien de la coloration syntaxique mais pas de facilité particulière pour d'autres opérations sur le code (auto-complétion peu utile, pas d'analyse de code).

L'IDE laggait pendant mes tests, que ce soit pour l'accès à la console ou pour la création / ouverture de fichiers, je ne sais pas si c'est habituel. Je n'ai pas trouvé non plus comment coller quoi que ce soit dans la console, ce qui n'est pas le plus pratique pour cloner un dépôt Github...

Au niveau du prix, la tarification est plus complexe que celle de Cloud9 et est détaillée sur [cette page](https://codeanywhere.com/pricing). L'offre *Frelancer* à 7$ par mois semble la plus intéressante pour une utilisation à titre personnel, avec la possibilité d'avoir jusqu'à 10 DevBox.

![codeanywhere IDE](/img/uploads/codeanywhere_ide.png)

## Codebox : *One IDE, All Platforms*

Codebox propose un ensemble de *boxes* préconfigurées permettant le développement en PHP, Java, Dart, Go, C/C++...

On retrouve ici un éditeur encore plus simpliste que celui de codeanywhere. La coloration syntaxe me semble bonne pour les stacks testées mais l'auto-complétion est trop limitée (aucune analyse de code). La compilation et l'exécution sont accessibles facilement via les menus, tout comme le déploiement sur des plate-formes comme Heroku ou App Engine.

Comme pour les autres IDE, on a accès à la console si besoin.

Je l'ai trouvé moins pratique à utiliser que les autres, il me semble plus adapté au développement de sites Web en tout genre qu'à un développement généraliste : d'ailleurs, par défaut, au lancement de votre application, il essaie systématiquement d'ouvrir une page Web sur l'URL de votre *box* ce qui a du sens lors du développement d'applications HTML5.

Des applications desktop existent (y compris pour Chrome) et Codebox propose un mode offline qui peut s'avérer utile.

Alors que l'offre gratuite ne permet d'héberger que des projets open source, l'offre *Premium* à 9$ par mois permet d'accéder à de meilleures machines virtuelles (plus de RAM) et d'avoir jusqu'à 10 *boxes*.

![Codebox IDE](/img/uploads/codebox_ide.png)

## Nitrous.IO : *Claim your Development Box in 60 seconds*

Dernier dans ma série de tests, Nitrous.IO propose un nombre restreint de *boxes* prédéfinies (Rails, Node.js, Django, Go et PHP au moment de l'écriture de ce test).

Comme pour les deux précédents, on se retrouve dans un éditeur assez simple : en dehors de la coloration syntaxique pour un certain nombre de langages, pas de fonctionnalité particulière.

Il y a également un accès console mais, attention, pas de sudo ici ! Si besoin, le menu "Autoparts" permet d'accéder à un gestionnaire de paquets.

A noter qu'il existe une application desktop permettant de synchroniser ses fichiers avec ses *boxes* tout en utilisant son éditeur favori en local.

L'offre gratuite permet de faire tourner une *box*. Pour avoir davantage de *boxes*, avoir une *box* allumée en permanence, avoir plus d'espace disque, plus de RAM... il est possible d'acheter des NO2 et les tarifs peuvent donc varier selon les besoins. Parmi les IDEs testés, c'est clairement celui qui offre la facturation la plus flexible.

![Nitrous IDE](/img/uploads/nitrous_ide.png)

## Conclusion

Je n’ai volontairement pas passé en revue les fonctionnalités de travail collaboratif qu’offrent certaines de ces plate-formes car ce n’est pas dans cette optique que je les évaluais.

Pour noter chacun des IDE en ligne, j'ai attribué une note à chacun des critères (7 points pour l'éditeur en lui-même, 7 points pour l'environnement de travail en dehors de l'éditeur et enfin 6 points pour la tarification) ce qui amène à une note sur 20.

|-------------------|--------|--------------|---------|------------|
|                   | Cloud9 | codeanywhere | Codebox | Nitrous.IO |
|:-----------------:|:------:|:------------:|:-------:|:----------:|
| Espace de travail | 6      | 4            | 4       | 4          |
|-------------------|--------|--------------|---------|------------|
| Editeur           | 6      | 4            | 4       | 4          |
|-------------------|--------|--------------|---------|------------|
| Tarification      | 4      | 6            | 5       | 6          |
|-------------------|--------|--------------|---------|------------|
| **Global**        | **16** | **14**       | **13**  | **14**     |
|-------------------|--------|--------------|---------|------------|

Parmi tous ces IDE, j'ai donc été particulièrement séduit par Cloud9 qui, malgré sa tarification plus agressive que les autres pour son offre payante, m'a beaucoup plu par la beauté de son éditeur et la simplicité de son utilisation. Le rendu était plus fluide que sur les autres plate-formes, on en oublierait presque qu'on est en ligne. Ses fonctionnalités sont suffisamment ouvertes pour permettre d'adresser différents process de développement, que ce soit via les DevBox ou en branchant sa propre machine virtuelle.

Il existe bien d'autres environnements à tester, n'hésitez pas à laisser un commentaire pour faire part de vos expériences.
