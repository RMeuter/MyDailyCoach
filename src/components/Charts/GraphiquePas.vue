
<script>
import { Line } from "vue-chartjs";
import data from "../../JsonFile/userDataFit"


var donneesCapteur = data.donneesJournaliere.CapteurPas; 
var heure = data.time;

export default {
  extends: Line,
  methods:{
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
              label: 'Pas dans votre journée',
              backgroundColor: '#2090DB',
              data: donneesCapteur
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