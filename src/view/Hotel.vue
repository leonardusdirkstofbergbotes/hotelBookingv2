<template>
    <v-container>
        <v-layout column> <!-- single hotel wrapper (stacks) -->
            <v-flex xs12>
                <v-carousel v-for="item in carousel" :key="item">
                    <v-carousel-item v-for="value in item" :key="value" :src="value">
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
            
            <v-flex>
                {{hotel.location}}
            </v-flex>
            <v-flex>
                {{hotel.name}}
            </v-flex>
            <v-flex>
                {{hotel.info}}
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {
        carousel () {
            return this.$store.getters.carousel
        },

        hotel () {
            return this.$store.getters.singleHotel(this.id)
        }
    }
}
</script>