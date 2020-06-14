<template>
  <div>
    <v-container id="searchBar"> <!-- Searchbar -->
      <v-layout justify-center row wrap>
        <v-flex xs12> <!-- Heading -->
          <h1 class="display-3">Search for a hotel</h1>
          <h5 class="subheading">Search the top cities</h5>
        </v-flex>
      </v-layout>

      <v-layout justify-space-between row wrap>
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
        <v-flex xs12 lg2>
          <v-btn block class="primary">Book</v-btn>
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
  }
</script>

<style scoped>

#searchBar {
  margin-top: 80px;
  border-radius: 10px;
}
</style>