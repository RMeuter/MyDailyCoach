
<script>
import { Bar } from "vue-chartjs";
import Range from "../../utils/Range";
import data from "../../JsonFile/Step.json"

let i = doHeartPoint(data.heart_point, 1);
let j = doHeartPoint(data.heart_point, 2);
function doHeartPoint(data, i) {
      let ptLi = []
      let timeLi = []
      data.forEach(
        element => {
          ptLi.push(element[1]);
          timeLi.push(element[0]);
          });
      if (i == 1) return ptLi
      else return timeLi
    }

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
              label: 'Minutes consacrer pour les points coeurs',
              backgroundColor: '#2090DB',
              data: i,
              type: "line"
            }, {
              label: 'Point coeur',
              backgroundColor: '#40A451',
              data: j,
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