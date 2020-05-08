## Rappel Markdow (titre 1) :

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

### Sommaire

Ce qui est intégré dans l'application, selon secteur suivant :  

- Gestion utilisateur,
- Graphique,
- Activité,
- Recommandation.

#### Gestion utilisateur  

Cette partie est centrale pour l'application car il assure la liaison avec toutes les activités de l'application.

Comprends :  

- Authentification,  
- Gestion des parametres,  
- Récuperation des données par google fit  

##### 1. L'Authentification  

L'authentification est assurer uniquement par le sign-in google authentification. Il sera couplé avec le plugin gapi afin d'avoir accès au données google fit de l'utilisateur.

Le fichier `./src/components/Signin.vue` contient une méthode signin permettant :  

* Si l'utilisateur est pas nouveau :
    * D'ouvrir un pop de connexion avec son compte google,  
    * D'intégrer des parametres d'initialisation du profil, et des informations supplémentaire tel que le nom et prénom dans la collection "ExtraInfosUser" de firebase.  
* Sinon, elle appel implicitement par un évènnement capturé dans `./src/main.js` avec la fonction firebase `firebase.auth().onAuthStateChanged` ensuite elle appel la méthode fetchUser du fichier `./src/store/index.js`. Cette méthode recupere et intègre les informations parametre, etc... grace à l'aide de uid de l'utilisateur pour enfin l'intégré dans firebase (collection nommée "ExtraInfosUser")

Une fois l'utilisateur authentifié, ces données sont accessible par le fichier `./src/store/index.js`.

##### 2. Gestion des paramètres

Nous verrons dans cette partie la forme des parametre utilisateur, ces getter et ces actions (qui utilise impicitement les mutations).

**La Variable `user` :**

1. `user` :

La variable user se décompose en deux sous éléments :

- `loginIn` : un booléan renseignant sur la connexion actuelle de l'utilisateur
- `data` : un json renseignant sur le donnée extra utilisateur (parmetre, information personnel) dont nous détaillerons dans la partie suivante.

2. `user.data` :

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

##### 3. Récuperation des données par google fit (partie encore en développement)

Pour permettre la liaison avec google fit, nous utiliserons le plugin `vue-gapi version 0.2.2`.


Nous détaillerons trois sous-parties ici :

- La méthode de récupération des données actuelles
- La méthode de récupération des données envisagée
- Les données reçues et tranformation

**La méthode de récupération des données actuelles**

Le serveur est situé dans le dossier `./src/GoogleFitTransfer/index.js`.

Actuellement, nous nous relions à l'API google fit par le biais de la mise en service d'un second serveur basé sur nodejs uniquement. En effet, nous nous connection avec le package `express` et envoyons des requetes via `axios`. En premier nous envoyons une requete d'authentification de type `Oauth2` à google. Cette authentification est nécéssaire pour l'accès au données de l'utilisateur. Une fois indentification faite, nous envoyons une requete sous forme `GET` conprenant les données voulus (pas, sommeil, point coeur, fréquence Cardiaque)

**La méthode de récupération des données envisagée**

Ici, nous souhaitons utilisé le package `vue-gapi` (version 0.2.2).
Nous souhaitons nous basé sur ce [tutoriel](https://medium.com/google-cloud/using-google-apis-with-firebase-auth-and-firebase-ui-on-the-web-46e6189cf571).  
L'objetif de `vue-gapi` permet de récupéré le tocken générer par Oauth2 et de le réutiliser dans l'authentification firebase, cela permettra de relier les deux authentifications, ainsi se connecter tous en recupérant les informations `user` ainsi que ces données google fit.

**Les données reçues et tranformation**

Nous récuperons 4 types de données :

* Donnée Capteur de pas
* Donnée Point coeur
* Donnée Capteur fréquence cardiaque
* Donnée Activité

1. Données renseignant l'activité :

Ces données sont issue du capteur de pas ainsi également des point coeur (générer par google fit). Par ces deux données, nous pourrons déduire si l'utilisateur a été plus actif (sportivement) que d'habitude.

    1. Donnée Capteur de pas :

De cette données nous recupérons le nombre de pas par heures dans une journée pour les graphiques et la recommandation, mais également la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (Google permet une sortie calculer directement)  

    2. Donnée Point coeur :

Cette variable est construite par google et nous permet de reseigner sur les temps sportif de la journée de l'utilisateur, de cette variable on peut récupérer le temps pour obtenir ces points et le nombre de point (ici nous prenons les deux données).  
De ces données nous recupérons ces variables pour chaque heure de la journée et nous les utilisons pour les graphiques et la recommandation.  
Nous recupérons la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (encore en développement)  

2. Données renseignant l'activité :  

Ces données sont issue du capteur de fréquence cardiaque et d'activité. Par ces deux données, nous pourrons déduire si l'utilisateur a été plus stresser que d'habitude.

    1. Donnée Capteur fréquence cardiaque :  

De cette données nous recupérons une array de battement par minute relevé par google fit et ce pour chaque heures de la journée, nous les utilisons pour les graphiques et la recommandation.  
Nous construisons également la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (encore en développement)  

    2. Donnée d'activité :  

Cette variable est construite par google, il reseigne l'activité par trois nombres exemple de suite : [72, 3581871, 1]. Le premier nous donne le type d'activité, plus d'information [ici](https://developers.google.com/fit/rest/v1/reference/activity-types). Le second nombre nous donne le temps de l'activité, enfin le dernier nous révèle l'ordre des activités car google fournit une array pour une fentre de temps, ainsi dans une array il peut y avoir plusieur activité donc il donne sur l'information sur l'ordre des activités. Pour recupérer des données lier au stress nous recupérons les données liées au sommeil soit les données comportant le numéro 72.  
De ces données nous recupérons ces variables pour chaque heure de la journée et nous les utilisons pour les graphiques et la recommandation.  
Nous recupérons la moyenne journalière depuis trois semaines pour effectuer notre recommandation. (encore en développement)

3. La transformation :  

