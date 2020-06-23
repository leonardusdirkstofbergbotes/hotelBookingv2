<template>
  <div>
    <v-card width="100vw" height="70vh" class="mb-11">
      <v-img class="white--text align-end" height="100%" src="@/assets/front.webp">
        <v-card-title class="display-2 customBack">
          Hotel Booking made simple
        </v-card-title>
      </v-img>
    </v-card>

    <v-layout column class="mb-12 pa-1">
      <h1 class="display-3 text-center mb-2">Why choose us</h1>
      <v-layout row justify-space-around>

        <v-flex class="text-center" xs6 sm4 md4 shrink v-for="reason in reasons" :key="reason">
          <v-avatar color="orange" class="pa1" size="150">
            <span class="white--text headline">{{reason}}</span>
          </v-avatar>
        </v-flex>

      </v-layout>

    </v-layout>


    <v-container>
      <v-layout justify-center row wrap class="mb-1 pa-4">
        <v-flex xs12> <!-- Heading -->
          <h1 class="display-3">Search for a hotel</h1>
          <h5 class="subheading">Search the top cities</h5>
        </v-flex>
      </v-layout>

    <v-form @submit.prevent="handleSearch" ref="form">
      <v-layout justify-space-between row wrap class="white lighten-4 pa-4 rounded-lg mb-6 mx-1" elevation-10> <!-- Search bar -->
        
        <v-flex xs12 lg3> <!-- Search location -->
          <v-autocomplete :rules="inputRules" hide-no-data v-model="location" :items="locations" label="Location" prepend-inner-icon="mdi-map-marker"></v-autocomplete>
        </v-flex>
        <v-flex xs12 lg2>

          <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px"
          > <!-- Check in date -->
        <template v-slot:activator="{ on, attrs }"> 
          <v-text-field :rules="inputRules" v-model="dateIn" label="Check in" prepend-inner-icon="fa-calendar-check"
            readonly v-bind="attrs" v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="dateIn" @input="menu2 = false"></v-date-picker>
      </v-menu>
        </v-flex>

        <v-flex xs12 lg2>
          <v-menu :close-on-content-click="true" :nudge-right="40" transition="scale-transition"
            offset-y min-width="290px"
          ><!-- Check out date -->
        <template v-slot:activator="{ on, attrs }">
          <v-text-field :rules="inputRules" v-model="dateOut" label="Check out" prepend-inner-icon="fa-calendar-minus"
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
          <v-btn type="submit" block x-large class="primary">Search<v-icon right>fa-search</v-icon></v-btn>
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
        <v-flex xs12 sm6 lg4 class="mb-4" v-for="top in featured" :key="top.id">
          <v-card class="mx-auto" max-width="290">
            <v-img class="white--text align-end" height="200px"
              :src="top.imageSrc"
            >
            </v-img>

            <v-card-title>{{top.name}}</v-card-title>
            <v-card-subtitle class="pb-0 mb-2">{{top.location}}</v-card-subtitle>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="viewHotel(top.id)" color="primary" text>
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

      <v-layout row wrap class="mb-15 rounded-lg"  elevation-4> 
          <v-flex xs6 sm4 lg3 v-for="area in locations" :key="area" shrink class="text-center">
            <v-btn text ripple  @click="goTo(area)" style="cursor: pointer;" class="pa-5">
              {{area}}
            </v-btn>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    created() {
      console.log(document.title)
    this.$store.dispatch('getHotels')
    this.$store.dispatch('getFeatured')
  },

  mounted() {
    console.log('mounted')
  },
    data() {
      return {
        reasons: [
          'Easy booking process', 'Great user experience', 'Best rated hotels'
        ],
        inputRules: [
          v => v.length >= 3 || 'Make sure to fill in this part'
        ],
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
      },

      featured () {
        return this.$store.getters.getFeat
      },

      countHotels () {
        return this.$store.getters.countHotels
      }
    },
    
    methods: {
      handleSearch () {
        if (this.$refs.form.validate()) {
         const dates = {
            date1: this.dateIn,
            date2: this.dateOut
          }
          this.$store.dispatch('calcDays', dates)
          const searchData = {
            location: this.location,
            children: this.children,
            adults: this.adults,
            dateIn: this.dateIn,
            dateOut: this.dateOut
          }
          
          this.$store.dispatch('updateStatus', searchData)
          setTimeout(function(){ window.scrollTo(0, 0); }, 500);
          this.$router.push('/browse/' + this.location)
        }
      },

      viewHotel (id) {
        this.$router.push('/hotel/' + id)
        setTimeout(function(){ window.scrollTo(0, 0); }, 500);
      },

      goTo (area) {
        this.location = area
        if (this.countHotels === 0) {
          this.$store.dispatch('updateStatus', {location: this.location})
            this.$store.dispatch('getHotels')
            this.$router.push('/browse/' + this.location)
          } else {
            this.$store.dispatch('updateStatus', {location: this.location})
            this.$router.push('/browse/' + this.location)
          }
          setTimeout(function(){ window.scrollTo(0, 0); }, 500);
          
      }

    },

    destroyed() {
      console.log('destroyed')
    }
  }
</script>

<style scoped>

#searchBar {
  margin-top: 80px;
  border-radius: 10px;
}

.customWrap {
  justify-content: space-evenly;
}

.customBack {
  background-color: rgba(66, 168, 251, 0.719);
}
</style>