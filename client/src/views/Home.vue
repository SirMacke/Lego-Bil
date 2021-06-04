<template>
  <main>
    <h1>DriverBot</h1>
    <div id="container">
      <div class="slidecontainer">
        <input v-model="state.direction" type="range" class="slider" id="direction" name="direction" min="0" max="90">
      </div>
      <div class="slidecontainer">
        <input v-model="state.speed" type="range" class="slider" id="speed" name="speed" min="-100" max="100">
      </div>
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
      speed: 0,
      direction: 0,
      arrowRight: false,
      arrowLeft: false,
      arrowUp: false,
      arrowDown: false
    });

    document.addEventListener("keydown", event => {
      keyUpdate(event.key, true)
    });
    document.addEventListener("keyup", event => {
      keyUpdate(event.key, false)
    });

    function keyUpdate (key, keyDown) {
      switch (key) {
        case "d":
          state.arrowRight = keyDown;
          break;
        case "a":
          state.arrowLeft = keyDown;
          break;
        case "w":
          state.arrowUp = keyDown;
          break;
        case "s":
          state.arrowDown = keyDown;
          break;
      }
    }

    setInterval(() => {
      if (state.arrowUp && state.speed < 100) state.speed += 2;
      if (state.arrowDown && state.speed > -100) state.speed -= 2;
      if (state.arrowLeft && state.direction < 90) state.direction += 2;
      if (state.arrowRight && state.direction > 0) state.direction -= 2;
    }, 20);

    const mqttConnect = () => {
      mqtt.launch(state.user.id, (topic, source) => {
        console.log("message:", source, 'on topic:', topic);
      });
      //mqtt.subscribe({ 'ping': 1 });
      setInterval(() => {
        mqtt.publish(state.user.adress + "/speed", parseInt(state.speed));
        console.log(`Speed: ${state.speed}`);
        mqtt.publish(state.user.adress + "/direction", parseInt(state.direction));
        console.log(`Direction: ${-state.direction + 45}`);
      }, 100);
    }
    mqttConnect();

    /*const mqttDisconnect = () => {
      mqtt.end()
    }*/

    return {
      state,
      mqttConnect
    }
  }
}
</script>

<style lang="sass" scoped>
main
  overflow: hidden  

  h1
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 25px
    text-align: center
    margin: 0px

    @media screen and (max-width: 800px)
      top: 50%
      right: -200px
      transform: rotateZ(90deg) translateX(0%)

  #container
    display: flex

    @media screen and (max-width: 800px)
      flex-direction: column

    div
      width: 50vw
      height: 100vh
      position: relative

      @media screen and (max-width: 800px)
        width: 100vw
        height: 50vh

    .slidecontainer

      /* The slider itself */
      .slider
        -webkit-appearance: none  /* Override default CSS styles */
        appearance: none
        width: 100% /* Full-width */
        height: 25px /* Specified height */
        background: #d3d3d3 /* Grey background */
        outline: none /* Remove outline */
        opacity: 0.7 /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s /* 0.2 seconds transition on hover */
        transition: opacity .2s
        position: absolute
        width: 60%
        left: 25%
        top: 50%
        transform: rotateZ(-90deg)

        @media screen and (max-width: 800px)
          left: 50%
          transform: rotateZ(0deg)
          transform: translate(-50%, -50%)

      /* Mouse-over effects */
      .slider:hover
        opacity: 1 /* Fully shown on mouse-over */

      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      .slider::-webkit-slider-thumb
        -webkit-appearance: none /* Override default look */
        appearance: none
        width: 25px /* Set a specific slider handle width */
        height: 25px /* Slider handle height */
        background: #04AA6D /* Green background */
        cursor: pointer /* Cursor on hover */

      .slider::-moz-range-thumb
        width: 25px /* Set a specific slider handle width */
        height: 25px /* Slider handle height */
        background: #04AA6D /* Green background */
        cursor: pointer /* Cursor on hover */

      #direction
        transform: rotateZ(180deg)

        @media screen and (max-width: 800px)
          left: 50%
          transform: translateX(-50%) rotateZ(90deg)
          width: 40%


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