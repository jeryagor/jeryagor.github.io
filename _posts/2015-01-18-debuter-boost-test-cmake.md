---
layout: post
title: "Débuter avec Boost Test et CMake"
description: "Une introduction à l'utilisation conjointe de Boost Test et CMake / CTest pour la mise en place de tests unitaires dans du code C++."
category: cpp
---

Il existe de nombreuses librairies de tests unitaires pour le code C++ : parmi elles, on trouve la librairie Boost Test, issue de la fameuse collection Boost.

Je vous propose donc de découvrir la mise en place de tests avec Boost Test et CMake.

## Prérequis

Pour suivre ce tutoriel, vous aurez besoin de [cmake](http://www.cmake.org/install/) et de la librairie Boost Test (étant utilisateur d'Ubuntu, j'ai pour habitude d'installer toutes les librairies de Boost via le paquet *libboost-all-dev*).

## Configuration initiale

Je me suis contenté d'écrire deux petites classes pour les besoins de cet article :

- Une classe `Point`, implémentée dans *Point.h*, qui expose une méthode `getX` et une méthode `getY` ;
- Une classe `Line`, implémentée dans *Line.h*, qui se construit à partir de deux `Point`s expose une méthode `length`.

Les deux fichiers *.h* sont placés dans un répertoire *src* et mon programme est compilé à partir du fichier *CMakeLists.txt* suivant :

```cmake
cmake_minimum_required(VERSION 2.8.4)
project(boost_test_cmake)

set(SOURCE_FILES src/main.cpp)            # Mon fichier main inclut Point.h et Line.h

add_executable(main_exe ${SOURCE_FILES})
```

Pour éviter de polluer le répertoire de code, je vous recommande de travailler en *out-of-source build* c'est-à-dire en écrivant les fichiers générés à la compilation dans un répertoire séparé : pour cela, il suffit de créer un sous-répertoire *build* et d'exécuter `cmake` depuis ce sous-répertoire.

```sh
mkdir build
cd build
cmake ..
make
```

## Mise en place des tests unitaires avec Boost Test

### Un seul source contenant des tests

#### Utilisation de base avec CMake et CTest

Je vais commencer par écrire un test simple pour la classe Point, ce test se trouve dans *test/Point_Test.cpp* :

```cpp
#define BOOST_TEST_DYN_LINK           // A ajouter dans le cas d'une liaison dynamique à Boost Test
#define BOOST_TEST_MODULE MyTest      // Nom du module de test

#include <boost/test/unit_test.hpp>
#include "Point.h"

BOOST_AUTO_TEST_CASE(PointCoordinates) {  // Ce test s'appelle PointCoordinates
  Point p(1., 2.);
  BOOST_CHECK_EQUAL(p.getX(), 1.);        // Un test d'égalité, on vérifie que les coordonnées sont correctes
  BOOST_CHECK_EQUAL(p.getY(), 3.);        // Ce test devrait échouer, la coordonnée Y vaut 2...
}
```

Mon arborescence est donc la suivante :

```sh
.
|____CMakeLists.txt
|____build
|____src
| |____main.cpp
| |____Point.h
| |____Line.h
|____test
| |____Point_Test.cpp
```

CMake offre également des fonctionnalités pour simplifier les tests, il s'agit de `ctest`.

Voici comment impacter *CMakeLists.txt* pour prendre en compte ce nouveau test :

```cmake
cmake_minimum_required(VERSION 2.8.4)
project(boost_test_cmake)

# Ici on sépare les fichiers de test des autres fichiers
set(SOURCE_FILES src/main.cpp)
set(TEST_FILES test/Point_Test.cpp test/Line_Test.cpp)

# On a besoin du framework de test unitaire de Boost
# Remarquez comment la librairie est liée à l'exécutable un peu plus bas avec target_link_libraries
find_package(Boost 1.55 REQUIRED COMPONENTS unit_test_framework)

# Il faut préciser dans quels répertoires chercher les includes
# Par exemple, j'inclus src/Point.h depuis test/Point_Test.cpp
include_directories(src ${Boost_INCLUDE_DIR})

# L'exécutable (le main) de notre programme
add_executable(main_exe ${SOURCE_FILES})

# Et enfin l'exécutable de test
enable_testing()
add_executable(test_exe ${TEST_FILES})
target_link_libraries(test_exe ${Boost_LIBRARIES})
add_test(Test test_exe)
```

Il suffit de compiler et de lancer `ctest`, toujours depuis le répertoire *build* :

```sh
cmake ..
make
ctest
```

On a bien un test qui échoue :

```text
Test project /home/jeremy/dev/blog-code-samples/01-boost-test-cmake/build
    Start 1: Test
1/1 Test #1: Test .............................***Failed    0.00 sec

0% tests passed, 1 tests failed out of 1
```

Pour avoir plus d'informations sur le test qui échoue, notamment son nom (cette information est contenue dans les traces de Boost Test), il faut exécuter `ctest --verbose` ou aller parcourir le fichier *Testing/Temporary/LastTest.log* généré pendant l'exécution de `ctest`.

Après correction du test, tout va mieux :

```text
Test project /home/jeremy/dev/blog-code-samples/01-boost-test-cmake/build
    Start 1: Test
1/1 Test #1: Test .............................   Passed    0.00 sec

100% tests passed, 0 tests failed out of 1
```

#### Aller plus loin avec Boost Test

Il existe d'autres outils que `BOOST_CHECK_EQUAL` pour enrichir vos tests.

La liste complète est disponible sur la page [Test Tools](http://www.boost.org/doc/libs/1_31_0/libs/test/doc/components/test_tools/reference/) de la [documentation de Boost Test](http://www.boost.org/doc/libs/1_38_0/libs/test/doc/html/index.html).

### Tests répartis en plusieurs sources

#### Un seul exécutable de test

Je crée maintenant un second source de test pour la classe Line, dans le fichier *test/Line_Test.cpp* :

```cpp
#include <boost/test/unit_test.hpp>
#include "Line.h"

BOOST_AUTO_TEST_CASE(LineLength) {
  Line l(Point(0.,0.), Point(3.,4.));
  BOOST_CHECK_EQUAL(l.length(), 5.);    // La ligne doit être de longueur 5
}
```

Pour ce second source, je n'ai pas besoin définir de nouveau `BOOST_TEST_DYN_LINK` et `BOOST_TEST_MODULE` comment c'était le cas pour *Point_Test.cpp* car cela causerait des problèmes à la compilation (avec un message d'erreur du type *définitions multiples de « main »*).

Si je ne souhaite avoir qu'un seul exécutable de test, l'impact sur le fichier *CMakeLists.txt* est minimal, il suffit d'ajouter *test/Line_Test.cpp* à la liste des sources de test :

```cmake
set(TEST_FILES test/Point_Test.cpp test/Line_Test.cpp)
```

Les tests peuvent être lancés de la même façon que précédemment.

#### Plusieurs exécutables de test

Plutôt que de grouper tous les tests sous le même exécutable (une seule entrée dans `ctest`), il est possible de créer différents exécutables en adaptant le fichier *CMakeLists.txt* comme suit :

```cmake
cmake_minimum_required(VERSION 2.8.4)
project(boost_test_cmake)

find_package(Boost 1.55 REQUIRED COMPONENTS unit_test_framework)
include_directories(src ${Boost_INCLUDE_DIR})

add_executable(main_exe src/main.cpp)

enable_testing()

# Un premier exécutable de test
add_executable(point_test_exe test/Point_Test.cpp)
target_link_libraries(point_test_exe ${Boost_LIBRARIES})
add_test(PointTest test_exe)

# Et un second
add_executable(line_test_exe test/Line_Test.cpp)
target_link_libraries(line_test_exe ${Boost_LIBRARIES})
add_test(LineTest line_test_exe)
```

Le rapport de `ctest` sépare alors le résultat pour les deux exécutables sur deux lignes différentes :

```text
Test project /home/jeremy/dev/blog-code-samples/01-boost-test-cmake/build
    Start 1: PointTest
1/2 Test #1: PointTest ........................   Passed    0.01 sec
    Start 2: LineTest
2/2 Test #2: LineTest .........................   Passed    0.00 sec

100% tests passed, 0 tests failed out of 2
```

Voici qui conclut cette introduction à Boost Test et CMake : le code final est disponible dans mon dépôt [GitHub](https://github.com/uraza/blog-code-samples/tree/master/01-boost-test-cmake).

J'espère que cela vous aura aidé à surmonter les quelques difficultés qui peuvent apparaître dans la mise en place conjointe de ces deux outils.
