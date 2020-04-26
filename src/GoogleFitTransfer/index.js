// ############ Tuto suivie :
// https://www.youtube.com/watch?v=-yH1ZnZBWyU

// Telecharger postman :
// https://www.postman.com/downloads/

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

    // #################> J'ai besoin de ça seulement
    const oauth2Client = new google.auth.OAuth2(
    //client id
    IdClient,
    //client secret
    SecretKey,
    // link to redirect
    "http://localhost:1234/steps"
    )
    // https://www.googleapis.com/auth/fitness.body.read
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"] 
    
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });
    // #################< fin J'ai besoin de ça seulement
    
    request(url, (err, response, body) => {
        console.log("error:", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send("<a href='"+url+"'> Le lien de connection </a>");
    } )
});


app.get("/steps",async (req, res)=> {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    
    // #################> J'ai besoin de ça seulement + du code avant
    const oauth2Client = new google.auth.OAuth2(
        //client id
        IdClient,
        //client secret
        SecretKey,
        // link to redirect
        "http://localhost:1234/steps"
        )
    
    const tokens = await oauth2Client.getToken(code); 
    //console.log(tokens);
    res.send("Ma page de graphique");
    
    let stepArray = [];

    try {
        let actuDate = new Date(1587679197864);
        
        let obj = {
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type":"application/json",
            url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            data: { // Comment faire ces demandes : https://developers.google.com/fit/rest/v1/data-sources
                aggregateBy: [
                {
                    dataTypeName: "com.google.heart_minutes"
                  },
                /*  
                {
                    dataTypeName:"com.google.step_count.delta",
                    dataSourceId:"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }, 
                {
                    dataTypeName:"com.google.weight",
                    dataSourceId:"derived:com.google.weight:com.google.android.gms:merge_weight"
                }
                Autre type de data :
                => activity.read
                - com.google.heart_minutes.summary
                - com.google.heart_rate.summary
                - com.google.activity.segment
                - com.google.active_minutes
                => localisation.read
                - com.google.speed
                => body.read
                - com.google.heart_rate.bpm

                
                */
            ],
                bucketByTime: { durationMillis: 3600000 }, // recuperation par seau de temps (soit des données toutes les heures ici)
                startTimeMillis:  actuDate.setDate(actuDate.getDate()), // date du jour de départ
                endTimeMillis: actuDate.setDate(actuDate.getDate() + 1)  // date du jour de fin
              },
        }
        const result = await axios(obj);
        stepArray = result.data.bucket;
        //console.log(result.data);
    } catch(e){
        console.log("erreur: "+e );
    }
    try {
        //console.log(stepArray)
        let valueActivity = {
            "time": [],
            "steps":[],
            "activity":[],
        } 

        for(const dataset of stepArray){
            valueActivity.time.push(dataset.startTimeMillis);
            //console.log("\n\n ############## dataset "+ valueActivity.time[valueActivity.time.length - 1]);
            //console.log(dataset);
            for(const points of dataset.dataset){
                //console.log("points \n\n ");
                //console.log(points);
                let ordre = 1;
                valueActivity.activity.push([]);
                for(const steps of points.point){
                    //console.log("steps \n\n");
                    console.log(steps);
                    for(const v of steps.value){
                        if (ordre==1)  valueActivity.activity[valueActivity.activity.length-1].push(v.fpVal);
                        else valueActivity.activity[valueActivity.activity.length-1].push(v.intVal);
                        ordre ++;
                    }
                }
            }
        }
        console.log(valueActivity);
    } catch(e){
        console.log(e);
    }
    // ################# J'ai besoin de ça seulement
});


app.listen(port, () => console.log('GOOGLE FIT is listening on port '+ port))