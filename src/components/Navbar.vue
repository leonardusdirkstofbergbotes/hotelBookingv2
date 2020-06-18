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

        <v-btn text router to="/signup" v-if="loggedIn === false">
            <v-icon left>fa-user-plus</v-icon>
            Sign up
        </v-btn>

        <v-btn text router to="/login" v-if="loggedIn === false">
            <v-icon left>fa-user-check</v-icon>
            Login
        </v-btn>

        <v-btn text @click="logOut" v-if="loggedIn === true">
            <v-icon left>fa-sign-out-alt</v-icon>
            Logout
        </v-btn>

        </v-toolbar-items>
    
    </v-app-bar>
</template>

<script>
export default {
    data () {
        return {
            loggedIn: false
        }
    },
    computed: {
        signedIn () {
            return this.$store.getters.signed
        }
    },

    watch: {
        signedIn (value) {
            console.log(value)
            if (value != null) {
                this.loggedIn = true
            } else if (value === null) {
                this.loggedIn = false
            }
        }
    },

    methods: {
        logOut() {
            this.$store.dispatch('logout')
        }
    }
}
</script>