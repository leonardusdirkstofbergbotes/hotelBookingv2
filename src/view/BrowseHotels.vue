<template>
    <v-container>
      <v-layout column> <!-- Different hotel card wrapper -->
        <v-layout row wrap class="grey lighten-4 rounded-lg pa-3 my-4" v-for="hotel in hotelInfo" :key="hotel.id"> <!-- Individual hotel wrapper -->
          <v-flex xs12 md6 lg3> <!-- Image of the hotel -->
             <v-img class="white--text align-end"
              :src="hotel.imageSrc"
            >
             </v-img>
          </v-flex>

          <v-flex xs12 md6 lg9 class="pa-4"> <!-- Content to the right of the image -->
            <h2 class="display-3">{{hotel.name}}</h2>
            <h5 class="subheading">{{hotel.info}}</h5>
            <v-layout justify-end>
              <v-btn @click="viewHotel(hotel.id)">View</v-btn>
            </v-layout>
          </v-flex>

          
        </v-layout>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'browseHotels',

    data: () => ({
      hotelInfo: [
        {name: 'Raddison Hotel', info: 'blah blah blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '01'},
        {name: 'Sun International', info: 'more blahdieblie blah', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '02'},
        {name: 'Some weird hotel name', info: 'some bla text that should actually be from firebase', imageSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', id: '03'}
      ]
    }),
    methods: {
      viewHotel (id) {
        this.$router.push('/hotel/' + id)
      }
    }
  }
</script>