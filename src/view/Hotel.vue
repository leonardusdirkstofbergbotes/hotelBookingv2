<template>
    <v-container>
        <v-layout column> <!-- single hotel wrapper (stacks) -->

            <v-flex>
                <h1 class="display-3">{{hotel.name}}</h1>
            </v-flex>

            <v-flex xs12>
                <v-carousel cycle interval="3000">
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
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {

        hotel () {
            return this.$store.getters.singleHotel(this.id)
        }
    }
}
</script>