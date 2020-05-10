# MyDailyCoach  

## ***Projet santé bien-être***  

Ce projet vise un public ayant besoin de trouver des activités alternatives pour rendre leur journée plus apaisante.

*My daily coach* est une solution coaching qui propose une activité selon votre journée.

## Documentation utilisation

L'utilisation de l'application nécessite de posséder un compte google par lequel vous vous authentifirez.

Une fois cette condition remplie, vous pouvez vous connecter avec votre compte, vous aurez accès à une page d'accueil.
De cette page, vous aurez la possibilité :  

- De visualiser l'activité de votre journée par des graphiques sur votre temps de sommeil, fréquence cardiaque, point coeur et nombre de pas.
- D'avoir accès si c'est l'heure, à votre recommandation d'activité qui vous correspondra à ce moment.
- Avoir accès aux différentes activités que nous proposons.

Des activités, vous pourrez :

- Visualisez une vidéo qui vous permettra d'effectuer et pratiquer l'exercice.
- Obtenir des points Bien-Etre, si vous effectuez votre activité de recommandation. Évoluez et progressez selon nos niveaux jusqu'à devenir la zenitude incarnée.  

A la suite de votre connexion, quelle que soit la page, vous pourrez :

- Changer les paramètres en haut de votre écran (Heure de recommandation, affichage des graphiques nombre de pas et sommeil, affichage de la présentation)  
- Vous déconnecter.

L'équipe MyDailyCoach vous souhaite une bonne journée.

## Documentation technique

Nous utilisons divers moyens, tels que :

* Le serveur Nodejs combinée à Vuejs (Nodejs : 12.16.3, Vuejs : 2.6.11)
* L'API Google Fit (v1)
* Firebase de Google (Base de donnée instantanée)

### Sommaire  

- Gestion utilisateur,
- Graphique,
- Activité,
- Recommandation.

#### Gestion utilisateur  

Cette partie est centrale pour l'application car il assure la liaison avec toutes les activités de l'application.

Elle comprend :  

- Authentification,  
- Gestion des paramètres,  
- Récupération des données par google fit  

##### 1. L'Authentification  

L'authentification est assurée uniquement par le sign-in google authentification. Il sera couplé avec le plugin gapi afin d'avoir accès au données google fit de l'utilisateur.

Le fichier `./src/components/Signin.vue` contient une méthode signin permettant :  

* Si l'utilisateur est pas nouveau :
    * D'ouvrir un pop de connexion avec son compte google,  
    * D'intégrer des paramètres d'initialisation du profil, et des informations supplémentaires telles que le nom et prénom dans la collection "ExtraInfosUser" de firebase.  
* Sinon, elle appelle implicitement par un événement capturé dans `./src/main.js` avec la fonction firebase `firebase.auth().onAuthStateChanged` ensuite elle appelle la méthode fetchUser du fichier `./src/store/index.js`. Cette méthode récupère et intègre les informations paramètre, etc... grâce à l'aide de uid de l'utilisateur pour enfin l'intégrer dans firebase (collection nommée "ExtraInfosUser")

Une fois l'utilisateur authentifié, ces données sont accessibles par le fichier `./src/store/index.js`. 

*Axe d'amélioration :* A l'avenir nous compotons simplifier la liaison entre le store et firebase par le plugin `vuefire`

##### 2. Gestion des paramètres

Nous verrons dans cette partie la forme des paramètres utilisateur, ces getter et ces actions (qui utilise implicitement les mutations).

**La Variable `user` :**

1. `user` :

La variable user se décompose en deux sous-éléments :

- `loginIn` : un booléan renseignant sur la connexion actuelle de l'utilisateur
- `data` : un json renseignant sur les données extra utilisateur (paramètre, information personnelle) que nous détaillerons dans la partie suivante.

2. `user.data` :

* `uid` : est un `int` faisant le lien entre le compte google de l'utilisateur et son document dédié dans la collection firebase ("ExtraUserInfos")
* `displayName` : un `String` renseignant sur le nom de l'utilisateur
* `momentRecommandation` : un `array` est une liste de deux nombres entiers dont le premier renseigne l'heure de recommandation et le second ses minutes.
* `dernierRecommandationVu` : un `int` donnant le moment en milliSecondes de la dernière recommandation vue par l'utilisateur
* `pointBienEtre` : un `int` qui retourne le nombre de points bien-être de l'utilisateur
* `paramètre` : un json contenant les différents paramètres qui sont :
    * `NePlusVoirExplication` : un `boolean` qui affiche ou non les 3 lignes d'explications de la page `./src/components/StatsUser.vue`
    * `capteurPas` : un `boolean` qui affiche ou non le graphique de pas (à l'avenir il permettra de ne plus demander via l'API ces données de capteur de pas)
    * `capteurSommeil` : un `boolean` qui affiche ou non le graphique de sommeil (à l'avenir il permettra de ne plus demander via l'API ces données de capteur de sommeil)

**Les Getters :**

Il y a trois getters :

* Le premier `user` récupère les informations utilisateurs (toutes informations confondues),
* Le second `estMomentRecommandation` retourne un booléan qui permet de déterminer si l'heure de la recommandation peut être disponible. Pour cela, nous récupérons la date actuelle, vérifions si l'heure de recommandation choisie par l'utilisateur est comprise dans une fenêtre partant de l'heure de recommandation voulue à 4 heures plus tard,
* Le troisième `niveauObtenu`, récupère le json niveau parmis la collection firebase ('levelUser'). Il récupère parmis tous les json le niveau dont le nombre de points bien-être du joueur doit être entre le nombre de points bien-être requis par le niveau et sa borne supérieure.

**Les Actions :**

Dans cette partie nous avons 4 types d'actions (dont les mécanismes sont effectués dans mutation) :

- La première `fetchUser`, cité avant, intègre les informations extra utilisateur et le booléan login.
- La seconde `Add_PointBienEtre`, met à jour le moment de la dernière recommandation vue par l'utilisateur. Egalement, il ajoute des points bien-être dans la seule condition que l'utilisateur n'aie pas eu de point bien-être depuis 20 heures d'avant (moment de la précédente recommandation).
- La troisième `Modify_Params` modifie les paramètres en recevant une liste de l'identifiant du paramètre (basé selon le json contenu dans le fichier `./src/store/construitJSONParametre.js`). Ce dernier fichier prépare un objet json pour la mise à jour du document de la collection firebase ("ExtraInfosUser"). Cet objet json est contenu dans une array avec le nom du paramètre changeant (pour pouvoir le modifier la variable `user` par suite).
- Enfin, la dernière action `Modify_MomentRecommandation`, modifie l'array `momentRecommandation` de l'utilisateur, et également met à jour dans la collection firebase ("ExtraInfosUser").

##### 3. Récupération des données par google fit (partie encore en développement)

Pour permettre la liaison avec google fit, nous utiliserons le plugin `vue-gapi` version 0.2.2.  

Nous détaillerons trois sous-parties ici :

- La méthode de récupération des données actuelles
- La méthode de récupération des données envisagée
- Les données reçues et transformation

**La méthode actuelle de récupération des données**

Le serveur est situé dans le dossier `./src/GoogleFitTransfer/index.js`.

Actuellement, nous nous relions à l'API google fit par le biais de la mise en service d'un second serveur basé sur nodejs uniquement. En effet, nous nous connectons avec le package `express` et envoyons des requêtes via `axios`. En premier nous envoyons une requête d'authentification de type `Oauth2` à google. Cette authentification est nécessaire pour l'accès aux données de l'utilisateur. Une fois l'identification faite, nous envoyons une requête sous forme `GET` comprenant les données voulues (nombre de pas, sommeil, point coeur, fréquence Cardiaque)

**La méthode de récupération des données envisagée**

Ici, nous souhaitons utiliser le package `vue-gapi` (version 0.2.2).
Nous souhaitons nous baser sur ce [tutoriel](https://medium.com/google-cloud/using-google-apis-with-firebase-auth-and-firebase-ui-on-the-web-46e6189cf571).  
L'objectif de `vue-gapi` est de récupérer le tocken généré par Oauth2 et de le réutiliser dans l'authentification firebase, cela permettra de relier les deux authentifications, ainsi se connecter tout en récupérant les informations `user` ainsi que ses données google fit.

**Les données reçues**

Nous récupérons 4 types de données :

* Donnée Capteur de pas
* Donnée Point coeur
* Donnée Capteur fréquence cardiaque
* Donnée Activité

1. Données renseignant l'activité :

Ces données sont issues du capteur de pas ainsi également des points coeur (généré par google fit). Par ces deux données, nous pourrons déduire si l'utilisateur a été plus actif (sportivement) que d'habitude.

1. 1. Donnée Capteur de pas :

De ces données nous récupérons le nombre de pas par heure dans une journée pour les graphiques et la recommandation, mais également la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (Google permet une sortie calculée directement)  

1. 2. Donnée Point coeur :

Cette variable est construite par google et nous permet de renseigner sur les temps sportifs de la journée de l'utilisateur, de cette variable on peut récupérer le nombre de point coeur ainsi que le temps pour obtenir ces points (ici nous gardons les deux types de données).  
De ces données nous récupérons ces variables pour chaque heure de la journée et nous les utilisons pour les graphiques et la recommandation.  
Nous récupérons la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (encore en développement)  

2. Données renseignant le stress :  

Ces données sont issues du capteur de fréquence cardiaque et d'activité. Par ces deux données, nous pourrons déduire si l'utilisateur a été plus stressé que d'habitude.

2. 1. Donnée Capteur fréquence cardiaque :  

De cette donnée nous récupérons une array de battement par minute relevé par google fit et ce pour chaque heure de la journée, nous les utilisons pour les graphiques et la recommandation.  
Nous construisons également la moyenne journalière depuis les dernières trois semaines pour effectuer notre recommandation. (encore en développement)  

2. 2. Donnée d'activité :  

Cette variable est construite par google, elle renseigne l'activité par trois nombres exemple de suite : [72, 3581871, 1]. Le premier nous donne le type d'activité, plus d'information [ici](https://developers.google.com/fit/rest/v1/reference/activity-types). Le second nombre nous donne le temps de l'activité, enfin le dernier nous révèle l'ordre des activités car google fournit une array pour une fenêtre de temps, ainsi dans une array il peut y avoir plusieurs activités donc il donne l'information sur l'ordre des activités. Pour récupérer des données liées au stress nous récupérons les données liées au sommeil soit les données comportant le numéro 72.  
De ces données nous récupérons ces variables pour chaque heure de la journée et nous les utilisons pour les graphiques et la recommandation.  
Nous récupérons la moyenne journalière depuis trois semaines pour effectuer notre recommandation. (encore en développement)

#### Template `StatsUser` et ces graphiques  

1. Le template `statsUser.vue`

Le template user et l'épicentre de notre application, il renseigne notre utilisateur sur : 

- les différentes variables utilisées et leur évolution par des graphiques,
- l'évolution de l'utilisateur dans l'application. Sur le principe de la gamification, nous utilisons des niveaux, pour lequel sont référencés :
    - Le nom du niveau,
    - Une image plutôt humoristique (dévoilant quelqu'un de relaxé en général), 
    - Un seuil de points bien-être,


2. Nos graphiques 

Pour effectuer nos graphiques, nous utilisons le package `vue-chartjs` version 3.5.0 avec son fichier chart.js version 2.  

Les graphiques sont contenus dans le dossier `./src/components/Charts`, et présenté dans le template `./src/components/StatsUser.vue`. En tout quatre graphiques sont élaborés :

- `GraphiqueFrequenceCardiaque` recense les moyennes des fréquences cardiaques par heure. Pour cela il récupère la liste de fréquence cardiaque et fait la moyenne pour chaque liste. Il présente les données par un graphique courbe.
- `GraphiquePas`  récupère le nombre de pas effectués par heure durant la journée et établit un graphique courbe.
- `GraphiquePointCoeur` recense les temps et nombre de points coeurs par heure. Il effectue une double courbe pour cela avec des histogrammes pour le nombre de points coeur et une courbe pour le temps obtenu.  
- `GraphiqueSommeil` récupère le temps de sommeil total effectué dans la journée et construit un graphique d'une barre.

***Axe d'amélioration future :***  

Une idée intéressante pour que l'utilisateur comprenne mieux son évolution est de rajouter pour chaque graphique les moyennes par heure ou journalière (cela dépend de la présentation variable évoquée ci-dessus) des 3 dernières semaines. Ainsi l'utilisateur comprendra mieux ces données.  

#### Les Activitées

Dans cette partie nous allons nous intéresser à :

- La construction de l'objet `Activité`,
- La présentation des activités,
- Comment les activité sont choisies ?  

##### 1. La construction de l'objet `Activité`  

L'objet activité est issu du modèle contenu dans le fichier `./src/models/Activite.js`. Ce dernier permet la conversion et une structuration respectés des données json brute transmis. Cette conversion est effectuée dans la `method` vue des fichiers `./src/components/StatsUser.vue` et `./src/components/Activities.vue`.  

Chaque activité possède les paramètres suivants :

* nom : est un `String` il fait référence au nom de l'activité
* categorie : est un `String` il fait référence au groupe d'activité dont il appartient : (Activité sportive relaxante, Activité sportive intense, Relaxation)
* image : est un `String` il au nom de l'image qui représente l'activité, les images des activité sont stockées dans le dossier `./src/assets/Activite`
* description : est un `String` il fait référence au descriptif de l'activité et ses bienfaits
* url : est un `String` il fait référence à une vidéo youtube qui montre la bonne pratique de l'activité mentionnée
* IntensiteJour : est un `int`, il renseigne à quel type de journée intense l'activité est adaptée et peut être recommandée. C'est une échelle allant de 0 à 10.  
* PointBienEtre : est un `int`, ce paramètre permet de savoir combien de points bien-être vaut l'activité. Le nombre de points s'effectue généralement selon la catégorie et le paramètre Intensitejour par nous-mêmes.
* couleur : est un `String` il fait référence à un code couleur marquant une catégorie.  

##### 2. La présentation des activités  

Les activités sont présentées aux travers de deux composantes :  

- `./src/components/Activities.vue` : Qui présente l'ensemble des activités en liste.
- `./src/components/Activities.vue` : Qui présente une activité en particulier avec la vidéo qui est présente en plus dans le template. Notamment un paramètre d'entrée du templates `estRecommande` (qui est un `boolean`) permet de présenter l'activité comme étant celle recommandée ou non.


##### 3. Comment les activités sont-elles choisies ?  

Les activités sont déjà séparées en trois catégories comme cité avant :

- Activité sportive relaxante,  
- Activité sportive intense,  
- Relaxation

Les activités choisies sont soit de nature relaxante pour au mieux satisfaire les journées sportives mais stressantes, soit sportive pour satisfaire les journées non sportives selon l'intensité du stress. Cependant, pour les différentes activités, cela n'est que le commencement, nous comptons étendre les catégories et permettre de compenser au mieux l'activité et stress de nos visiteurs. Pour cela nous comptons à l'avenir trouver plus d'activités, également trouver des indicateurs plus performants pour l'intensité de la journée et renseigner au mieux de l'état de l'utilisateur à ce moment.

#### Recommandation

Sur ce dernier point nous allons aborder la recommandation de l'activité. L'algorithme s'effectue en deux phases :

- La sélection des activités recommandables
- La sélection finale basée sur un système de recommandation utilisateur (amélioration future)


##### 1. La sélection des activités recommandables

La première partie de l'algorithme est disponible dans le fichier `./src/utils/recommandation.js`. Dans cette partie, nous cherchons à créer une liste des activités recommandables selon ces données.

Pour cela, nous nous basons sur la routine/habitude des utilisateurs en recueillant les données des trois dernières semaines. A partir de ces données nous vérifions l'écart entre sa moyenne et ses données journalières. Plus l'écart est grand entre ses habitudes et ses données journalières, plus le score d'intensité sera grand. Nous ajoutons ce score au score initiale pour chaque type de capteur. C'est à dire que nous faisons la moyenne des scores d'intensité pour les capteurs d'activité et de stress puis nous sommons les deux.

**Remarque et axe d'amélioration :** Actuellement nous n'avons pas encore différencié les scores de stress et d'activité pour la recommandation d'activité mais cela s'effectuera à l'aide d'une liste des nombres distinct.

Une fois le score journalier obtenu, nous sélectionnons les activités ayant un score compris entre celui généré à 4 points d'intensité supérieur.
A partir de cela nous obtenons notre liste d'activités recommandables.

Problème et réflexion à l'avenir :

- Le manque de données, tel que si l'utilisateur n'utilise plus sa montre les données seront manquantes. Cela a pour conséquence que les routines/habitudes de l'utilisateur sont faussées, donc moins précises. Ainsi la sélection d'activité risque de ne pas correspondre. Cependant, toujours dans une perspective d'amélioration nous essayons de trouver un moyen de pallier en utilisant une recommandation sur la base d'un profil ressemblant.
- Le score d'intensité risque de manquer de précision, cependant nous remédierons à cela soit par l'utilisation de capteurs donnant plus d'informations, soit par une analyse statistique de la satisfaction client (un questionnaire ajouté au sein de l'application dans le but de son développement).  

##### 2. La sélection finale basée sur un système de recommandation utilisateur (amélioration future)  

Cette partie n'est qu'une réflexion, l'activité recommandée actuellement est choisie de manière aléatoire.  

Dans cette perspective future, nous souhaiterons ajouter un système de notation d'activité stocké dans une collection firebase. Ainsi, nous pourrions à partir de ces données établir un filtrage collaboratif permettant de mettre en lien les activités recommandées selon les types de profils utilisateurs. Le but étant de l'algorithme de recommander à un individu, une activité qui correspondrait au goût des utilisateurs partageant des préférences similaires.