<template>
  <v-container fluid >
   
   <v-card
   :loading=loading>
   <v-carousel :continuous="false"
      
      color="primary"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="1080"
     
      ><v-carousel-item
       
      
      > 
       <div class="pa-12" > <bar-chart class="mt-6 pa-sm-4 pa-lg-12" max-width="780" v-if="citiesChartData.length>0" :chart-data="citiesChartData" :chartColors="colors" :options="options" label="Vaccinations per City"></bar-chart>
        <pie-chart class=" mt-6 pa-sm-4 pa-lg-12" v-if="pieChartData.length>0" :chart-data="pieChartData" :chartColors="colors" :options="pie.options" label="Vacinations" :labels="labels"> </pie-chart></div>
        </v-carousel-item>
   <v-carousel-item>
      <div class="pa-12" >
       <bar-chart class="mt-6 pa-sm-4 pa-lg-12" v-if="hospitalsChartData.length>0" :chart-data="hospitalsChartData" :chartColors="colors" :options="options" label="Vaccinations per Hospitals"></bar-chart> 
      <line-chart class="mt-6  mb-6 pa-sm-4 pa-lg-12" v-if="monthsChartData.length>0" :chart-data="monthsChartData" :chartColors="colors" :options="options" label="Vaccinations per Month"></line-chart></div></v-carousel-item>
  <v-carousel-item> 
     <div class="pa-12" >
      <bar-chart class="mt-6 pa-sm-4 pa-lg-12" v-if="countriesChartData.length>0" :chart-data="countriesChartData" :chartColors="colors" :options="options" label="Vaccinations per Country"></bar-chart>
      <line-chart class="mt-6 mb-6 pa-sm-4 pa-lg-12" v-if="agesChartData.length>0" :chart-data="agesChartData" :chartColors="colors" :options="options" label="Vaccinations per Age"></line-chart> </div></v-carousel-item>
    
    
   
   </v-carousel>
   </v-card>
   <v-snackbar
      v-model="snackbar2"
      :timeout="timeout2"
      :color="color2"
      rounded="pill"
      top
      
     
      
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar2 = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import PieChart from "../components/charts/PieChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import LineChart from "../components/charts/LineChart.vue";
import StatisticsDataService from "@/services/statistics.service.js";
export default {
  components: { PieChart, BarChart,LineChart },
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
      loading:false,
      snackbar2: false,
      timeout2: 5000,
      message: "",
      color2:"",
      citiesChartData:[],
      countriesChartData:[],
      agesChartData:[],
      pieChartData:[],
      monthsChartData:[],
      labels:["COMPLETED","PENDING","CANCELLED"],
    
    pie :{
      options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
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
  methods:{
     async getData(){
       this.loading= true;
    try{
     const response = await StatisticsDataService.getMetadata(this.$store.state.auth.hospital.username);
     if(response.status==="500") throw new Error();


     var data=[];
     var metadata=[];
     var months=[];
     var merged = [].concat.apply([], response.data);
     
     //filter by status 
     var done =merged.filter((arr)=>
      
       arr["1"]["status"]=="DONE"

     )
     var cancelled = merged.filter((arr)=>
      
       arr["1"]["status"]=="CANCELLED"

     )
     var pending = merged.filter((arr)=>
      
       arr["1"]["status"]=="PENDING"

     )
     
     //categorize by object
     done.forEach((arr)=>{
       data.push(arr[0]);
       metadata.push(arr[1]);
     })
    
    let date="";
     metadata.forEach((arr)=>{
       date = new Date(arr.date);
       months.push({month: date.toLocaleString('en-us', { month: 'long' })})
        
     })
     var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
       months.sort(function(a, b){
        return monthsArray.indexOf(a.month)
           - monthsArray.indexOf(b.month);
  });
     

     
     
     this.pieChartData = [done.length,pending.length,cancelled.length];
     this.createTables(metadata,this.hospitalsChartData,"hospital-name")
     this.createTables(metadata,this.citiesChartData,"hospital-city")
     this.createTables(metadata,this.countriesChartData,"hospital-country");
     this.createTables(data,this.agesChartData,"age");
     this.createTables(months,this.monthsChartData,"month");
     this.loading= false;
    } catch(error){
      this.color2="#e17b58";
      this.message=`Couldn't load vaccinations. ${error}`
      this.snackbar2 = true;
      this.loading=false
    

    }
    },
    createTables(data,chart,groupby){
      let collection = data.reduce((r, a) => {
  
        r[a[groupby]] = [...r[a[groupby]] || [], a];
        return r;
       }, {});
       
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
