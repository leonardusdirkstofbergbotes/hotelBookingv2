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

         <v-dialog
      v-model="signUp"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn text v-if="loggedIn === false" v-bind="attrs" v-on="on">
            <v-icon left>fa-user-plus</v-icon>
            Sign up
        </v-btn>

      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Sign up
        </v-card-title>

        <v-form @submit.prevent="handleSignUp">
            <v-layout column class="pa-2">
                <v-progress-circular indeterminate class="primary--text" width="7" size="70" v-if="loading">
                </v-progress-circular>
                <v-flex xs12>
                    <v-text-field
                        name="name"
                        label="Your Name"
                        id="name"
                        v-model="userName"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        name="email"
                        label="Email adress"
                        id="email"
                        v-model="userEmail"
                        type="email"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="userPassword"
                        type="password"
                    ></v-text-field>
                </v-flex>

            </v-layout>

            <v-divider></v-divider>

            <v-card-actions>
          
          <v-btn
            color="primary"
            text
            @click="signUp = false"
          >
            Already have an account?
          </v-btn>

            <v-spacer></v-spacer>

         
                    <v-btn color="primary" type="submit">Sign up</v-btn>
                
        </v-card-actions>

        </v-form>

        

        
      </v-card>
    </v-dialog>

        <v-btn text router to="/login" v-if="loggedIn === false">
            <v-icon left>fa-user-check</v-icon>
            Login
        </v-btn>

        <v-btn text v-if="loggedIn === true">
            Welcome <i>{{userName}}</i>
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
            userName: '',
            userEmail: '',
            userPassword: '',
            signUp: false,
            loggedIn: false,
            userName: ''
        }
    },
    computed: {
        signedIn () {
            return this.$store.getters.signed
        },

        loading () {
        return this.$store.getters.loading
      }
    },

    watch: {
        signedIn (value) {
            console.log(value)
            if (value !== null) {
                this.loggedIn = true
                this.userName = value.name
                this.signUp = false
            } else if (value === null) {
                this.loggedIn = false
            }
        }
    },

    methods: {

        handleSignUp () {
            const userData = {
                name: this.userName,
                email:this.userEmail,
                password: this.userPassword
            }
            this.$store.dispatch('addUser', userData)
        },

        logOut() {
            this.$store.dispatch('logout')
        }
    }
}
</script>