---
layout: post
title: "GoTools, un plugin Go pour Sublime Text"
description: "Parmi les nombreux plugins permettant d'étendre les fonctionnalités de Sublime Text, GoTools offre une intégration légère et efficace de nombreux outils Go."
category: golang
---

Il existe plusieurs plugins Go pour Sublime Text (j'ai utilisé [GoSublime](https://github.com/DisposaBoy/GoSublime) par le passé): [GoTools](https://github.com/ironcladlou/GoTools) est celui que j'utilise.

Plutôt que de développer une logique complexe dans le plugin, le choix qui a été fait est d'intégrer des outils externes, développés par l'équipe Go elle-même ou par la communauté : on retrouve ainsi des outils tels que [gofmt](https://golang.org/cmd/gofmt/) (mise en forme du code), [goimports](http://godoc.org/golang.org/x/tools/cmd/goimports) (gestion automatique des imports), [oracle](https://godoc.org/golang.org/x/tools/oracle) (analyse de code) ou encore [gocode](https://github.com/nsf/gocode) (autocomplétion).

## Installation

Les pré-requis pour l'installation de GoTools sont simples.

Il vous faut, bien entendu, avoir une installation Go sur votre système avec les variables GOROOT / GOPATH positionnées correctement.

Deux packages sont également nécessaires : [oracle](https://godoc.org/golang.org/x/tools/oracle) et [gocode](https://github.com/nsf/gocode).

Vous pouvez les installer via les commandes suivantes :

```sh
go get -u -v golang.org/x/tools/cmd/oracle
go get -u -v github.com/nsf/gocode          # Voir ci-dessous pour Windows
```

Sous Windows, l'installation de gocode est légèrement différente :

```sh
go get -u -ldflags -H=windowsgui github.com/nsf/gocode
```

Une fois ces dépendances satisfaites, le plus simple pour installer GoTools est de passer par l'outil [Package Control](https://packagecontrol.io/) bien connu des utilisateurs de Sublime Text : commande "Package Install" puis "GoTools" et le tour est joué.

## Configuration

Par défaut, le plugin ne lance que *gofmt* à la sauvegarde d'un fichier.

Pour que *goimports* soit exécuté avant *gofmt*, j'ai ajouté ces quelques lignes dans les settings du plugin (Preferences > Package Settings > GoTools > Settings - User) :

```json
{
    "format_backend": "both",
}
```

## Utilisation avec les projets Sublime Text

TODO