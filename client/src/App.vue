<template>
  <navBar/>
  <router-view />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import navBar from '@/components/navbar';

export default {
  name: 'App',
  components: {
    navBar
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.User.user);

    return {
      state,
      user
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
#app
  font-family: Lato, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

</style>
