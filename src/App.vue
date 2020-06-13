<template>
  <v-app>
    <nav> <!-- navigate through pages -->
      <NAvbar />
    </nav>
    <main> <!-- dynamic views -->
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import NAvbar from '@/components/Navbar'

export default {
  name: 'App',

  components: {
    NAvbar
  },

  data: () => ({
    
  }),
};
</script>
