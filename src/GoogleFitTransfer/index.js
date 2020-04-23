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

// 869369705480-oqi8167kfnjj8k7gon5fvbj8e2mu7k85.apps.googleusercontent.com
// vhlZ0IdfUne9mZUvFhFGqKCu
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/ting", (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
    //client id
    "869369705480-oqi8167kfnjj8k7gon5fvbj8e2mu7k85.apps.googleusercontent.com",
    //client secret
    "vhlZ0IdfUne9mZUvFhFGqKCu",
    // link to redirect
    "http://localhost:1234/steps"
    )
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"] 
    
    console.log(req.body.callbackUrl);
    console.log(req.body.userID);

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackUrl : req.body.callbackUrl,
            userID: req.body.userID
        })
    })

    request(url, (err, response, body) => {
        console.log("error:", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({url});
    } )
});


app.get("/steps",async (req, res)=> {
    const queryURL = new urlParse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    
    const oauth2Client = new google.auth.OAuth2(
        //client id
        "869369705480-oqi8167kfnjj8k7gon5fvbj8e2mu7k85.apps.googleusercontent.com",
        //client secret
        "vhlZ0IdfUne9mZUvFhFGqKCu",
        // link to redirect
        "http://localhost:1234/steps"
        )
    
    const tokens = await oauth2Client.getToken(code); 
    //console.log(tokens);
    res.send("BROOOTHHH'");
    ///*
    let stepArray = [];

    try {
        var actuDate = new Date();
        const result = await axios({
            method: "POST",
            headers: {
                authorization: "Bearer " + tokens.tokens.access_token
            },
            "Content-Type":"application/json",
            url:"https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
            data: { // Comment faire ces demandes : https://developers.google.com/fit/rest/v1/data-sources
                "aggregateBy": [{
                "dataSourceId":
                    "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }],
                "bucketByTime": { "durationMillis": 86400000 }, // nombre d'heure à recuperer en 1 journée 24 heure...
                "startTimeMillis": actuDate.getTime(), // date du jour de départ
                "endTimeMillis": actuDate.setDate(actuDate.getDate() - 2) // date du jour de fin
              },
        });
        //console.log(result);
        stepArray = result.data.bucket;
    } catch(e){
        console.log(e);
    }

    try {
        for(const dataset of stepArray){
            //console.log(dataset);
            for(const points of dataset.dataset){
                //console.log(points);
                for(const steps of points.point){
                    console.log(steps.value)
                }

            }
        }
    } catch(e){
        console.log(e);
    }
    //*/
});


app.listen(port, () => console.log('GOOGLE FIT is listening on port '+ port))