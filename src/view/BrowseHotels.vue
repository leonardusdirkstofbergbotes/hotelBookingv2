<template>
    <v-container>
    
      <v-layout row wrap justify-space-between elevation-1 class="pa-2 mb-16 rounded-lg light-blue lighten-5" style="position: relative;">
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

  <v-layout row justify-end class="pa-2">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="orange" dark v-bind="attrs" v-on="on">
          Filter
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>

            <v-list-item-content>
              <v-list-item-title> Maximum Price?
                <v-spacer></v-spacer>
                <span class="display-3 font-weight-light mr-1">R</span>
                <span class="display-3 font-weight-light" v-text="slider"></span>
              </v-list-item-title>
              <v-slider v-model="slider" :min="min" :max="max"></v-slider>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-btn text @click="menu = false">Cancel</v-btn>
        <v-btn color="primary" text @click="filterResults">Set Filter</v-btn>
      </v-card>
    </v-menu>
  </v-layout>

      <v-progress-circular indeterminate class="primary--text" width="7" size="70" v-if="loading">
          </v-progress-circular> <!-- Loading circle -->

        <transition name="filterView">
          <v-flex v-for="items in filters" :key="items"> <!-- Filtered results-->
            
              <v-layout xs12 row wrap class="grey lighten-4 rounded-lg pa-3 my-8" v-for="item in items" :key="item"> <!-- Individual hotel wrapper -->
          
          <v-flex xs12 md6 lg3> <!-- Image of the hotel -->
             <v-img lazy-src="@/assets/load.gif" class="white--text align-end" :src="item.imageSrc" min-height="300px">
             </v-img>
          </v-flex>

          <v-flex xs12 md6 lg9>
            <v-layout column>

                  <v-layout row xs12 justify-space-between class="px-4"><!-- Title and rating on top -->
                      <v-flex xs12 md6 lg6>
                        <h2 class="display-3">{{item.name}}</h2>
                      </v-flex >
                      
                        <v-rating xs12 md6 lg6
                          :value="item.rating"
                          length="5"
                          empty-icon="mdi-star"
                          full-icon="mdi-star"
                          half-icon="mdi-star-half"
                          half-increments
                          readonly
                          background-color="grey lighten-2"
                          color="orange accent-3"
                          size="35"
                        ></v-rating>
                      
                  </v-layout>
                

                <v-flex xs12 class="pa-4">  <!-- Description -->
                  <h5 class="subheading">{{item.info}}</h5>
                </v-flex>

                
                    <v-layout row xs12 class="pa-4 mt-10" align-end>
                      <v-layout>
                        <v-flex v-for="(value, key) in item.amenities" :key="value" shrink class="mx-2">
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon v-bind="attrs" v-on="on">{{key}}</v-icon>
                            </template>
                            <span>{{value}}</span>
                            </v-tooltip>
                        </v-flex>
                      </v-layout> <!-- amenities ends -->

                        <v-flex>
                          <h4 class="display-1"><b class="green--text text--lighten-1">R {{item.price}} </b><i class="small">p/d</i></h4>
                        </v-flex>
                          
                        <v-layout xs12 md12 lg4 justify-end> 
                          <v-btn color="primary" @click="carousel(item.id)">View more</v-btn>
                        </v-layout>
                    </v-layout>
                
            </v-layout>
          </v-flex>


        </v-layout>
          </v-flex>
        </transition>


      <transition-group appear name="slideIn" v-if="filt === false">
        <v-layout xs12 row wrap class="grey lighten-4 rounded-lg pa-3 my-8" v-for="hotel in getHotels" :key="hotel.id"> <!-- Individual hotel wrapper -->
          
          <v-flex xs12 md6 lg3> <!-- Image of the hotel -->
             <v-img lazy-src="@/assets/load.gif" class="white--text align-end" :src="hotel.imageSrc" min-height="300px">
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
                          half-icon="mdi-star-half"
                          half-increments
                          readonly
                          background-color="grey lighten-2"
                          color="orange accent-3"
                          size="35"
                        ></v-rating>
                      
                  </v-layout>
                

                <v-flex xs12 class="pa-4">  <!-- Description -->
                  <h5 class="subheading">{{hotel.info}}</h5>
                </v-flex>

                
                    <v-layout row xs12 class="pa-4 mt-10" align-end>
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
                          <h4 class="display-1"><b class="green--text text--lighten-1">R {{hotel.price}} </b><i class="small">p/d</i></h4>
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

    created () {
      var maxAmount = Math.max.apply(Math, this.getHotels.map(function(o) { return o.price; }))
      var minAmount = Math.min.apply(Math, this.getHotels.map(function(o) { return o.price; }))

      this.min = minAmount
      this.max = maxAmount
    },

    data () {
      return {
        filters: [],
        filt: false,
        slider: 380,
        menu: false,
        max: Number,
        min: Number
      }
    },

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
      },

      filterResults () {
        this.menu = false
        console.log('filter clicked')
        let amount = this.slider
        console.log(amount)
        this.filters.length = 0 // empties the array first to add new filters
        var result = this.getHotels.filter(function(obj) {
          return obj.price <= amount
        })
        this.filters.push(result)
        this.filt = true
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

.small {
  font-size: 16px;
}

.filterView-enter-active, .view-leave-active {
  transition: opacity 0.5s ease-in-out
}

.filterView-enter, .view-leave-to {
  opacity: 0;
}

.filterView-enter-active {
  transition-delay: 0.5s;
}

.filterView-enter-to, .view-leave {
  opacity: 1;
}

</style>