
<script>
import { Bar } from "vue-chartjs";
import Range from "../utils/Range";
import Team from "../models/Team";

export default {
  extends: Bar,
  data() {
    return {
      chartdata: {
        labels: Range(1930, 2020, 4),
        datasets: [
          {
            label: "World Cup",
            backgroundColor: "#f0c419",
            data: this.team.data
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  props: {
    team: Team
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>