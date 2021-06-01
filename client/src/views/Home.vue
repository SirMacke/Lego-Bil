<template>
  <main>
    <div>
      <input v-model="state.direction" type="range" id="direction" name="direction" min="-100" max="100">
    </div>
    <div>
      <input v-model="state.speed" type="range" id="speed" name="speed" min="-100" max="100">
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
        mqtt.publish(state.user.adress + "/speed", parseInt(state.speed));
        mqtt.publish(state.user.adress + "/direction", parseInt(state.direction));
      }, 500);     
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
  display: flex
  overflow: hidden

  @media screen and (max-width: 800px)
    flex-direction: column

  div
    width: 50vw
    height: 100vh
    position: relative

    @media screen and (max-width: 800px)
      width: 100vw
      height: 50vh

    #direction
      position: absolute
      width: 70%
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)

      @media screen and (max-width: 800px)
        transform: rotateZ(-90deg)
        left: 15%

    #speed
      position: absolute
      width: 70%
      left: 25%
      top: 50%
      transform: rotateZ(-90deg)

      @media screen and (max-width: 800px)
        left: 50%
        transform: rotateZ(0deg)
        transform: translate(-50%, -50%)



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