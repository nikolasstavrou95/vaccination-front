<script>
import { Doughnut,mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Doughnut,
  mixins:[reactiveProp],
  props: {
    label: {
      type: String
    },
    labels:{
      type: Array
    },
    chartData: {
      type: Array
    },
    options:{
      type:Object
    },
    chartColors: {
      type: Object
    }
  },
   mounted() {
   
    const {
      borderColor,
      pointBorderColor,

      backgroundColor
    } = this.chartColors;
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            borderWidth: 1,
            data: this.chartData,
            
            borderColor: borderColor,
            pointBorderColor: pointBorderColor,
           
            backgroundColor: backgroundColor
          }
        ]
      },this.options);
  
 
}
}

</script>