---
layout: post
title: "Traduction française pour WordPress, Suffusion et Disqus"
description: "Cet article s'intéresse au passage en français de WordPress et, en particulier, du thème Suffusion et de l'extension Disqus. Suivez le guide !"
category: wordpress
redirect_from:
  - /post/traduction-wordpress-suffusion-disqus/
  - /traduction-wordpress-suffusion-disqus/
  - /2013/05/traduction-francaise-pour-wordpress-theme-suffusion-et-extension-disqus/
---

Lorsqu'on lit du contenu en français, il est toujours appréciable de ne pas se retrouver avec un mélange de langues qui rend l'ensemble incohérent. Une traduction de WordPress, Suffusion et Disqus, que j'utilise sur ce blog, me paraissait donc naturelle.

J'ai découvert le [thème Suffusion](http://aquoid.com/news/themes/suffusion "Thème Suffusion") au moment de la création de mon blog WordPress : il m'a beaucoup plu par sa sobriété et son interface d'administration qui permet une personnalisation facile sans toucher directement au code. Ce thème est proposé en anglais par défaut, je vous propose donc la marche à suivre pour le traduire.

J’ai également été séduit par les fonctionnalités offertes par Disqus pour la gestion des commentaires : c’est donc tout naturellement que j’utilise l’extension « Disqus Comment System » pour la gestion des commentaires de ce blog. Le changement de langue pour cette extension est brièvement décrit en fin d'article.

Dans les exemples, je m'intéresserai bien sûr au passage en version française. :)

## Traduction de WordPress en français

Si vous êtes un bon élève, vous aurez directement récupéré WordPress sur le site francophone et vous pourrez simplement passer à l'étape suivante.

Sinon, il va falloir récupérer les fichiers nécessaires sur [cette page](http://www.wordpress-fr.net/telechargements "Traduction Wordpress") :

![Téléchargement des fichiers de traduction WordPress](/img/uploads/a_telecharger_wordpress_fr.png)

Ces fichiers sont à placer dans le répertoire wp-content/languages.

Ensuite, il faut qu'il indiquer à WordPress d'utiliser le français comme langue de référence et, pour cela, il suffit d'éditer le fichier wp-config.php (qui se situe à la racine du répertoire wordpress) et de modifier (ou ajouter si pas présente) la définition de la variable *WPLANG*:

{% highlight php %}
define('WPLANG', 'fr_FR');
{% endhighlight %}

Et le tour est joué !

## Création d'un thème enfant

Nous allons ensuite créer un thème enfant pour Suffusion : dans ce cas, le principal avantage du thème enfant sera de ne pas perdre vos modifications en cas de mise à jour du thème. Ces modifications peuvent être la location française mais aussi toute autre modification de code que vous auriez pu faire.

Dans le répertoire wp-content/themes de WordPress, créez un sous-répertoire "suffusion-fr".

Dans ce sous-répertoire, créez un fichier style.css et copiez-y le contenu suivant:

{% highlight css %}
/*
Theme Name: Suffusion-FR
Theme URI: http://aquoid.com/news/themes/suffusion/
Description: Traduction francaise de Suffusion
Version: 1.0.0
Author: Aquoid
Author URI: http://aquoid.com/
Template: suffusion
*/
{% endhighlight %}

La dernière ligne ("Template: suffusion") est particulièrement importante car elle indique à WordPress que ce thème enfant hérite de Suffusion !

Pas besoin de spécifier de directive @import dans la feuille de style : assurez-vous que que le thème enfant hérite bien de celles du thème parent en cochant la case "Inherit all stylesheets corresponding to the theme selection" sur la page Suffusion Options > Back-end > Child Themes de l'interface d'administration.

## Traduction du fichier .po

Dans le répertoire "suffusion-fr" accueillant le thème enfant, créez un sous-répertoire "translation" qui va accueillir le fichier de langue.

Le thème Suffusion est livré avec un fichier .po de référence qui se trouve dans son propre répertoire "translation".

Deux solutions s'offrent à vous:

* [Télécharger une version déjà traduite dans votre langue](http://pool.aquoid.com/translations/projects/suffusion "Télécharger une version déjà traduite dans votre langue") du fichier .po : pour cela, rien de plus simple, choisissez la langue qui vous convient dans la liste puis, au bas de la page suivante, cliquez sur "Export".
* Traduire manuellement le fichier .po livré avec le thème.

Pour éditer un fichier .po, vous pouvez utiliser le [logiciel Poedit](http://www.poedit.net/download.php "Logiciel Poedit") : il vous permettra de modifier aisément les différentes entrées du fichier de langue.

Une fois le fichier .po ouvert dans Poedit et la traduction terminée, choisissiez Fichier > Enregistrer sous..., positionnez vous dans le répertoire "translation" fraîchement créé et choisissez "fr_FR.po" comme nom de fichier. En fait, Poedit va à la fois créer le fichier .po (texte brut) et le fichier .mo correspondant (format binaire utilisé par WordPress).

Votre arborescence dans le répertoire "themes" devrait maintenant ressembler à ça :

![Arborescence du répertoire themes](/img/uploads/arborescence_wordpress_themes.png)

## Activation du thème enfant

Une fois ces modifications effectuées, il ne vous reste plus qu'à uploader tout ça sur votre serveur Web et à activer le thème enfant Suffusion-FR dans l'interface d'administration de WordPress.

Deux petites remarques qui vous feront peut-être gagner du temps :

* Ne vous inquiétez pas si l'interface d'administration du thème n'est pas traduite, c'est tout à fait normal : seule la partie client du site est couverte par la traduction.
* Certains éléments ne sont pas traduits (notamment le texte "Tagged with" qui apparaît à côté des tags associés à chaque post sur la page d'accueil) : il faut choisir le texte de substitution soi-même en passant par passant par Suffusion Options > Other Graphical Elements > Byline Configuration > Tags dans l'interface d'administration.

## Traduction de l'extension Disqus

Nativement, cette extension est en anglais.

Pour la traduire, rien de compliqué, tout se passe dans l'onglet "Settings" de votre [espace d'administration Disqus](http://disqus.com/admin/settings/ "Espace d'administration Disqus").

Deux actions à réaliser :

* Passer la langue de votre site à "French" dans le champ "Language".
* Indiquer la traduction qui va bien dans les champs "Zero Comments", "One Comment"... comme le montre l'image ci-dessous.

![Elements de traduction de Disqus](/img/uploads/traduction_disqus.png)

Ne vous alarmez pas si les modifications ne sont pas prises en compte immédiatement sur votre site : il semble qu'il y ait un certain délai.
