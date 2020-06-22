<template>
    <v-footer dark padless id="foot">
    <v-card flat tile class="grey lighten-2 white--text text-center">
      <v-card-text>
        Some random text
      </v-card-text>

      <v-card-text class="grey--text pt-0" id="here">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text">
        {{ new Date().getFullYear() }} — <strong>Leonardus Botes</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      
    })
  }
</script>