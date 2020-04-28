// ############ Tuto suivie :
// https://www.youtube.com/watch?v=-yH1ZnZBWyU

// Telecharger postman :
// https://www.postman.com/downloads/


// import data from "../../JsonFile/TypeData.json"
// ################## Fonction etc... a mettre dans un fichier a part (car node n'accepte pas les fichier à part.. seul vuejs) ######
let aggregateBy = [
    { 
        "dataTypeName": "com.google.heart_minutes"
    },
    {
        "dataTypeName":"com.google.step_count.delta",
        "dataSourceId":"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
    }, 
    {
        "dataTypeName":"com.google.activity.segment"
    },
    {
        "dataTypeName":"com.google.heart_rate.bpm"
    }
]

function takeSleepData(stepArray){
    //console.log(stepArray)
    let valueActivity = {
        "time": [],
        "steps":[],
        "activity":[],
    } 

    for(const dataset of stepArray){
        valueActivity.time.push(dataset.startTimeMillis);
        for(const points of dataset.dataset){
            valueActivity.activity.push([]);
            for(const steps of points.point){
                // #### Si besoin de verifier les données
                //console.log("steps \n\n");
                //console.log(steps);
                for(const v of steps.value){
                    if (v["intVal"]){
                        valueActivity.activity[valueActivity.activity.length-1].push(v.intVal);
                    } else if (v["fpVal"]){
                        valueActivity.activity[valueActivity.activity.length-1].push(v.fpVal);
                    } else {
                        console.log("heu non !")
                    }
                }
            }
        }
    }
    return valueActivity;
}

/*
Autre type de data :
=> activity.read
- com.google.heart_minutes.summary
- com.google.heart_rate.summary
- com.google.activity.segment
- com.google.active_minutes
=> body.read
- com.google.heart_rate.bpm
*/
let wantData = aggregateBy[2];


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

// MyDailyCoach =>
// var IdClient = "869369705480-oqi8167kfnjj8k7gon5fvbj8e2mu7k85.apps.googleusercontent.com"
// var SecretKey = "vhlZ0IdfUne9mZUvFhFGqKCu"

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Voir les liens utiles :
 * - Integration auth :https://developers.google.com/people/quickstart/nodejs
 * - https://developers.google.com/fit/datatypes/activity
 * - Integration auth + data :https://github.com/googleapis/google-api-nodejs-client/tree/master/src/apis/fitness
 * - Integration auth + data :https://stackoverflow.com/questions/52233038/how-to-get-weight-data-from-google-fitness-api
 * - S'entrainer et data : https://developers.google.com/fit/rest/v1/reference/users/dataset/aggregate
 * - https://ithoughthecamewithyou.com/post/export-google-fit-daily-steps-to-a-google-sheet
 * - Integration auth: https://firebase.google.com/docs/auth
 * 
 * 
*/

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
        let actuDate = new Date(1587995075358); // En laissant vite comme ça Date (), j'ai la date actuelle !
        
        let obj = {
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type":"application/json",
            url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            data: { // Comment faire ces demandes : https://developers.google.com/fit/rest/v1/data-sources
                aggregateBy: [
                    wantData
            ],
                bucketByTime: { durationMillis: 3600000 }, // recuperation par seau de temps (soit des données toutes les heures ici)
                startTimeMillis:  actuDate.setDate(actuDate.getDate() - 1), // date du jour de départ
                endTimeMillis: actuDate.setDate(actuDate.getDate() + 1)  // date du jour de fin
              },
        }
        const result = await axios(obj);
        stepArray = result.data.bucket;
    } catch(e){
        console.log("erreur: "+e );
    }
    try {
        console.log(takeSleepData(stepArray));
    } catch(e){
        console.log(e);
    }
});


app.listen(port, () => console.log('GOOGLE FIT is listening on port '+ port))