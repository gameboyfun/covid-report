<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  },
  watch: {
    data: {
      handler(newChartData) {
        if (newChartData) {
          this.renderChart(this.data, this.options);
        }
      },
      deep: true,
    },
  },
};
</script>
