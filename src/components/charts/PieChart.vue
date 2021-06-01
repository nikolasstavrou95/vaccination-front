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
    ptions: {
      type: Object
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
      },
      {legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    );
  }
 }




//   data() {
//     return {
//       chartData: {
//         labels: ["Completed", "Pending", "Canceled"],
//         datasets: [
//           {
//             label: "Vaccination Status",
//             borderWidth: 1,
//             backgroundColor: [
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//             ],
//             borderColor: [
//               "rgba(255,99,132,1)",
//               "rgba(54, 162, 235, 1)",
//               "rgba(255, 206, 86, 1)",
//             ],
//             pointBorderColor: "#2554FF",
//             data: [320, 190, 20],
//           },
//         ],
//       },
//       options: {
//         legend: {
//           display: true,
//         },
//         responsive: true,
//         maintainAspectRatio: false,
//       },
//     };
//   },
//   mounted() {
//     this.renderChart(this.chartData, this.options);
//   },
// };
</script>