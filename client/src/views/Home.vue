<template>
  <main>
    <div>
      <input v-model="state.steering" type="range" id="steering" name="steering" min="-100" max="">
    </div>
    <div>
      <input v-model="state.drive" type="range" id="motor" name="motor" min="-100" max="">
    </div>
  </main>
  <div id="login-signup">
    <a class="link" @click="changePage('login')">Login</a>
    <a>/</a>
    <a class="link" @click="changePage('signup')">Signup</a>
  </div>
</template>

<script>
import { reactive } from 'vue';
//import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';

export default {
  setup() {
    //const storeData = useStore();
    const router = useRouter();

    const state = reactive({
      steering: "0",
      drive: "0",
    });

    function changePage(page) {
      router.push(`/${page}`);
    }

    if (process.env.NODE_ENV == 'production') {
      // For production
      state.socket = io('', { transport: ["websocket"] });
    } else {
      // For development
      state.socket = io('http://localhost:5000', { transport: ["websocket"] });
    }

    setInterval(() => {
      state.socket.emit('clientData', { steering: state.steering, drive: state.drive});
    }, 1000);

    return {
      state,
      changePage
    }
  }
}
</script>

<style lang="sass" scoped>
main


#login-signup
  position: absolute
  right: 25px
  bottom: 25px
  z-index: 10
  display: flex

  a
    text-decoration: none
    margin: auto 5px
    color: black
    font-size: 0.9em

  .link:hover
    text-decoration: underline
    cursor: pointer
</style>