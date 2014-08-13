---
layout: post
title: "Sérialisation de données au format JSON en Go (golang)"
date: "2013-10-29"
description: "Au travers d'exemples de code, découvrez comment utiliser le package json fourni avec Go pour encoder et décoder vos données au format JSON."
excerpt: |
  Au travers d'exemples de code, découvrez comment utiliser le package json fourni avec Go pour encoder et décoder vos données au format JSON.
  Outre les fonctions de base Marshal et Unmarshal, nous verrons certaines particularités liées aux tags JSON ou à l'utilisation de l'interface vide.
category: golang
redirect_from: "/post/serialisation-json-golang"
---

JSON (pour JavaScript Object Notation) est un format de données textuelles permettant de représenter aisément de l'information textuelle. Il est notamment très utilisé pour les échanges de données entre front-end et back-end.

Go fournit le package *encoding/json* dédié au traitement de ces données : vous devrez donc importer ce package au début de tous vos programmes Go en faisant usage.

{% highlight go %}
import "encoding/json"
{% endhighlight %}

## Encodage en JSON

L'encodage de données vers le format JSON se fait au moyen de la fonction [Marshal](http://golang.org/pkg/encoding/json/#Marshal "Documentation de json.Marshal").

Pour illustrer les propos de cet article, je considère le programme suivant que je ferai évoluer par la suite :

{% highlight go %}
package main
 
import (
  "fmt"
  "encoding/json"
)
 
type Person struct {
  Name     string
  Country  string
  hasABlog bool
}
 
func main() {
  p := Person{Name: "Jeremy", Country: "France", hasABlog: true}
  data, _ := json.Marshal(p)
  fmt.Println(string(data)) // Marshal renvoie un []byte, il faut donc le convertir avant affichage
}
{% endhighlight %}

### Attributs exportés

Seuls les attributs exportés de vos objets (ceux dont le nom commence par une lettre majuscule) sont sérialisés.

Ainsi, l'exemple ci-dessus produit la sortie suivante où on peut voir que les attributs "Name" et "Country" sont exportés mais pas l'attribut "hasABlog" :

{% highlight json %}
{"Name":"Jeremy","Country":"France"}
{% endhighlight %}

Si on change "hasABlog" en "HasABlog" dans la définition du type Person (et dans la création de p), tous les attributs sont bien exportés :

{% highlight json %}
{"Name":"Jeremy","Country":"France","HasABlog":true}
{% endhighlight %}

### Utilisation des tags

Dans l'exemple précédent, le JSON généré utilise comme clé le nom de l'attribut, en conservant la casse.

Mais que faire si le destinataire des données est sensible à la casse et considère donc les clés "Name" et "name" comme différentes ? Ou si vous voulez simplement utiliser un autre nom comme clé ?

C'est là que les tags JSON entrent en jeu : ils sont ajoutés à la suite de la définition des attributs et donnent des indications supplémentaires sur la manière de sérialiser les données.

|                             |                                                                     |
|-----------------------------|---------------------------------------------------------------------|
| \`json:"myName"\`           | attribut sérialisé avec la clé "myName"                             |
| \`json:"-"\`                | attribut ignoré                                                     |
| \`json:",omitempty"\`       | attribut ignoré s'il est vide                                       |
| \`json:"myName,omitempty"\` | attribut ignoré s'il est vide, sérialisé avec la clé "myName" sinon |

Modifions donc la définition de Person comme suit et créons deux personnes p1 et p2 :

{% highlight go %}
type Person struct {
  Name     string `json:"name"`              // "name" au lieu de "Name" comme clé
  Country  string `json:"country,omitempty"` // "country" comme clé mais pas de sérialisation si l'attribut est vide
  HasABlog bool   `json:"-"`                 // Pas de sérialisation bien que l'attribut soit exporté
}
...
p1 := Person{Name: "Jeremy", Country: "France", HasABlog: true}
p2 := Person{Name: "Nicolas", HasABlog: false}
{% endhighlight %}

La sortie est la suivante, conforme aux attentes :

{% highlight json %}
p1: {"name":"Jeremy","country":"France"}
p2: {"name":"Nicolas"}
{% endhighlight %}

### Données plus complexes

Bien que certaines informations ne puissent être encodées (fonctions, nombres complexes...), la sérialisation ne s'arrêtera pas si vos structures de données sont imbriquées : tant qu'il n'y a pas de cyclicité, l'encodage devrait réussir.

On peut donc aussi facilement sérialiser un tableau d'objets Person :

{% highlight go %}
type Persons struct {
  Persons []Person
  Passion string
}
...
persons := Persons{Persons: []Person{p1, p2}, Passion: "Coding"}
data, _ := json.Marshal(persons)
{% endhighlight %}

Le résultat de l'encodage est le suivant :

{% highlight json %}
{"Persons":[{"name":"Jeremy","country":"France"},{"name":"Nicolas"}],"Passion":"Coding"}
{% endhighlight %}

## Décodage du JSON

Super, on peut maintenant envoyer des données au format JSON, directement à partir de nos objets Go. Nous allons maintenant voir comment décoder, c'est-à-dire reconstruire des objets à partir de données au format JSON.

Nous utilisons pour cela la méthode [Unmarshal](http://golang.org/pkg/encoding/json/#Unmarshal "Documentation de json.Unmarshal").

Imaginons que je reçoive des données JSON me décrivant une structure similaire à Persons, contenant une seule personne nommée Jérémy dans la liste et dont la passion est "Coding" : ces données sont stockées dans la variable *ps* mais je les recevrais normalement d'un appel externe. Vous noterez que les double quotes doivent être échappées, ce qui ne simplifie pas la lecture de l'exemple...

{% highlight go %}
var personsDec Persons
ps := "{\"Persons\" : [{ \"NAME\":\"Jeremy\", \"Country\":\"France\", \"HasABlog\":true }], \"Passion\":\"Coding\"}"
json.Unmarshal([]byte(ps), &personsDec)
fmt.Println(personsDec)
{% endhighlight %}

La sortie est la suivante :

{% highlight json %}
{[{Jeremy France false}] Coding}
{% endhighlight %}

On peut remarquer que la valeur de l'attribut "HasABlog" n'a pas été lue à partir du JSON (en raison du tag associé), la valeur par défaut (*false*) a été utilisée.

Le champ "NAME" des données JSON, bien que sa casse ne corresponde ni au nom de l'attribut ni au tag, a bien été retrouvé. D'après ce [post sur le blog officiel](http://blog.golang.org/json-and-go "JSON et Go expliqués sur le blog officiel"), dans le cas d'une clé "NAME", l’identification des attributs se fera dans l'ordre suivant :

*   si possible, un attribut exporté avec un tag "NAME" ;
*   sinon, un attribut exporté nommé "NAME" ;
*   sinon, un attribut exporté "nAME", "NAme"... soit n'importe quel attribut s'identifiant à "NAME" indépendamment de la casse.

Ici, on tombe donc dans le dernier cas.

### Utilisation de l'interface vide

L'interface vide (*interface{}*) est très pratique en Go : il s'agit d'une interface ne contenant aucune méthode et à laquelle adhèrent donc tous les types Go. C'est d'ailleurs le type du retour de la méthode *Unmarshal*, ce qui n'a pas empêché de lui passer un pointeur sur un objet Persons dans l'exemple précédent.

Imaginons des données formatées de la façon suivante :

{% highlight json %}
[ "Chuck ipsum. When Chuck Norris was denied a Bacon McMuffin at McDonalds because it was 10:35, he roundhouse kicked the store so hard it became a KFC." ]
{% endhighlight %}

Un simple tableau de chaînes de caractères, on peut en lire la première chaîne comme ça :

{% highlight go %}
dataChuck := "[ \"Chuck ipsum...\" ]"         
var chuckStrings []string        
json.Unmarshal([]byte(dataChuck), &chuckStrings)         
fmt.Println("dataChuck string:", chuckStrings[0])
{% endhighlight %}

En utilisant l'interface vide, j'aurais aussi pu écrire :

{% highlight go %}
var chuckInterface []interface{}      
json.Unmarshal([]byte(dataChuck), &chuckInterface)       
fmt.Println("dataChuck string:", chuckInterface[0].(string))
{% endhighlight %}

Vous remarquerez l'utilisation de *.(string)* pour convertir la chaîne récupérée : il s'agit d'une [assertion de type](http://golang.org/ref/spec#Type_assertions "Explication des assertions de type en Go"). Cet appel va vérifier à l'exécution que *chuckInterface[0]* n'est pas *nil* et qu'il est bien de type *string*. Sans cette assertion de type, la compilation échoue.

Maintenant, imaginons que je renvoie des entiers à la place des chaînes de caractères :

{% highlight json %}
[ 42 ]
{% endhighlight %}

Je remplace *string* par *int* dans le code précédent et ça fonctionne aussi.

Si je ne sais pas quel est le type des données que je vais récupérer, je peux même écrire une instruction *switch*, comme le montre le code complet ci-dessous :

{% highlight go %}
package main      
import (         
  "fmt"       
  "encoding/json"         
)        
func decode(chuckJsonData string) {      
  var chuckInterface []interface{}        
  json.Unmarshal([]byte(chuckJsonData), &chuckInterface)      
  // Decode a la fois les nombres et les chaines de caracteres        
  switch chuckValue := chuckInterface[].(type) {         
  case float64:       
    fmt.Println("Chuck Norris a répondu", chuckValue, ".")      
  case string:        
    fmt.Println(chuckValue)         
  default:        
    fmt.Println("Chuck Norris n'a pas de défaut.")      
 }       
}        
func main() {        
  chuckDataStr := "[ \"Chuck ipsum...\" ]"        
  decode(chuckDataStr)        
  chuckDataInt := "[ 42 ]"        
  decode(chuckDataInt)        
  chuckDataBool := "[ false ]"        
  decode(chuckDataBool)       
}
{% endhighlight %}

*json.Unmarshal* convertit les nombres en float64 (et non en int), c'est donc bien le filtre *float64* qu'il faut utiliser : si vous essayez de filtrer avec un *case int* par exemple, vous tomberez dans le cas *default*.

La sortie du programme précédent est :

{% highlight text %}
Chuck ipsum...      
Chuck Norris a répondu 42 .      
Chuck Norris n'a pas de défaut.
{% endhighlight %}

Voilà qui conclut cet article. Pour plus d'informations sur l'utilisation de JSON avec Go, n'hésitez pas à vous référer à la [documentation officielle du package json](http://golang.org/pkg/encoding/json/ "Documentation du package enconding/json") ou à poser vos questions en commentaires.

![golang go gopher](/img/uploads/golang_gopher.jpg)
