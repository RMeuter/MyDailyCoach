# Rappel Markdow (titre 1) :

*italique*
**Gras**
Liste :
* item1
    - sous item
1. Item 1
[lien](http://mon-url.com)
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



## Partie technologie et programmation

Nous utilisons divers moyens, tels que :
* Le serveur Nodejs combinée à Vuejs (Nodejs : 8.12, Vuejs : 2.6.11)
* L'API Google Fit (v1)
* Firebase de Google (Base de donnée instantanée)

### Documentation :

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

1. L'Authentification

L'authentification est assurer uniquement par le sign-in google authentification. Il est couplé avec le plugin gapi afin d'avoir accès 
au données google fit de l'utilisateur.

Le fichier "./src/components/Signin.vue" contient une méthode signin permettant :
* Si l'utilisateur est pas nouveau : 
    * D'ouvrir un pop de connexion avec son compte google,
    * D'intégrer des parametres d'initialisation du profil, et des informations supplémentaire tel que le nom et prénom dans la collection "ExtraInfosUser" de firebase.
* Sinon, elle appel implicitement par un évènnement capturé dans "./src/main.js" avec la fonction firebase "firebase.auth().onAuthStateChanged" ensuite elle appel la méthode fetchUser du fichier "./src/store/index.js". Cette méthode recupere et intègre les informations parametre, etc... grace à l'aide de uid de l'utilisateur pour enfin l'intégré dans firebase (collection nommée "ExtraInfosUser")

Une fois l'utilisateur authentifié, ces données sont accessible par le store.

2. Gestion des parametres :
