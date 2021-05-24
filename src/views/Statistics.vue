<template>
  <v-container fluid class="statistics">
    <bar-chart :chart-data="citiesChartData" :options="options"></bar-chart>
    <pie-chart class="chart pt-4"></pie-chart>
    <bar-chart :chart-data="hospitalsChartData" :options="options"></bar-chart>
  </v-container>
</template>

<script>
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";

export default {
  components: { PieChart, BarChart },
  name: "Statistics",

  data() {
    return {
      hospitalsChartData: {
        labels: [
          "Erythros Stavros",
          "International Hospital",
          "Ipokratio",
          "Papanikolaou Hospital",
          "Papageorgiou Hospital",
          "Ahepa",
          "Agios Loukas",
          "Agios Therapodas",
          "Tzanio",
          "Alexadrio",
          "International care",
        ],
        datasets: [
          {
            label: "Vaccination Per Hospital",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [120, 190, 320, 50, 200, 300, 200, 320, 510, 620, 200, 100],
          },
        ],
      },
      citiesChartData: {
        labels: [
          "Thessaloniki",
          "Athens",
          "Larisa",
          "Volos",
          "Chania",
          "Heraclio",
          "Alexadroupoli",
        ],
        datasets: [
          {
            label: "Vaccinations Per City",
            borderWidth: 1,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            pointBorderColor: "#2554FF",
            data: [120, 190, 320, 50, 200, 300, 400],
          },
        ],
      },

      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
<style  scoped>
.side_wave {
  display: none !important;
}
</style>