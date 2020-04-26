
<script>
import { Bar } from "vue-chartjs";
import Range from "../../utils/Range";
import data from "../../JsonFile/Step.json"


export default {
  extends: Bar,
  methods:{
    
  },
  data() {
    return {
      chartdata: {
        labels: Range(0, 23, 1),
        datasets: [
            {
              label: 'Pas dans votre journée',
              backgroundColor: '#2090DB',
              data: data.steps
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