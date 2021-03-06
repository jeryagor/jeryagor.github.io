---
layout: post
title: "Installation de IntelliJ IDEA sous Ubuntu"
description: "Quelques notes concernant l'installation de IntelliJ IDEA sous Ubuntu : installation du JDK, de l'IDE et ajout d'un raccourci dans la barre de lancement de Unity."
category: ide
redirect_from:
  - /post/installation-intellij-idea-ubuntu/
  - /installation-intellij-idea-ubuntu/
  - /intellij/2013/10/19/installation-intellij-idea-ubuntu/
---

Voilà quelques notes rapides pour installer IntelliJ IDEA sur votre machine Ubuntu.

IntelliJ IDEA est un environnement de développement (IDE) développé par la société JetBrains et assez répandu dans la communauté Java. Il est également un environnement de choix pour le développement Scala, sujet qui devrait faire l'objet de prochains articles.

## Installation du JDK

Il est recommandé d'installer le JDK officiel à la place de OpenJDK, libre à vous de garder la version libre ou non.

Pour installer le JDK officiel, ajoutons le dépôt webupd8team et lançons l'installation de Java 7 (il vous suffira d'accepter les termes du contrat de licence) :

```sh
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java7-installer
```

Pour activer cette installation, exécutez la commande suivante :

```sh
sudo update-java-alternatives -s java-7-oracle
```

Vous pouvez vérifier que tout s'est passé correctement grâce aux commandes suivantes :

```sh
java -version
javac -version
```

## Installation de IntelliJ IDEA

IntelliJ IDEA se télécharge directement sur le [site officiel de JetBrains](http://www.jetbrains.com/idea/download/ "Téléchargement de IntelliJ IDEA").

Dézippez l'archive téléchargée où vous le souhaitez puis rendez-vous dans ce répertoire pour lancer l'IDE :

```sh
cd INSTALLATION_DIR/bin
./idea.sh
```

## (Faculatif) Ajout d'un raccourci dans la barre de lancement de Ubuntu

Pour plus de facilité, il est possible de créer un raccourci dans la barre de lancement.

Pour cela, créez un nouveau fichier intellij_idea.desktop dans /user/share/applications :

```sh
gksudo gedit /usr/share/applications/intellij_idea.desktop
```

Copiez-y le contenu suivant en modifiant le répertoire d'installation de IntelliJ IDEA de façon adéquate :

```text
[Desktop Entry]
Type=Application
Terminal=false
Name=IntelliJ IDEA
Icon=INSTALLATION_DIR/bin/idea.png
Exec=INSTALLATION_DIR/bin/idea.sh
```

Déplacez ensuite manuellement ce fichier intellij_idea.desktop de /usr/share/applications dans la barre de lancement de Ubuntu.
