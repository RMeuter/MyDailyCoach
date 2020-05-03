<template>
  <div>
    <button @click="signin" class="btn">
      Connection par Google uniquement
    </button>
    <div class="success" v-if="success">{{success}}</div>
  </div>
</template>

<script>
import * as firebase from "firebase";

export default {
  name: "Signin",
  data() {
    return {
      error: "",
      success: ""
    };
  },
  methods: {
    signin() {
      // Comprendre la connexion par google :
      // https://firebase.google.com/docs/auth/web/google-signin
      this.error = "";
      this.success = "";
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
      .auth()
      .signInWithPopup(provider)
      .then( data =>{
        if (data.additionalUserInfo.isNewUser){
          // savoir si nouveau visiteur : result.additionalUserInfo.isNewUser = false ou true
          data.user.updateProfile({
            photoURL: "hey.jpg", // some photo url
            momentRecommandation: [20,30],
            useParam:{
              "PointBienEtre":false,
              "NombreDePas":false,
              "PointCoeur":true,
              "freqCardiaque":true
            }
          }).then(
            ()=>{
              console.log("j'ai update !");
              this.error ="";
              this.success = `Account created for ${data.user.displayName}, now go to sign in page`;
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