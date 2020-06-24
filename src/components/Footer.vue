<template>
    <v-footer dark padless id="foot">
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

        <v-flex class="pa-1 grey">
          <v-card-text class="text-center white--text customSize">
            Hotel monkey is an online accomodation site that offers you the best hotels in South Africa. Every hotel has its own unique taste with different 
            amenities included such as indoor and outdoor swimming pools, bar area, indoor and outdoor lounges, gyms, entertainment areas and spas etc. 
            Our site is easy to use with basic online tools to guide you on your journey in booking a hotel.
          </v-card-text>
        </v-flex>

      <v-card-text class="py-2 white--text text-center caption">
        {{ new Date().getFullYear() }} — <strong>Leonardus Botes</strong>
      </v-card-text>
    </v-card>
  </v-footer>

  
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ]
    })
  }
</script>

<style scoped>
.customSize {
  font-size: 18px!important;
}
</style>