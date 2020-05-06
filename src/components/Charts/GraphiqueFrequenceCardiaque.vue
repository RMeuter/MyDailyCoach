
<script>
import { Bar } from "vue-chartjs";
import data from "../../JsonFile/userDataFit";

var heure = data.donneesJournaliere.heure;
var donneesCapteur = data.donneesJournaliere.CapteurFrequencesCardiaque; 

export default {
  extends: Bar,
  methods:{
    faitFreqCardiaqMoyenHeure() {
      let arrayBPMMoyen = []
      donneesCapteur.forEach(
        arrayBPM => {
          let moyBPM = 0;
          arrayBPM.forEach( bpm => {
            moyBPM += (bpm/arrayBPM.length)
          });
          arrayBPMMoyen.push(moyBPM)
        });
      return arrayBPMMoyen;
    },
    faireArrayHeure(){
      let arrayHeureMinute = [];
      heure.forEach(temps =>{
        arrayHeureMinute.push((new Date(temps)).toTimeString().slice(0,5))
      })
      return arrayHeureMinute;
    }
  },
  data() {
    return {
      chartdata: {
        labels: this.faireArrayHeure(),
        datasets: [
            {
              label: 'Battement moyen par minute durant pour une heure',
              backgroundColor: '#2090DB',
              data: this.faitFreqCardiaqMoyenHeure(),
              type: "line"
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