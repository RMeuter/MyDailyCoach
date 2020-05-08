# Rappel Markdow (titre 1) :

*italique*  
**Gras**  

1. Item 1  

Liste : 
 
* item1
  
    - sous item
  


[Lien url markdown](https://guides.github.com/features/mastering-markdown/)  
![image](http://mon-url.com)  
> citation  

```
Text de code !  
```
`Text coder !`  
> - Citation avec barre  

@Adress  
- [x] Checkboxe  
## Tableau :  
One Cell | tow Cell  
-------- | --------  
Suite 1 | suite 2  

# MyDailyCoach  

## **Projet santé bien etre**  

Ce projet vis un public ayant besoin de trouver des activités alternes pour rendre leur journée plus appaisante.

*My daily coach* est une solution coaching qui propose une activité selon votre journée.

## Documentation utilisation

Il faut se connection teste et puis voila voila !

## Documentation technique

Nous utilisons divers moyens, tels que :

* Le serveur Nodejs combinée à Vuejs (Nodejs : 8.12, Vuejs : 2.6.11)
* L'API Google Fit (v1)
* Firebase de Google (Base de donnée instantanée)

### Sommaire :

Ce qui est intégré dans l'application, selon secteur suivant : 

- Gestion utilisateur,
- Graphique, 
- Activité, 
- Recommandation.

#### Gestion utilisateur :

Cette partie est centrale pour l'application car il assure la liaison avec toutes les activités de l'application.
Le travail est effectuer en majeur partie dans le dossier "store".

Comprends :  

- Authentification  
- Gestion des parametres  
- Verification de la derniere date de recommandation  
- Modification, et appel des parametre  
- Recuperation des données par google fit  

##### 1. L'Authentification  

L'authentification est assurer uniquement par le sign-in google authentification. Il est couplé avec le plugin gapi afin d'avoir accès au données google fit de l'utilisateur.

Le fichier `./src/components/Signin.vue` contient une méthode signin permettant :  

* Si l'utilisateur est pas nouveau :
    * D'ouvrir un pop de connexion avec son compte google,  
    * D'intégrer des parametres d'initialisation du profil, et des informations supplémentaire tel que le nom et prénom dans la collection "ExtraInfosUser" de firebase.  
* Sinon, elle appel implicitement par un évènnement capturé dans `./src/main.js` avec la fonction firebase `firebase.auth().onAuthStateChanged` ensuite elle appel la méthode fetchUser du fichier `./src/store/index.js`. Cette méthode recupere et intègre les informations parametre, etc... grace à l'aide de uid de l'utilisateur pour enfin l'intégré dans firebase (collection nommée "ExtraInfosUser")

Une fois l'utilisateur authentifié, ces données sont accessible par le fichier `./src/store/index.js`.

##### 2. Gestion des paramètres :

Nous verrons dans cette partie la forme des parametre utilisateur, ces getter et ces actions (qui utilise impicitement les mutations).

**La Variable `user` :**

1. `user` :

La variable user se décompose en deux sous éléments :

- `loginIn` : un booléan renseignant sur la connexion actuelle de l'utilisateur
- `data` : un json renseignant sur le donnée extra utilisateur (parmetre, information personnel) dont nous détaillerons dans la partie suivante.

2. `user.data`

* `uid` : est un `int` faisant le lien entre le compte google de l'utilisateur et son document dédié dans la collection firebase ("ExtraUserInfos")
* `displayName` : un `String` renseignant sur le nom de l'utilisateur
* `momentRecommandation` : un `array` est une liste de deux nombre entier dont le permier rensigne l'heure de recommandation et le second ces minutes.
* `dernierRecommandationVu` : un `int` donnant le moment en milliSeconde de la dernière recommandation vu par l'utilisateur
* `pointBienEtre` : un `int` qui retourne le nombre de point bien etre de l'utilisateur
* `parametre` : un json contenant les différents paramètres qui sont :
    * `NePlusVoirExplication` : un `boolean` qui affiche ou non les 3 lignes d'explications de la page `./src/components/StatsUser.vue`
    * `capteurPas` : un `boolean` qui affiche ou non le graphique de pas (à l'avenir il permettra de ne plus demander via l'API ces données de capteur de pas)
    * `capteurSommeil` : un `boolean` qui affiche ou non le graphique de sommeil (à l'avenir il permettra de ne plus demander via l'API ces données de capteur de sommeil)


**Les Getters :**

Il y a trois getters :

* Le premier `user` récupère les informations utilisateurs (toutes informations confondues),
* Le second `estMomentRecommandation` retourne un booléan qui permet de déterminer si l'heure de la recommandation peut etre disponible. Pour cela, nous recupèrons la date actuelle, verifions si l'heure de recommandation choisit par l'utilisateur est compris dans une fenetre partant de l'heure de recommandation voulu à 4 heures plus tard,
* Le troisième `niveauObtenu`, recupere le json niveau parmis la collection firebase ('levelUser'). Il recupere parmis tous les json le niveau dont le nombre de point bien du joueur doit etre entre le nombre de point bien etre requis par le niveau et sa borne supérieur.

**Les Actions :**

Dans cette partie nous avons 4 types d'actions (dont les mécanismes sont effectués dans mutation) :

- La première `fetchUser`, cité avant, intègre les informations extra utilisateur et le booléan login.
- La seconde `Add_PointBienEtre`, met à jour le moment de la dernière recommmandation vu par l'utilisateur. Egalement, il ajoute des points bien etre dans la seul condition que l'utilisateur n'ai pas eu de point bien etre depuis 20 heures d'avant (moment de la précédente recommandation).
- La troisième `Modify_Params` modifie les parametre en recevant une liste de l'identifiant du parametre (basé selon le json contenu dans le fichier `./src/store/construitJSONParametre.js`). Ce dernier fichier prépare un objet json pour la mise à jour du document de la collection firebase ("ExtraInfosUser"). Cette objet json est contenu dans une array avec le nom du parametre changeant (pour pouvoir le modifier la variable `user` par suite).
- Enfin, la dernière actions `Modify_MomentRecommandation`, modifie l'array `momentRecommandation` de l'utilisateur, et également met à jour dans la collection firebase ("ExtraInfosUser").