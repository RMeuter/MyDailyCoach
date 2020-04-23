//Cliquer sur l'icône rouage en haut à gauche de l'interface "Paramètres / Settings" -> "Vos Applications"
//Récupérer les accès à votre base de données firestore, au préalable complétée en suivant le modèle de données décrit dans le fichier /readme.md
//Renommer ce fichier en firebase.js


import { firebase } from "@firebase/app";
import "@firebase/firestore";


const config = {
    apiKey: "AIzaSyCa1bitrBaEp9Vlv8oZ4sXG6LIAM9kvTRE",
    authDomain: "anxietyapp-8522e.firebaseapp.com",
    databaseURL: "https://anxietyapp-8522e.firebaseio.com",
    projectId: "anxietyapp-8522e",
    storageBucket: "anxietyapp-8522e.appspot.com",
    messagingSenderId: "869369705480",
    appId: "1:869369705480:web:daef822609231857764dbd",
    measurementId: "G-DX65969PXM"
  };

firebase.initializeApp(config);

export const db = firebase.firestore();
