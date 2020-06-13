<template>
  <v-app>
    <nav> <!-- navigate through pages -->
      <NAvbar />
    </nav>
    <main> <!-- dynamic views -->
      <router-view></router-view>
    </main>
    <footer>
      <FOoter />
    </footer>
  </v-app>
</template>

<script>
import NAvbar from '@/components/Navbar'
import FOoter from '@/components/Footer'

export default {
  name: 'App',

  components: {
    NAvbar,
    FOoter
  },

  data: () => ({
    
  }),
};
</script>
