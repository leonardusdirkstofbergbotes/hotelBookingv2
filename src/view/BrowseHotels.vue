<template>
    <v-container>
        <v-layout xs12 row wrap class="grey lighten-4 rounded-lg pa-3 my-4" v-for="hotel in getHotels" :key="hotel.id"> <!-- Individual hotel wrapper -->
          <v-flex xs12 md6 lg3> <!-- Image of the hotel -->
             <v-img class="white--text align-end"
              :src="hotel.imageSrc"
            >
             </v-img>
          </v-flex>

          <v-flex xs12 md6 lg9>
            <v-layout column>
                 
                  <v-layout row xs12 justify-space-between class="px-4"><!-- Title and rating on top -->
                      <v-flex xs12 md6 lg6>
                        <h2 class="display-3">{{hotel.name}}</h2>
                      </v-flex >
                      
                        <v-rating xs12 md6 lg6
                          :value="hotel.rating"
                          length="5"
                          empty-icon="mdi-star"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half-full"
                          half-increments
                          readonly
                          background-color="grey lighten-2"
                          color="yellow accent-3"
                          size="35"
                        ></v-rating>
                      
                  </v-layout>
                

                <v-flex xs12 class="pa-4">  <!-- Description -->
                  <h5 class="subheading">{{hotel.info}}</h5>
                </v-flex>

                
                    <v-layout row xs12 justify-space-between class="pa-4" align-end>
                        <v-flex>
                            Amenities come here
                        </v-flex>

                        <v-flex>
                          R {{hotel.price}}
                        </v-flex>
                          
                        <v-layout xs12 md12 lg4 justify-end> 
                          <v-btn color="primary" :to="'/hotel/' + hotel.id">View</v-btn>
                        </v-layout>
                    </v-layout>
                
            </v-layout>
          </v-flex>

        </v-layout>
      
    </v-container>
</template>

<script>
  export default {
    props: ['location'],
    computed: {
      getHotels () {
        return this.$store.getters.hotelLoc(this.location)
      }
    }
  }
</script>