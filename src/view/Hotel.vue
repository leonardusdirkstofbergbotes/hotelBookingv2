<template>
    <v-container>
        <v-layout column> <!-- single hotel wrapper (stacks) -->

            <v-flex>
                <h1 class="display-3">{{hotel.name}}</h1>
            </v-flex>

            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item v-for="(value, key) in hotel.carouselItems" :key="key" :src="value">
                    </v-carousel-item>
                </v-carousel>
            </v-flex>

            <v-flex>
                {{hotel.location}}
            </v-flex>
            
            <v-flex>
                {{hotel.info}}
            </v-flex>

            <v-layout column v-for="item in bookings" :key='item.adults'>
                <v-flex>
                     Adults: R {{item.adults * (days * hotel.price)}}
                </v-flex>
                <v-flex v-if="item.children !== 0">
                    Children: R {{item.children * (hotel.price/2 * days)}} (50% off)
                </v-flex>
                <v-flex>
                    <b>Total: R {{ (item.adults * (days * hotel.price)) + (item.children * (hotel.price/2 * days)) }}</b>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {

        bookings () {
            return this.$store.getters.getStatus
        },

        days () {
            return this.$store.getters.getDays
        },

        hotel () {
            return this.$store.getters.singleHotel(this.id)
        }
    }
}
</script>