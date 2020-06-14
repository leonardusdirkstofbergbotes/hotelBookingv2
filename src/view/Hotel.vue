<template>
    <v-container>
        <v-layout column> <!-- single hotel wrapper (stacks) -->
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                        v-for="item in carouselItems"
                        :key="item.url"
                        :src="item.url"
                    >
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'hotel',
    data: () => ({
      carouselItems: [
          {url: 'https://q-cf.bstatic.com/images/hotel/max1024x768/210/210996409.jpg'},
          {url: 'https://www.saltrockbeach.co.za/wp-content/uploads/2018/04/Lounge-003.jpg'},
          {url: 'https://images.daznservices.com/di/library/Goal_Turkey/e/d4/pestana-cr7-hotel_1kdnccu7lxby51mps8qi7ym7ym.jpg?t=415565470&w=1920&h=1080'}
      ]
    })
}
</script>