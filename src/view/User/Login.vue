<template>
    <v-container>
        <v-form @submit.prevent="handleLogin">
            <v-layout column class="pa-2">

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
                    <v-btn type="submit">Login</v-btn>
                </v-flex>

            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
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
        if (value !== null && value !== undefined) 
            this.$router.push('/')
        }
    },

    methods: {
        handleLogin () {
            const userData = {
                email:this.userEmail,
                password: this.userPassword
            }
            this.$store.dispatch('signIn', userData)
        }
    }
}
</script>