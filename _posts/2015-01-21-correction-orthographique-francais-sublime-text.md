---
layout: post
title: "Correction orthographique en français dans Sublime Text"
description: "Sublime Text est un éditeur de texte aux multiples usages : parmi ses fonctionnalités, la correction orthographique avec la gestion de nombreuses langues."
category: ide
---

Sublime Text est un éditeur de texte générique multi-plateformes que j'utilise beaucoup, notamment pour rédiger mes articles en Markdown.

Avant la mise en ligne d'un article, j'aime me relire et passer un coup de correcteur orthographique : c'est une des fonctionnalités offertes par Sublime Text.

## Installation du dictionnaire français

Par défaut, Sublime Text ne dispose pas d'un dictionnaire français.

Vous pouvez toutefois en installer un, tel que celui disponible sur le dépôt Github [SublimeTextLanguageFrench](https://github.com/superbob/SublimeTextLanguageFrench) de superbob.

Si vous disposez de Sublime Package Control, l'installation est simplissime :

1. `Ctrl` + `Shift` + `P`
2. Choisissez "Install Package"
3. Installez "Language - French - Français"

Sinon, [installez Sublime Package Control](https://packagecontrol.io/installation) et suivez les instructions du dessus, c'est tellement plus simple. :)

## Activation de la correction orthographique

Vous devez tout d'abord indiquer à Sublime Text le dictionnaire à utiliser : "View" > "Dictionary" > "Language - French - Français" > "fr_FR".

Vous n'êtes plus qu'à quelques clics de la correction orthographique, elle peut être activée par le menu "View" > "Spell Check" (ou, plus rapidement, en appuyant sur `F6`).

Bonne correction !
