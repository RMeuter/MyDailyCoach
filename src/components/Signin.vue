<template>
  <div>
    <button @click="signin" class="btn">
      Connexion par Google uniquement
    </button>
    <div class="success" v-if="success">{{success}}</div>
  </div>
</template>


<script>
import * as firebase from "firebase";
import { db } from "../main.js";

export default {
  name: "Signin",
  data() {
    return {
      error: "",
      success: "",
    };
  },
  methods: {
    signin() {
      this.error = "";
      this.success = "";
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
      .auth()
      .signInWithPopup(provider)
      .then( data => {
        if (data.additionalUserInfo.isNewUser){
          data.user.updateProfile(
            {
            displayName: data.user.displayName
            }
          ).then(
            ()=>{
              this.error ="";
              this.success = `Account created for ${data.user.displayName}, now go to sign in page`;
              console.log(this.success);

          });
          
          db.collection("UserExtraInfos").doc(data.user.uid).set({
            momentRecommandation: [20,30],
            pointBienEtre: 0,
            dernierRecommandationVu: (new Date()).getTime(),
            useParametre:{
              "NePlusVoirExplication":false,
              "capteurPas":true,
              "capteurSommeil":true
            }
          });
        }
        this.$router.replace({ name: "stats" });
      }).catch(error =>{
        console.log(error);
      });
      
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 18em;
  width: 30%;
}

button {
  margin-top: 2em;
  padding: 0.6em;
  border-radius: 5px;
  background: #41b883;
  color: white;
  border: none;
  width: 60%;
}
button:disabled {
  opacity: 0.7;
}

a {
  margin-top: 2em;
  color: white;
  font-size: 0.8em;
}
a:hover {
  color: #41b883;
}

span {
  text-decoration: underline;
  font-size: 1.3em;
}

.error {
  color: tomato;
}

.success {
  color: yellowgreen;
}
</style>