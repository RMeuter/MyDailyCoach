
const IdClient = "776464730949-n570eg17u5j00g15rpdpu85phhjblvdi.apps.googleusercontent.com";
const SecretKey = "O2D_8jTV7_R5u4ySAddVCSjA";
const scopes = [
    "https://www.googleapis.com/auth/fitness.body.read "+
    "https://www.googleapis.com/auth/fitness.activity.read " + 
    "profile email openid"
   ]
// create the 'options' object
export default {
  apiKey: SecretKey,
  clientId: IdClient+".apps.googleusercontent.com",
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest'],
  scope: scopes
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};
 
