<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"
    app
    dark
  
    class="cyan white--text "
  
    >
      <v-list-item  >
        <v-list-item-content class="pa-6">
          <v-list-item-title  > 
           Vaccinations
          </v-list-item-title>
          <v-list-item-subtitle>
            maybe app logo goes here
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider ></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
         
          
        >
          <v-list-item-icon>
            <v-icon class="pl-6">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat  class="blue-grey lighten-3">
      <v-app-bar-nav-icon  @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vaccinations</v-toolbar-title>
    </v-app-bar>

    
    <v-main class="blue-grey lighten-5">
      <!--  -->
  
      <router-view></router-view>

    </v-main>

    <v-footer  fluid padless class="blue-grey lighten-3 " >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>SKG code -Team C</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>

  export default {
    data: () => ({ 
      drawer: null,
    items: [
          { title: 'Hospital View', icon: 'mdi-home', to:'/' },
          { title: 'Patients', icon: 'mdi-account-multiple', to:'/patients' },
          { title: 'Vaccinations', icon: 'mdi-clipboard-edit-outline', to:'/vaccinations' },
          { title: 'Statistics', icon: 'mdi-chart-areaspline' , to:'/statistics'},
          { title: 'Help', icon: 'mdi-help-box', to:'/help' },
          { title: 'Log Out', icon: 'mdi-logout', to:'/login' }
        ]
        }),
  }
</script>