
// ############# https://fireship.io/snippets/how-to-use-google-apis-or-gapi-with-firebase-auth/

import * as firebase from "firebase";

var gapi;

var CLIENT_ID = "776464730949-n570eg17u5j00g15rpdpu85phhjblvdi.apps.googleusercontent.com";
var API_KEY = "O2D_8jTV7_R5u4ySAddVCSjA";

gapi.load('client', () => {
    console.log('loaded client')
  
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
      scope: 'https://www.googleapis.com/auth/some.scope'
    })
  })

const googleAuth = gapi.auth2.getAuthInstance()
const googleUser = googleAuth.signIn();

const token = googleUser.getAuthResponse().id_token;

const credential = firebase.auth.GoogleAuthProvider.credential(token);

firebase.auth().signInAndRetrieveDataWithCredential(credential);