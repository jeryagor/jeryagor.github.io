---
layout: default
title: "Suffusion : trucs et astuces pour utiliser ce thème WordPress"
date: "2013-06-20"
description: "Quelques trucs et astuces en vrac pour mieux utiliser les fonctionnalités offertes par le thème Wordpress Suffusion : page d'''accueil, extraits..."
excerpt: |
  Quelques trucs et astuces en vrac pour mieux utiliser les fonctionnalités offertes par le thème Wordpress Suffusion.
  Page d'accueil présentant une liste de posts, extraits, suppression de l'auteur... n'hésitez pas à poser des questions au besoin !
category: wordpress
---

A chaque thème ses spécificités, [Suffusion](http://aquoid.com/news/themes/suffusion/ "Thème Suffusion pour Wordpress") ne fait pas exception à la règle.

Après la [traduction française du thème](/post/traduction-wordpress-suffusion-disqus/ "Traduction française de Suffusion et Disqus pour Wordpress"), cet article résume quelques petits trucs qui peuvent s'avérer utiles lors de l'utilisation de Suffusion : création d'une "Page of posts" pour la page d'accueil, utilisation des extraits... laissez-vous guider par les gros titres ! :)

Cet article est amené à évoluer, notamment à chaque fois qu'une nouvelle fonctionnalité intéressante du thème sera utilisée sur ce site.

## Création d'une page d'accueil

Pour créer une page d'accueil contenant la liste des derniers posts de votre blog :

*   Rendez-vous dans l'espace d'administration WordPress et plus particulièrement dans la section Réglages > Lecture.
*   Pour "La page d’accueil affiche", sélectionnez "Les derniers articles" (vous pouvez également sélectionner le nombre d'articles à afficher).

Par défaut, le contenu intégral de vos articles devrait être affiché. Pour n'afficher que les extraits, rendez-vous dans Apparence > Suffusion Options > Layouts > Front / Blog Page Views et cochez "Display excerpt" à la place de "Display full content".

Pour plus de détails sur les extraits, lisez la suite de cet article.

## Utilisation des extraits avec Suffusion

Si, comme moi, vous n'aimez pas que vos articles soient tronqués au bout d'un certain nombre de mots / caractères sur la page d'accueil de votre site, les extraits devraient également vous intéresser.

Pour activer les extraits sur la page d'accueil, vous devez choisir l'option "Display excerpt" dans Apparence > Suffusion Options > Layouts > Front / Blog Page Views > Full posts / excerpts / list / tiles / mosaic.

Lors de la création d'un article, si la section "Extrait" n'apparaît pas déjà quelque part, vous devez la rendre visible en cliquant sur "Options de l'écran" en haut de page puis cocher la case "Extrait".

![Activation des extraits sur WordPress](/img/uploads/activation_extraits_wordpress.png)

Un champ en bas de page vous permettra alors de saisir l'extrait.
  
Pour paramétrer la façon dont les résumés seront affichés par Suffusion, rendez-vous dans l'interface d'administration de WordPress puis Apparence > Suffusion Options > Layouts > Layout: Excerpt / List / Tile / Mosaic / Full . Sur cette page, ous pourrez notamment indiquer au thème d'utiliser une miniature à côté de l'extrait, l'URL de cette image devant être précisée, à la création de l'article, dans le champ Additional Options for Suffusion > Images > Miniature comme le montre l'image suivante.

![Ajout d'une miniature avec Suffusion](/img/uploads/miniature_suffusion.png)
  
## Suppression de l'auteur des posts
  
Quand un seul auteur écrit sur un blog (comme c'est le cas ici), il y a peu d'intérêt à faire figurer cette information et à disposer d'une page auteur.
  
Pour désactiver l'affichage de l'auteur (et le lien correspondant vers la page des auteurs), rendez-vous dans Apparence > Suffusion Options > Other Graphical Elements > Post and Page Bylines puis sélectionnez simplement "Hide Posted By" dans la partie "Show "Posted By" for Posts?".

![Cacher la mention de l'auteur dans Suffusion](/img/uploads/hide_posted_by_suffusion.png)

Cela supprimera la lien partout où le résumé de votre post apparaissait mais également en fin d'article.

Attention ! Si vous n'utilisez pas le template par défaut pour vos articles, vous devez faire cette manipulation dans la section dédiée, sous  Apparence > Suffusion Options > Other Graphical Elements > Post Formats.
