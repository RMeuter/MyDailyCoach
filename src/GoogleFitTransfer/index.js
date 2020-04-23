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
//var IdClient = "776464730949-n570eg17u5j00g15rpdpu85phhjblvdi.apps.googleusercontent.com";
//var SecretKey = "O2D_8jTV7_R5u4ySAddVCSjA";
// MyDailyCoach =>
 var IdClient = "869369705480-oqi8167kfnjj8k7gon5fvbj8e2mu7k85.apps.googleusercontent.com"
 var SecretKey = "vhlZ0IdfUne9mZUvFhFGqKCu"
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * Voir les liens :
 * - https://developers.google.com/people/quickstart/nodejs
 * - https://developers.google.com/fit/datatypes/activity
 * 
 * 
 * 
*/

app.get("/ting", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
    //client id
    IdClient,
    //client secret
    SecretKey,
    // link to redirect
    "http://localhost:1234/steps"
    )
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"] 
    

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackUrl : req.body.callbackUrl,
            userID: req.body.userID
        })
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
        let actuDate = new Date();
        
        let obj = {
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type":"application/json",
            url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            data: { // Comment faire ces demandes : https://developers.google.com/fit/rest/v1/data-sources
                aggregateBy: [{
                    dataTypeName:"com.google.step_count.delta",
                    dataSourceId:"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }],
                bucketByTime: { durationMillis: 3600000 }, // recuperation par seau de temps (soit des données toutes les heures ici)
                startTimeMillis:  actuDate.setDate(actuDate.getDate() - 1), // date du jour de départ
                endTimeMillis: actuDate.setDate(actuDate.getDate() + 1)  // date du jour de fin
              },
        }
        const result = await axios(obj);
        //console.log(result);
        stepArray = result.data.bucket;
        //console.log(stepArray );
    } catch(e){
        // result.res.statusCode
        console.log("erreur: "+e );
    }
    ///*
    //console.log("Les points \n\n\n\n");
    //console.log(points);
    try {
        let valueSteps = []
        for(const dataset of stepArray){
            for(const points of dataset.dataset){
                for(const steps of points.point){
                    for(const v of steps.value){
                        console.log(v.intVal);
                        valueSteps.push(v.intVal)
                    }
                }
            }
        }
        console.log(valueSteps);
    } catch(e){
        console.log(e);
    }
    //*/
});


app.listen(port, () => console.log('GOOGLE FIT is listening on port '+ port))