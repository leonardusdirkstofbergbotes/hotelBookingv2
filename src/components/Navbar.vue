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

        <v-menu
            left
            bottom
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                text
                v-bind="attrs"
                v-on="on"
            >
                <v-icon left>fa-coins</v-icon>
                Currency
            </v-btn>
            </template>

            <v-list flat>
            <v-subheader>Currency</v-subheader>
            <v-list-item-group v-model="currencySelected" color="primary">
                <v-list-item
                v-for="cur in currencyOptions"
                :key="cur.name"
                >
                <v-list-item-icon>
                    <v-icon v-text="cur.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="cur.name"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
        </v-menu>

        <v-btn text router to="/signup">
            <v-icon left>fa-user</v-icon>
            Sign up
        </v-btn>

        </v-toolbar-items>
    
    </v-app-bar>
</template>