<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins:[reactiveProp],
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    options: {
      type: Object
    },
    chartColors: {
      type: Object
    }
  },

   mounted() {
    const labels = this.chartData.map(d => d.label).reverse();
    const totals = this.chartData.map(d => d.totals).reverse();
    const {
      borderColor,
      pointBorderColor,

      backgroundColor
    } = this.chartColors;
    this.renderChart(
      {
        labels: labels,
        datasets: [
          {
            label: this.label,
            data: totals,
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
           
            backgroundColor: backgroundColor
          }
        ]
      },
      this.options
    );
  }
 }

</script>