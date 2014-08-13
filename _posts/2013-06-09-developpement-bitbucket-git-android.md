---
layout: post
title: "Développement collaboratif avec Git, Bitbucket et Android Studio"
date: "2013-06-09"
description: "Utilisez un dépôt distant Git (Bitbucket ou autre) pour faciliter le développement collaboratif de vos applications avec Android Studio."
excerpt: |
  Quand on souhaite travailler à plusieurs sur le développement d'une application Android, l'utilisation d'un gestionnaire de versions comme Git facilite grandement le travail.
  En utilisant un service en ligne tel que Bitbucket, vous disposez d'un dépôt Git accessible aisément dans le monde entier.
  L'article présente l'intégration d'un dépôt Git - Bitbucket à Android Studio, le nouvel IDE spécial Android basé sur IntelliJ qui a été dévoilé par les équipes de Google il y a quelques semaines.
category: android
redirect_from: /post/developpement-bitbucket-git-android/
---

Alors qu'un dépôt Git local me suffisait amplement pour mes développements personnels, je me suis posé la question de l'utilisation d'un dépôt en ligne lorsque j'ai souhaité développer une application avec ma conjointe. Comme je découvrais l'utilisation de Android Studio d'une part et de Bitbucket d'autre part, je me suis dit que j'allais partager ces quelques trucs au travers d'un article.

Pour illustrer, je m'appuie sur une application nommée TestBitbucket créée dans Android Studio en utilisant les paramètres par défaut.

## Mise en place de Git dans Android Studio

Pour commencer, installez Git sur votre machine de travail : un petit tour sur le [site officiel de Git](http://git-scm.com/ "Site officiel de Git") s'impose. Si vous n'êtes pas familiarisé avec les outils de gestion de version, vous pouvez en profiter pour suivre le petit [guide d'itnitiation à Git](http://try.github.io/ "Guide d'itnitiation à Git").

Une fois Git installé, il faut indiquer à Android Studio que vous souhaitez utiliser Git pour la gestion de version : via les menus, il suffit de se rendre dans VCS > Enable Version Control Integration... puis de sélectionner Git dans la liste déroulante, comme le montre l'image ci-dessous.

![Activation de Git dans Android Studio](/img/uploads/01_enable_version_control.png)

En vous rendant dans le répertoire contenant votre projet, vous pouvez remarquer qu'un dossier .git a été créé. Si vous ne le voyez pas, pensez à activer l'affichage des éléments cachés dans votre explorateur de fichiers !

Attention, avant de faire un premier commit, il n'est peut-être pas judicieux d'indexer l'intégralité de votre projet dans votre dépôt : tous les fichiers de build ou de configuration propres à votre machine n'auront aucun intérêt à être utilisés par les autres développeurs intervenant sur le projet.

Avec Git, il est possible de créer un fichier .gitignore qui liste l'ensemble des éléments à ignorer lors des commits. Ce fichier peut être placé à la racine du projet. Dans le cas d'un projet Android Studio, à l'heure où j'écris cet article, le fichier .gitignore suivant remplit parfaitement son rôle :

{% highlight text %}
*.iml
*.iws
*.ipr
.idea/
.gradle/
local.properties
*/build/
*~
*.swp
{% endhighlight %}

L'avantage d'utiliser ce fichier .gitignore est que vous n'aurez pas trop de question à vous poser lors de vos commits, sélectionnez tout et laissez Git filtrer pour vous.

Il faut commencer par déclarer les fichiers à suivre par le gestionnaire de versions : clic-droit sur le projet dans l'explorateur d'Android Studio puis Git > Add to VCS.

Et c'est parti pour le premier commit : clic-droit sur le projet dans l'explorateur d'Android Studio puis Git > Commit directory. Il vous faudra renseigner un commentaire à associer à ce commit ("Initial commit" dans mon cas) puis cliquer sur "Commit" (et éventuellement une deuxième fois pour confirmer, au cas où l'analyse de code vous renverrait quelques avertissements / erreurs)

![Premier commit sur Android Studio](/img/uploads/02_add_to_vcs_and_initial_commit.png)

Votre projet Android Studio est maintenant lié avec votre dépôt Git local. Dans le cadre d'un développement collaboratif, un dépôt local ne suffira pas : les développeurs doivent pouvoir accéder à un dépôt commun, par exemple en utilisant des services en ligne tels que [Github](https://github.com/ "Github") ou [Bitbycket](https://bitbucket.org "Bitbucket"), ce dernier étant le sujet de cet article.

## Association à un dépôt distant Bitbucket

Alors que GitHub ne propose que des dépôts publics (donc visibles à tous) dans sa version gratuite, Bitbucket met à disposition des dépôts privés, dans une limite de 5 utilisateurs (pour accueillir davantage d'utilisateurs, des offres payantes sont disponibles).

Pour créer un compte Bitbucket, rendez-vous sur le [site officiel Bitbucket](https://bitbucket.org/ "Site officiel de Bitbucket"), ça ne prend que quelques secondes.

En haut de votre page de gestion de compte, cliquez sur "Create" et créez votre dépôt de travail. Validez après avoir saisi les informations demandées, en vérifiant bien que la case "Git" est cochée.

![Création d'un nouveau dépôt Bitbucket](/img/uploads/03_create_bitbucket_repository.png)

Le tutoriel de Bitbucket est très bien fait et vous indique différentes façons pour initialiser votre dépôt : dans notre cas, nous souhaitons utiliser le contenu d'un dépôt existant (notre dépôt local). Bitbucket devrait vous indiquer les commandes à utiliser, je me contenterai donc de les rappeler:

{% highlight sh %}
cd /path/to/project/.git
git remote add origin https://username@bitbucket.org/username/repository-name.git
git push -u origin --all
{% endhighlight %}

Dans les commandes ci-dessus, on commence par se placer dans le répertoire .git du projet. Ensuite, avec *git remote add*, on spécifie le dépôt distant à utiliser. Pour finir, l'ensemble du code du dépôt local est remonté dans le dépôt distant : il vous sera demandé de saisir votre mot de passe Bitbucket.

Sur la page de gestion du dépôt Bitbucket, votre commit devrait maintenant être visible : vous remarquerez notamment, comme sur l'image ci-dessous, que vous retrouvez le commentaire associé au commit précédent, fait dans votre dépôt local.

![Historique des activités du dépôt sur Bitbucket](/img/uploads/04_bitbucket_history.png)

Votre dépôt Git local est maintenant associé à votre dépôt distant Bitbucket. Et si on ajoutait un nouvel utilisateur ? :)

## Développement collaboratif

Pour qu'un nouvel utilisateur puisse utiliser votre dépôt, il vous faudra d'abord l'inviter depuis Bitbucket : sur la page de gestion du dépôt, choisissez "Send invitation", saisissez l'adresse email de la personne à inviter (ou son identifiant Bitbucket si elle est déjà inscrite) puis cliquez sur "Share" pour envoyer l'invitation.

Dans la suite de l'article, on se place sur la machine du nouvel utilisateur.

### Récupération du code existant par le nouvel utilisateur

Le nouvel utilisateur aura alors accès à la page du dépôt et pourra récupérer la commande nécessaire pour le cloner.

![Clonage du dépôt Bitbucket](/img/uploads/05_bitbucket_clone.png)

Il suffit alors d'exécuter les commandes suivantes, en remplaçant la source de la commande *git clone* par l'URL indiquée par Bitbucket (l'utilisateur invité devra saisir son propre mot de passe) :

{% highlight sh %}
cd /path/to/project/clone/
git clone https://newusername@bitbucket.org/newusername/repository-name.git
{% endhighlight %}

### Import du projet dans Android Studio

La structure globale du projet a été recréée suite au clonage du dépôt Bitbucket.

Certains fichiers de configuration ayant été perdus dans l'opération (notamment le fichier local.properties qui pointe vers le SDK), je vous invite à ajouter la variable d'environnement ANDROID_HOME et à la faire pointer vers l'installation locale du SDK. Dans mon cas, il s'agit du chemin suivant :

```
C:/Users/Jeremy/AppData/Local/Android/android-studio/sdk
```

Dans Android Studio, choisissez File > Import Project et sélectionnez le répertoire racine du projet dans l'arborescence : dans mon cas, il s'agit du répertoire *test-android-studio* qui correspond au nom du dépôt sur Bitbucket.

Sur l'écran suivant, choisissez "Import from external model" et sélectionnez "Gradle" (s'il s'agit bien de l'outil de build qui était utilisé dans le projet importé, ce qui est le cas par défaut). Cliquez sur "Next" puis cochez la case "Use Gradle wrapper (recommended)" (ne vous attardez par sur les erreurs qui pourraient apparaître à côté du champ "Gradle home", ça ne nous concerne pas) et enfin "Finish" pour lancer l'import du projet.

![Import d'un projet Gradle dans Android Studio](/img/uploads/06_import_project.png)

Si tout s'est bien passé, vous devriez pouvoir exécuter l'application comme sur la machine initiale.

### Utilisation de Git avec le dépôt distant

Pour commencer à travailler, il faut bien penser à indiquer à Android Studio que Git est utilisé comme gestionnaire de version : comme on l'a déjà fait plus haut, il suffit de se rendre dans VCS > Enable Version Control Integration… puis de choisir Git.

Nous avons maintenant à disposition deux dépôts : un dépôt local et un dépôt (parent) distant. Dans les menus contextuels, différents raccourcis sont mis à disposition :

*   Lors de vos modifications de code, vous pouvez effectuer un commit dans votre dépôt local en utilisant le menu contextuel : VCS > Commit Changes...
*   Lorsque vous souhaitez remonter vos changements locaux dans le dépôt distant, rien de plus simple : VCS > Git > Push... En cas de modifications concurrentes, cette commande a de grandes chances de générer des conflits qu'il vous faudra résoudre : une interface dédiée s'ouvrira alors pour vous faciliter la tâche.
*   Pour récupérer les changements effectués par les autres membres de l'équipe de développement, VCS > Update Project...

Pour plus de détails sur ces différentes commandes, vous pouvez vous référer à la [documentation de IntelliJ](http://www.jetbrains.com/idea/webhelp/using-cvs-integration.html "Documentation de IntelliJ sur l'intégration d'un SCM") ainsi qu'à la [documentation de Git](http://git-scm.com/documentation "Documentation de Git").
