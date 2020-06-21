<template>
  <v-app>
    <nav> <!-- navigate through pages -->
      <NAvbar />
    </nav>
    <main> <!-- dynamic views -->
    <transition name="view">
      <router-view />
    </transition>
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
    
  })
};
</script>

<style>
.view-enter-active, .view-leave-active {
  transition: opacity 0.5s ease-in-out
}

.view-enter, .view-leave-to {
  opacity: 0;
}

.view-enter-active {
  transition-delay: 0.5s;
}

.view-enter-to, .view-leave {
  opacity: 1;
}
</style>
