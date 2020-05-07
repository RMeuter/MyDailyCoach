
<script>
import { Bar } from "vue-chartjs";
import data from "../../JsonFile/userDataFit"


var donneesCapteur = data.donneesJournaliere.CapteurSommeil; 

export default {
  extends: Bar,
  methods: {
    SommeTempsSommeil(){
          let tempsSommeil = 0;
          let arraySommeil = [72, 109, 110, 111, 112];
          for (let arrayActivite in donneesCapteur){
            let i = 0;
            while(i < donneesCapteur[arrayActivite].length){
                if(arraySommeil.includes(donneesCapteur[arrayActivite][i])){
                    tempsSommeil += donneesCapteur[arrayActivite][i+1];
                }
                i+=3
            }
          }
      return tempsSommeil/3600000;
    },
  },
  
  data() {
    return {
      chartdata: {
        labels: [(new Date()).toLocaleDateString()],
        datasets: [
            {
              label: 'Temps de sommeil de la dernière nuit',
              backgroundColor: '#2090DB',
              order: 20,
              data: [this.SommeTempsSommeil()]
            },
            {
              label: 'Temps de sommeil moyen',
              backgroundColor: '#40A451',
              order: 0,
              data: [7.5],
            }
          ]},
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>