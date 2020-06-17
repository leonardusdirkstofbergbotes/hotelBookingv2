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

    methods: {
        handleSignUp () {
            console.log({'Email': this.userEmail, 'Name': this.userName, 'Password': this.userPassword})
        }
    }
}
</script>