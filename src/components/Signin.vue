<template>
  <div>
    <button @click="signin" class="btn">
      Connection via Google
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
      .then(result => {
        console.log(result.user);
        this.$router.replace({ name: "master" });
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