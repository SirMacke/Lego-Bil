<template>
  <main>
    <div>
      <input v-model="state.direction" type="range" id="steering" name="steering" min="-100" max="">
    </div>
    <div>
      <input v-model="state.speed" type="range" id="motor" name="motor" min="-100" max="">
    </div>
  </main>
  <button @click="mqttConnect">Connect</button>
  <div id="login-signup">
    <a class="link" @click="changePage('login')">Login</a>
    <a>/</a>
    <a class="link" @click="changePage('signup')">Signup</a>
  </div>
</template>

<script>
import { reactive } from 'vue';
import mqtt from '../api/mqtt'

export default {
  setup() {
    const state = reactive({
      user: {
        id: '123',
        adress: "maximilian.helmersson@abbindustrigymnasium.se"
      },
      direction: 0,
      speed: 0
    });

    const mqttConnect = () => {
      mqtt.launch(state.user.id, (topic, source) => {
        console.log("message:", source, 'on topic:', topic);
      });
      //mqtt.subscribe({ 'ping': 1 });
      setInterval(() => {
        mqtt.publish(state.user.adress + "/bot", [state.speed, state.direction]);
      }, 1000);     
    }
    mqttConnect();

    const mqttDisconnect = () => {
      mqtt.end()
    }

    return {
      state,
      mqttConnect,
      mqttDisconnect
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