<template>
    <v-container>

      <v-layout row wrap justify-space-between elevation-1 class="pa-2 mb-11 rounded-lg">
        <v-flex xs12 class="my-1">
          <h1 class="display-1">Your search status</h1>
        </v-flex>
      <v-flex-item name="searchStatus" v-for="(value, key) in status[0]" :key="key.location" class="text-center mb-4"> 
        <b>{{key}}:</b> {{value}}
      </v-flex-item>
      </v-layout>

      <v-flex xs12 class="my-6">
        <h1 class="display-1">Showing results for <b class="display-2">{{status[0].location}}</b></h1>
      </v-flex>

      <transition-group appear name="slideIn">
        <v-layout xs12 row wrap class="grey lighten-4 rounded-lg pa-3 my-8" v-for="hotel in getHotels" :key="hotel.id"> <!-- Individual hotel wrapper -->
         
          <v-progress-circular indeterminate class="primary--text" width="7" size="70" v-if="loading">
          </v-progress-circular> <!-- Loading circle -->
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

                
                    <v-layout row xs12 class="pa-4" align-end>
                      <v-layout>
                        <v-flex v-for="(value, key) in hotel.amenities" :key="value" shrink class="mx-2">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on">{{key}}</v-icon>
                            </template>
                            <span>{{value}}</span>
                            </v-tooltip>
                        </v-flex>
                      </v-layout> <!-- amenities ends -->

                        <v-flex>
                          R {{hotel.price}} <i>p/d</i>
                        </v-flex>
                          
                        <v-layout xs12 md12 lg4 justify-end> 
                          <v-btn color="primary" @click="carousel(hotel.id)">View more</v-btn>
                        </v-layout>
                    </v-layout>
                
            </v-layout>
          </v-flex>

        </v-layout>
      </transition-group>
      
      
    </v-container>
</template>

<script>
  export default {

    props: ['location'],
    computed: {

      loading () {
        return this.$store.getters.loading
      },

      status () {
        return this.$store.getters.getStatus
      },

      getHotels () {
        return this.$store.getters.hotelLoc(this.location)
      }
    },

    methods: {
      carousel (id) {
        this.$router.push('/hotel/' + id)
      }
    }
  }
</script>

<style>

.slideIn-enter {
  opacity: 0;
  transform: scale(0);
}

.slideIn-enter-active {
  transition: all .4s ease;
  transition-delay: 0.7s;
}

.slideIn-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slideIn-leave-active {
  transition: all .1 ease;
  
}

</style>