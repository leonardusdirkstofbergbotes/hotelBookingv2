<template>
    <v-app-bar
      color="blue lighten-5 accent-4"
      dense
      dark
    >

        <v-toolbar-title>
        <router-link to="/" style="cursor: pointer" tag="span">Brand comes here</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
        <v-btn text>
            <v-icon left>fa-address-book</v-icon>
            Contact us
        </v-btn>

        <v-btn text router to="/signup">
            <v-icon left>fa-user-plus</v-icon>
            Sign up
        </v-btn>

        </v-toolbar-items>
    
    </v-app-bar>
</template>
