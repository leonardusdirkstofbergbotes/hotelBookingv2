<template>
    <v-container>
        <v-layout column class="mt-5 mb-14"> <!-- single hotel wrapper (stacks) -->

            <v-flex class="mb-2">
                <h1 class="display-3">{{hotel.name}}</h1>
            </v-flex>

            <v-flex xs12>
                <v-carousel cycle="4000" class="rounded-lg">
                    <v-carousel-item v-for="(value, key) in hotel.carouselItems" :key="key" :src="value">
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
            
            <v-layout wrap class="my-3 pa-1">

            <v-flex xs12 sm6 lg3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3294.3142077488496!2d19.007320314980507!3d-34.34248055122884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdd9dccaf23b01%3A0xd99af027e1e23165!2s21%20Neethling%20St%2C%20Kleinmond%2C%207195!5e0!3m2!1sen!2sza!4v1592935764814!5m2!1sen!2sza" height="250" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>            
            </v-flex>

            <v-flex xs12 sm6 lg9 class="px-5">
                <v-layout column>
                    <v-flex>
                        {{hotel.info}}
                    </v-flex>
                </v-layout>

            </v-flex>
            </v-layout>
            


            <v-dialog
      v-model="book"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" v-bind="attrs" v-on="on">Book</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline blue lighten-4 mb-4" primary-title>
          Review your Booking information
        </v-card-title>

        <h2 class="display-2 text-center">{{hotel.name}}</h2>
        <v-img max-height="250px" class="mx-4 rounded-t-circle" :src="hotel.imageSrc"></v-img>
        

        <v-layout column v-for="item in bookings" :key='item.adults' class="mx-4 pa-2">
            <v-layout row class="my-6">
                <v-layout column>
                    <v-flex class="text-center">
                        <v-icon left>fa-calendar-check</v-icon>
                        <b>Check in date</b>
                    </v-flex>
                    <v-flex class="text-center">
                        {{item.dateIn}}
                    </v-flex>
                </v-layout>

                <v-layout column>
                    <v-flex class="text-center">
                        {{days}}
                    </v-flex>
                    <v-flex class="text-center">
                        days
                    </v-flex>
                </v-layout>

                <v-layout column>
                    <v-flex class="text-center">
                        <b>Check out date</b>
                        <v-icon right>fa-calendar-minus</v-icon>
                    </v-flex>
                    <v-flex class="text-center">
                        {{item.dateOut}}
                    </v-flex>
                </v-layout>
            </v-layout>


            <v-layout row align-center>
                <v-flex shrink>
                    Adults: R {{item.adults * (days * hotel.price)}}  
                </v-flex>
                
                <v-flex shrink>
                    <v-rating xs12 md6 lg6
                        :value="item.adults"
                        :length="item.adults"
                        empty-icon=""
                        full-icon="fa-male"
                        readonly
                        background-color="grey lighten-2"
                        color="orange accent-3"
                        size="20"
                    ></v-rating>
                </v-flex>
            </v-layout>

            <v-layout row align-center v-if="item.children !== 0" class="mb-7">
                <v-flex  shrink>
                    Children: R {{item.children * (hotel.price/2 * days)}} <i class="grey--text customText">(50% off)</i>
                </v-flex>

                <v-flex shrink>
                    <v-rating xs12 md6 lg6
                        :value="item.children"
                        :length="item.children"
                        empty-icon=""
                        full-icon="fa-child"
                        readonly
                        background-color="grey lighten-2"
                        color="orange accent-3"
                        size="20"
                    ></v-rating>
                </v-flex>
            </v-layout>


            
            <v-flex class="ml-auto red--text">
                <b class="text-decoration-underline">Total: R {{ (item.adults * (days * hotel.price)) + (item.children * (hotel.price/2 * days)) }} <i class="grey--text customText">incl VAT</i></b>
            </v-flex>

        </v-layout>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            dark
            @click="book = false"
          >
            Proceed to checkout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

            
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],

    data () {
        return {
            book: false
        }
    },

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

<style scoped>
.customText {
    font-size: 10px!important ;
}

</style>