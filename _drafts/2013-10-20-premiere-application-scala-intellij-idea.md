---
layout: default
title: "Première application Scala avec IntelliJ IDEA"
date: "2013-10-20"
description: "Un aperçu rapide de la mise en place d'un projet Scala sous IntelliJ IDEA : installation des outils, création d'un projet et du classique Hello World."
excerpt: |
    Un aperçu rapide de la mise en place d'un projet Scala sous IntelliJ IDEA.
    Installation des outils (JDK officiel, IntelliJ IDEA, plugin Scala de JetBrains), création d'un projet vide et du classique "Hello World".
category: scala
---

Ayant appris à utiliser Scala récemment au travers du cours "Functional Programming Principles in Scala" sur Coursera), j'ai souhaité faire un tour des IDE pour voir lequel me conviendrait le mieux. Outre [Eclipse qui est disponible dans une version prête à utiliser pour Scala](http://scala-ide.org/download/sdk.html "Téléchargement de Scala IDE"), il est aussi possible d'utiliser son challenger, IntelliJ IDEA. Cet article vous offre un petit tour rapide de la mise en place d'un projet Scala sous IntelliJ IDEA, au travers du classique "Hello World".

## Installation du JDK et de IntelliJ IDEA

Si vous ne disposez pas déjà de ces outils, rendez-vous sur [cet article qui décrit l'installation de IntelliJ IDEA sous Ubuntu](/post/installation-intellij-idea-ubuntu "Tutoriel d'nstallation de InteeliJ IDEA sous Ubuntu").

## Installation du plugin Scala pour IntelliJ IDEA

JetBrains fournit un [plugin dédié au développement Scala](http://confluence.jetbrains.com/display/IntelliJIDEA/Scala "Plugin Scala pour IntelliJ IDEA").

Pour l'installer, sur l'écran d'accueil d'IntelliJ, choisissez Configure > Plugins (ou Settings > Plugins si vous êtes déjà dans l'IDE) puis cliquez sur "Browse repositories...".

Tapez "scala" dans le champ de recherche et faites un clic droit sur le plugin puis "Download and Install".

![Plugin Scala pour IntelliJ IDEA](/img/uploads/Scala_Plugin_IntelliJ.png)

Redémarrez IntelliJ pour que le plugin soit pris en compte.

## Création d'un nouveau projet vide

Lancez IntelliJ IDEA.

Create New Project > Scala Module.

A côté de "Project SDK", cliquez sur "New..." : il vous sera demandé de pointer le répertoire d'installation du JDK, dans mon cas /usr/lib/jvm/java-7-oracle Dans "Set Scala Home", pointez vers votre installation locale de Scala ([vous pouvez télécharger ça ici](http://www.scala-lang.org/ "Téléchargement de Scala")).

![Création d'un module Scala dans IntelliJ IDEA](/img/uploads/Creation_Module_Scala.png)

Donnez un nom au projet dans "Project name" (par exemple, HelloWorld) puis cliquez sur "Finish".

## Hello World!

Clic droit sur "src" puis New > Scala Class.

Nommez cette classe HelloWorld puis collez-y le contenu suivant :

```
object HelloWorld extends App {
    println("Hello, world!")
}
```

L'application peut être lancée via le menu Run > Run 'Hello World' (raccourci Maj + F10 par défaut).
