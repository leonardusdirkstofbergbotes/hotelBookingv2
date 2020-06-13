<template>
    <v-footer padless>
        
        <v-card flat tile width="100%">

            <v-divider></v-divider>

            <v-col class="grey lighten-2 py-4 text-center white--text" cols="12">
                {{ new Date().getFullYear() }} — <strong>Leonardus Botes</strong>
            </v-col>
      </v-card>

    </v-footer>
</template>

<script>
  export default {
    data: () => ({
      
    })
  }
</script>