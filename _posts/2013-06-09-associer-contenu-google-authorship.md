---
layout: post
title: "Google Authorship : associez le contenu publié à votre compte Google"
date: "2013-06-09"
description: "Découvrez comment profiter de Google Authorship pour mettre en en avant le contenu que vous publiez et l'associer à votre compte Google+."
excerpt: |
  Pour mettre en avant le contenu que vous publiez, rien de mieux que de l'associer à votre compte Google+.
  Au travers de ce court tutoriel, vous découvrirez comment mettre en place ce service sur vos posts.
  Il paraît qu'il existe même un moyen de vérifier que vos changements fonctionnent sans attendre que les robots de Google passent par votre blog. ;)
category: google+
redirect_from: /post/associer-contenu-google-authorship
---

Lors de vos recherches Google, vous avez probablement déjà vu des résultats de recherche associés à une photo / profil Google+. Cette fonctionnalité, nommée Google Authorship, permet d'associer le contenu que vous créez à votre profil Google+. Elle met également en avant vos publications, les miniatures ayant tendance à attirer l’œil.

## Création d'un compte Google+

Si vous ne faites pas encore partie du réseau social de Google, c'est le moment d'y aller : [inscrivez-vous](https://accounts.google.com/signup "Inscription Google+").

Après avoir créé votre compte et complété les informations requises, vous devriez avoir accès à votre page de profil avec une URL de la forme [https://plus.google.com/u/0/113709458537997143511](https://plus.google.com/u/0/113709458537997143511/posts)

Gardez ça de côté, nous en aurons besoin d'ici peu.

## Association de votre blog à votre compte Google+ avec Google Authorship

Pour que votre blog bénéficie de Google Authorship et soit donc rattaché à votre compte Google+, vous devez l'ajouter sur votre page "Bio" : dans la rubrique "Liens", choisissez "Modifier" et ajoutez l'URL de votre blog dans la partie "Également auteur de".

![URL du site Web dans le champ Egalement auteur de](/img/uploads/egalement_auteur_de.png)

Vous devez également faire un lien dans l'autre sens depuis votre blog : le moyen le plus simple est d'utiliser la balise *rel = "author" *dans le bloc *head* vos pages : elle doit pointer vers l'URL de votre profil Google+. Si vous utilisez WordPress, certains thèmes le feront automatiquement pour vous si vous avez rempli le champ "Google+" sur votre page utilisateur. Sinon, vous pouvez aller modifier directement le code entre les balises *head*.

![URL du profil Google+ sur la page utilisateur WordPress](/img/uploads/link_rel_author.png)

Assurez-vous également que, quelque part sur la page, la mention "par Prénom Nom" soit affichée et corresponde à ce qui apparaît au nom et prénom qui apparaît sur votre compte Google+ : dans le thème que j'utilise, cette mention apparaît bien pour chacun des articles.

## Vérification du fonctionnement

Plutôt que d'attendre que les robots de Google refassent un tour sur votre blog, il existe un moyen rapide de vérifier que les manipulations précédentes ont fonctionné.

C'est l'[outil de test des données structurées](http://www.google.com/webmasters/tools/richsnippets "Outil de test des données structurées") de Google.

Saisissez simplement l'URL de l'une de vos pages dans le champ et cliquez sur "Aperçu" : si tout a bien été fait, vous verrez apparaître votre post avec votre photo de profil à côté. :)

![Prévisualisation de Google Authorship avec l'outil Google](/img/uploads/test_donnees_structurees.png)

Avant de bénéficier pleinement de Google Authorship, il vous faudra attendre que ces changements soient effectifs sur le moteur de recherche, ce qui peut prendre plusieurs jours voire plusieurs semaines.
