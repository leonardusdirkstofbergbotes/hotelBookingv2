<template>
    <v-container>
        <v-layout column> <!-- single hotel wrapper (stacks) -->
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

        hotel () {
            return this.$store.getters.singleHotel(this.id)
        }
    }
}
</script>