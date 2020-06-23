<template>
    <v-footer dark padless id="foot">
    <v-card flat tile class="grey lighten-2 white--text text-center">
      <v-card-text>
        Some random text
      </v-card-text>

      <v-card-text class="grey--text pt-0" id="here">
        Hotel monkey is an online accomodation site that offers you the best hotels in South Africa. Every hotel has its own unique taste with different 
        amenities included such as indoor and outdoor swimming pools, bar area, indoor and outdoor lounges, gyms, entertainment areas and spas etc. 
        Our site is easy to use with basic online tools to guide you on your journey in booking a hotel.  
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text">
        {{ new Date().getFullYear() }} — <strong>Leonardus Botes</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      
    })
  }
</script>