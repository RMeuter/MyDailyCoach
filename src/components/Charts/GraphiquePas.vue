
<script>
import { Bar } from "vue-chartjs";
import data from "../../JsonFile/Step.json"

var heure = data.time;
var donneesCapteur = data.steps; 

export default {
  extends: Bar,
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