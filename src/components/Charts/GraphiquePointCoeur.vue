
<script>
import { Bar } from "vue-chartjs";
import data from "../../JsonFile/userDataFit"


var donneesCapteur = data.donneesJournaliere.CapteurPointCoeur; 
var heure = data.donneesJournaliere.heure;

export default {
  extends: Bar,
  methods:{
    doHeartPoint(i) {
      let ptLi = []
      let timeLi = []
      donneesCapteur.forEach(
        element => {
          ptLi.push(element[1]);
          timeLi.push(element[0]);
          });
      if (i == 1) return ptLi
      else return timeLi
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
              label: 'Minutes consacrés pour les points coeurs',
              backgroundColor: '#2090DB',
              data: this.doHeartPoint(1),
              type: "line"
            }, {
              label: 'Points coeur',
              backgroundColor: '#40A451',
              data: this.doHeartPoint(2),
              type: "bar"
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