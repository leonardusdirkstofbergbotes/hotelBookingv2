<template>
    <v-app-bar
      color="light-blue" dense dark>
        <v-btn icon to="/">
            <v-icon>fa-home</v-icon>
        </v-btn>
        <v-toolbar-title>
          <router-link to="/" style="cursor: pointer" tag="span">Brand comes here</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
        <v-btn text link href="#foot">
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
                        :rules="nameRules"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        name="email"
                        label="Email adress"
                        id="email"
                        v-model="userEmail"
                        type="email"
                        :rules="emailRules"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="userPassword"
                        type="password"
                        :rules="passwordRules"
                    ></v-text-field>
                </v-flex>

            </v-layout>

            <v-divider></v-divider>

            <v-card-actions>
          
          <v-btn
            color="primary"
            text
            @click="signUp = false, logIn = true"
          >
            Already have an account?
          </v-btn>

            <v-spacer></v-spacer>

         
                    <v-btn color="primary" type="submit">Sign up</v-btn>
                
        </v-card-actions>

        </v-form>

      </v-card>
    </v-dialog>

        <v-dialog
      v-model="logIn"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn text v-if="loggedIn === false" v-bind="attrs" v-on="on">
            <v-icon left>fa-user-check</v-icon>
            Login
        </v-btn>

      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >Login
        </v-card-title>

        <v-form @submit.prevent="handleLogin">
            <v-layout column class="pa-2">
                <v-progress-circular indeterminate class="primary--text" width="7" size="70" v-if="loading">
                </v-progress-circular>
                <v-flex xs12>
                    <v-text-field
                        name="email"
                        label="Email adress"
                        id="email"
                        v-model="userEmail"
                        type="email"
                        :rules="emailRules"
                        required
                    ></v-text-field>
                </v-flex>

                <v-flex xs12>
                    <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        v-model="userPassword"
                        type="password"
                        :rules="passwordRules"
                    ></v-text-field>
                </v-flex>

            </v-layout>
        
        <v-divider></v-divider>

        <v-card-actions>
          
          <v-btn
            color="primary"
            text
            @click="logIn = false, signUp = true"
          >
            Dont have an account yet?
          </v-btn>

        <v-spacer></v-spacer>

          <v-btn color="primary" type="submit">Login</v-btn>
        </v-card-actions>
        </v-form>

      </v-card>
    </v-dialog>

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
            error: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            signUp: false,
            logIn: false,
            loggedIn: false,
            userName: '',
            nameRules: [
              v => v.length < 1 || "Please fill in this field"
            ],
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
              v => v.length < 6 || 'Password must be atleast 6 characters long'
            ]
        }
    },
    computed: {
        errors () {
          return this.$store.getters.getLoginErrors
        },

        signUpErrors () {
          return this.$store.getters.getSignUpErrors
        },

        signedIn () {
            return this.$store.getters.signed
        },

        loading () {
        return this.$store.getters.loading
      }
    },

    watch: {
      signUpErrors (value) {
        if (value == 'auth/invalid-email') {
          alert("The email you have entered is badly formatted.  Make sure to type the email correctly")
        } else if (value == 'auth/email-already-in-use') {
          alert('The email address is already in use by another account. Sign up with a different email adress')
        } else if (value == 'auth/weak-password') {
          alert('Make sure that your password is atleast 6 or more characters long')
        }
      },

      errors (value) {
        if (value == 'auth/wrong-password') {
          alert('Your password is wrong. Please try again')
        } else if (value == 'auth/invalid-email') {
          alert("Please make sure that you typed the email correctly")
        } else if (value == 'auth/user-not-found') {
          alert ('The email adress you entered is not a registered account.  Please try again or alternatively register for an account')
        } else if (value == 'auth/too-many-requests') {
          alert ('You have made to many request. Please Try again later')
        }
      },

        signedIn (value) {
            console.log(value)
            if (value !== null) {
                this.loggedIn = true
                this.userName = value.name
                this.signUp = false
                this.logIn = false
            } else if (value == null || value == undefined) {
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

        handleLogin () {
            const userData = {
                email:this.userEmail,
                password: this.userPassword
            }
            this.$store.dispatch('signIn', userData)
        },

        logOut() {
            this.$store.dispatch('logout')
        }
    }
}
</script>