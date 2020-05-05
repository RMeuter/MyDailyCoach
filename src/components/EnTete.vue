<template>
  <header>  
    <!-- ##################################### Mode connecter ######################################### !-->
    <template v-if="user.loggedIn">
      <b-container >
        <b-row align-h="center">
          <b-col lg="11">
            <b-navbar toggleable="lg" type="light" >
              <b-navbar-brand ><H1>My Daily Coach</H1> </b-navbar-brand>
              <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">   
                  <b-button v-b-toggle.collapse-1 variant="white">Paramètre</b-button>               
                  <b-button variant="danger" @click.prevent="signOut">Se déconnecter</b-button>
                </b-navbar-nav>
              </b-collapse>
            </b-navbar>
          </b-col>
        </b-row>
        <b-row>        
          <b-collapse id="collapse-1" class="mt-2 col-12">
            <b-card class="row text-center">
              <b-col class="mb-4">
                <p class="card-text">Quel horraire de recommandation voulez vous ?</p>
                <b-button v-b-toggle.collapse-1-inner size="sm">Modifiez</b-button>
                <b-collapse id="collapse-1-inner" class="mt-2">
                  <b-card>
                    <div class="col-md-6">
                      <div class="md-form md-outline input-with-post-icon timepicker" darktheme="true">
                        <input type="number" id="dark-version-example" class="form-control" :value="user.data.momentRecommandation[0]" >
                        <input type="number" id="dark-version-example" class="form-control" :value="user.data.momentRecommandation[1]" >
                        <label for="dark-version-example">Dark version, 24 hours</label>
                        <i class="fas fa-envelope  input-prefix"></i>
                      </div>
                    </div>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col  class="mb-4">
                <p class="card-text">Quel capteur voulez vous ?</p>
                <b-button v-b-toggle.collapse-2-inner size="sm">Modifiez</b-button>
                <b-collapse id="collapse-2-inner" class="mt-2">
                  <b-card>
                    <b-form-checkbox v-model="NePlusVoirExplication" name="check-button" switch>
                      Switch Checkbox <b>(Checked: {{ NePlusVoirExplication }})</b>
                    </b-form-checkbox>
                  </b-card>
                </b-collapse>
              </b-col>
              <b-col  class="mb-4">
                <p class="card-text">Quel capteur voulez vous ?</p>
                <b-button v-b-toggle.collapse-3-inner size="sm">Modifiez</b-button>
                <b-collapse id="collapse-3-inner" class="mt-2">
                  <b-card>Hello!</b-card>
                </b-collapse>
              </b-col>
            </b-card>
          </b-collapse>
        </b-row>
      </b-container >
    </template>
    <!-- ##################################### Mode Non connecter ######################################### !-->
    <template v-else>
        <b-container >
        <b-row align-h="start">
          <b-col align-self="start">
            <h1 class="mb-5">
              My Daily Coach
            </h1>
          </b-col>
        </b-row>
      </b-container >
    </template>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase";

export default {
  data(){
    return{
      NePlusVoirExplication:false
    }
  },
   methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "signin"
          });
        });
    },
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style scoped>
header {
  width: 100%;
  font-size: 1em;
  display: flex;
  flex-direction: row;
  justify-content: right;
}
button.nav-link.signout {
  padding: 0.4em;
  background-color: tomato;
  color: white;
  text-align: center;
  border-radius: 5px;
  border: none;
}
.display-name {
  margin-right: 2em;
}
</style>
