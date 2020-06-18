<template>
  <div>

    <v-progress-circular indeterminate class="primary--text" width="7" size="70" v-if="loading">
    </v-progress-circular> <!-- Loading circle -->

    <v-container>
      <v-layout justify-center row wrap class="mb-1 pa-4">
        <v-flex xs12> <!-- Heading -->
          <h1 class="display-3">Search for a hotel</h1>
          <h5 class="subheading">Search the top cities</h5>
        </v-flex>
      </v-layout>

    <v-form @submit.prevent="handleSearch">
      <v-layout justify-space-between row wrap class="white lighten-4 pa-4 rounded-lg mb-6" elevation-10> <!-- Search bar -->
        
        <v-flex xs12 lg3> <!-- Search location -->
          <v-autocomplete v-model="location" :items="locations" label="Location" prepend-inner-icon="mdi-map-marker"></v-autocomplete>
        </v-flex>
        <v-flex xs12 lg2>

          <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px"
          > <!-- Check in date -->
        <template v-slot:activator="{ on, attrs }"> 
          <v-text-field v-model="dateIn" label="Check in" prepend-inner-icon="fa-calendar-check"
            readonly v-bind="attrs" v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateIn" @input="menu2 = false"></v-date-picker>
      </v-menu>
        </v-flex>

        <v-flex xs12 lg2>
          <v-menu :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px"
          ><!-- Check out date -->
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="dateOut" label="Check out" prepend-inner-icon="fa-calendar-minus"
            readonly v-bind="attrs" v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateOut"></v-date-picker>
      </v-menu>
        </v-flex>


        <v-flex xs12 lg1> <!-- Number of children -->
          <v-text-field label="Children" v-model="children" prepend-inner-icon="fa-child" type="number"></v-text-field>
        </v-flex>

        <v-flex xs12 lg1> <!-- Number of adults -->
          <v-text-field label="Adults" prepend-inner-icon="fa-male" v-model="adults" type="number"></v-text-field>
        </v-flex>

        <v-flex xs12 lg2 class="my-auto">
          <v-btn router  type="submit" block x-large class="primary">Search<v-icon right>fa-search</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-form>
      
    </v-container>

    <v-container class="my-9"> <!-- top rated hotels wrapper -->

      <v-layout row justify-center class="mb-6"> <!-- Heading -->
        <v-flex xs12 style="text-align: center;">
          <h1 class="display-3">Explore our top rated hotels</h1> 
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>
        <v-flex xs12 lg4 class="mb-4">
          <v-card class="mx-auto" max-width="290">
            <v-img class="white--text align-end" height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>
            
            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>
            
            <v-card-actions>

              <v-btn @click="viewHotel('01')" color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 lg4 class="mb-4">
          <v-card class="mx-auto" max-width="290">
            <v-img class="white--text align-end" height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                Share
              </v-btn>

              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 lg4 class="mb-4">
          <v-card class="mx-auto" max-width="290">
            <v-img class="white--text align-end" height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>Top 10 Australian beaches</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitehaven Beach</div>

              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                Share
              </v-btn>

              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>

      <v-layout justify-center row wrap class="mb-1 pa-4">
          <v-flex xs12 class="mx-10"> <!-- Heading -->
            <h1 class="display-3">Browse the top cities</h1>
          </v-flex>
        </v-layout>

      <v-layout row wrap class="text-center mx-10 mb-15 rounded-lg"  elevation-4> 
          <v-flex v-for="area in locations" :key="area" xs6 sm4 md3 lg3 class="py-4">
            {{area}}
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      location: '',
      children: 0,
      adults: 1,
      dateIn: '',
      dateOut: '',
      locations: [
        'Johannesburg', 'Bloemfontein', 'Pretoria', 'Cape Town', 'Port Elizabeth', 'Middelburg', 'George', 'Durban'
      ]
    }
    },

    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      handleSearch () {
        console.log('clicked')
        const searchData = {
          location: this.location,
          children: this.children,
          adults: this.adults,
          dateIn: this.dateIn,
          dateOut: this.dateOut
        }

        this.$store.dispatch('updateStatus', searchData)
        window.scrollTo(0, 0)
        this.$router.push('/browse/' + this.location)
      },

      viewHotel (id) {
        this.$router.push('/hotel/' + id)
      },

    }
  }
</script>

<style scoped>

#searchBar {
  margin-top: 80px;
  border-radius: 10px;
}
</style>