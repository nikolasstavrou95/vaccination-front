<template>
  <v-container fluid class="statistics">
    <bar-chart class="mt-6 pa-4" v-if="citiesChartData.length>0" :chart-data="citiesChartData" :chartColors="colors" :options="options" label="Vaccinations per City"></bar-chart>
    <pie-chart class="chart mt-6 pa-4"></pie-chart>
     <bar-chart class="mt-6 pa-4" v-if="countriesChartData.length>0" :chart-data="countriesChartData" :chartColors="colors" :options="options" label="Vaccinations per Country"></bar-chart>
    <bar-chart class="mt-6 pa-4" v-if="hospitalsChartData.length>0" :chart-data="hospitalsChartData" :chartColors="colors" :options="options" label="Vaccinations per Hospitals"></bar-chart>
     <bar-chart class="mt-6 pa-4" v-if="agesChartData.length>0" :chart-data="agesChartData" :chartColors="colors" :options="options" label="Vaccinations per Age"></bar-chart>
  </v-container>
</template>

<script>
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import StatisticsDataService from "@/services/statistics.service.js";
export default {
  components: { PieChart, BarChart },
  name: "Statistics",

  data() {
    return {
      data:[],
      hospitalsChartData:[],
      colors:{
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
      },
      citiesChartData:[],
      countriesChartData:[],
      agesChartData:[],
    
      

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
  methods:{
     async getData(){
     const response = await StatisticsDataService.getMetadata(this.$store.state.auth.hospital.username);
     console.log(response.data)
     var data=[];
     var metadata=[];
     var merged = [].concat.apply([], response.data);
     console.log(merged)
     //filter by status 
     var filtered =merged.filter((arr)=>
       arr["1"]["vaccination-status"]==="DONE" ||
       arr["1"]["status"]=="DONE"

     )
     console.log(filtered)
     //categorize by object
     filtered.forEach((arr)=>{
       data.push(arr[0]);
       metadata.push(arr[1]);
     })
      console.log(data,metadata)
     this.createTables(metadata,this.hospitalsChartData,"hospital-name")
     this.createTables(metadata,this.citiesChartData,"hospital-city")
    this.createTables(metadata,this.countriesChartData,"hospital-country");
   this.createTables(data,this.agesChartData,"age");
    },
    createTables(data,chart,groupby){
      let collection = data.reduce((r, a) => {
  
        r[a[groupby]] = [...r[a[groupby]] || [], a];
        return r;
       }, {});
       console.log("group", collection);
        let objectArray = Object.entries(collection);
       
       objectArray.forEach(([key, value]) => {
       if(key!='undefined')  
        chart.push({label: key, totals:value.length})
        
    });

    }

  },

  


    
  
  mounted(){
    this.getData();
  }
};
</script>
<style  scoped>
.side_wave {
  display: none !important;
}
</style>