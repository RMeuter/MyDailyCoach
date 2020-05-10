/* eslint-disable no-unused-vars */

var data  = require("../JsonFile/TypeData.js");
var formateDonnee = require("../GoogleFitTransfer/formationDonne")

/*La forme de data doit etre de la manière suivante :
 * data = {
 *          ArrayLiaison:[
 *              [MoyPasJournalier, CapteurPas],[MoyFrequenceCardiaqueJournaliere, FrequencesCardiaque] 
 *          ]
 *          moyennes3SemainesCapteurs: {
 *              "MoyPasJournalier":5000,
 *              "MoyFrequenceCardiaqueJournaliere": 90
 *              },
 *          donneesJournaliere:{ ## Chaque donné ou array est faite par heure avec l'heure donnée par la ref :"heure"
 *              "heure": [1587679197864, 1587679197864, 1587679197864, ...], # Donnée en milliseconde
 *              "CapteurPas": [0, 12, 800, ...],
 *              "FrequencesCardiaque": [[60, 63, 62],[60, 63],[60, 63, 62, 60, 63, 62], ] ## Ces données peuvent etre désordonner de la sorte 
 *              }
 *          }
 *        }
 *
 */ 



let wantData = data.aggregateBy[1];

/**
 * 0 : Point Coeur
 * 1 : Pas
 * 2 : Activité/Sommeil
 * 3 : Freq cardiaque
 */

const express = require("express");
const app = express();
const port = 1234;
const { google } = require("googleapis");
const request = require("request");
const cors = require("cors");
const urlParse = require("url-parse")
const queryParse = require("query-string")
const bodyParser = require("body-parser")
const axios = require("axios");


// ################ Recupération des clés
// Happy Evening => 
var IdClient = "776464730949-n570eg17u5j00g15rpdpu85phhjblvdi.apps.googleusercontent.com";
var SecretKey = "O2D_8jTV7_R5u4ySAddVCSjA";

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/ting", (req, res) => {

    const oauth2Client = new google.auth.OAuth2(
    IdClient,
    SecretKey,
    "http://localhost:1234/steps"
    ) 
    const scopes = [
     "https://www.googleapis.com/auth/fitness.body.read "+
     "https://www.googleapis.com/auth/fitness.activity.read " + 
     "profile email openid"
    ] 
    
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });

    request(url, (err, response, body) => {
        console.log("error:", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send("<a href='"+url+"'> Le lien de connection </a>");
    } )
});


app.get("/steps",async (req, res)=> {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    
    const oauth2Client = new google.auth.OAuth2(
        IdClient,
        SecretKey,
        "http://localhost:1234/steps"
        )
    
    const tokens = await oauth2Client.getToken(code); 
    res.send("Ma page de graphique, donnée =" + wantData);
    
    let stepArray = [];

    try {
        let actuDate = new Date();
        let obj = {
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type":"application/json",
            url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            data: { 
                aggregateBy: [
                    wantData
            ],
                bucketByTime: { durationMillis: 3600000 }, 
                startTimeMillis:  actuDate.setDate(actuDate.getDate() - 1),
                endTimeMillis: actuDate.setDate(actuDate.getDate() + 1) 
              },
        }
        const result = await axios(obj);
        stepArray = result.data.bucket;
    } catch(e){
        console.log("erreur: "+e );
    }
    try {
        console.log(formateDonnee(stepArray));
    } catch(e){
        console.log(e);
    }
});


app.listen(port, () => console.log('GOOGLE FIT is listening on port '+ port))