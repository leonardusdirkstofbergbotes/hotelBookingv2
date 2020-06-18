<template>
    <v-container>
        <v-form @submit.prevent="handleSignUp">
            <v-layout column class="pa-2">

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

                <v-flex xs12>
                    <v-btn type="submit">Sign up</v-btn>
                </v-flex>

            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            userName: '',
            userEmail: '',
            userPassword: ''
        }
    },

    computed: {
        user() {
            return this.$store.getters.getUser
        }
    },

    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/')
                alert('Thank you ' + this.user[0].name + ' for signing up.  Please login to continue')
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
        }
    }
}
</script>