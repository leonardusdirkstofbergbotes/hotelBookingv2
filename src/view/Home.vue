<template>
  <div>
    <v-container>
      <v-layout justify-center row wrap class="mb-4 pa-4">
        <v-flex xs12> <!-- Heading -->
          <h1 class="display-3">Search for a hotel</h1>
          <h5 class="subheading">Search the top cities</h5>
        </v-flex>
      </v-layout>

      <v-layout justify-space-between row wrap class="grey lighten-4 pa-4 rounded-lg"> <!-- Search bar -->
        <v-flex xs12 lg3>
          <v-text-field label="Location"></v-text-field>
        </v-flex>
        <v-flex xs12 lg2>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="date1"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date1"
                label="Book in date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date1" no-title scrollable color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(date1)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 lg2>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="date2"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date2"
                label="Book in date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date2" no-title scrollable color="primary">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 lg1>
          <v-text-field label="Children"></v-text-field>
        </v-flex>
        <v-flex xs12 lg1>
          <v-text-field label="Adults"></v-text-field>
        </v-flex>
        <v-flex xs12 lg2 class="my-auto">
          <v-btn router to="/browse" block x-large class="primary">Book</v-btn>
        </v-flex>
      </v-layout>
      
    </v-container> <!-- Searchbar with heading -->

    <v-container> <!-- top rated hotels wrapper -->

      <v-layout row justify-center class="mb-4 mt-6"> <!-- Heading -->
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
  </div>
</template>

<script>
  export default {
    name: 'home',

    data: () => ({
      
    }),

    methods: {
      viewHotel (id) {
        this.$router.push('/hotel/' + id)
      }
    }
  }
</script>

<style scoped>

#searchBar {
  margin-top: 80px;
  border-radius: 10px;
}
</style>