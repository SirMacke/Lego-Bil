<template>
  <main>
    <h1>DriverBot</h1>
    <div id="container">
      <div>
        <div id="direction">
          <button @click="changeDirection(20)">Left</button>
          <button @click="changeDirection(-20)">Right</button>
        </div>
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
          if (!keyDown) changeDirection(-20);
          break;
        case "a":
          if (!keyDown) changeDirection(20);
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
      if (state.arrowUp && state.speed < 100) state.speed++;
      if (state.arrowDown && state.speed > -100) state.speed--;
    }, 10);

    const mqttConnect = () => {
      mqtt.launch(state.user.id, (topic, source) => {
        console.log("message:", source, 'on topic:', topic);
      });
      //mqtt.subscribe({ 'ping': 1 });
      setInterval(() => {
        mqtt.publish(state.user.adress + "/speed", parseInt(state.speed));
      }, 1000);     
    }
    mqttConnect();

    function changeDirection(value) {
      console.log(value)
      mqtt.publish(state.user.adress + "/direction", parseInt(value));
    }

    const mqttDisconnect = () => {
      mqtt.end()
    }

    return {
      state,
      mqttConnect,
      mqttDisconnect,
      changeDirection
    }
  }
}
</script>

<style lang="sass" scoped>
main
  overflow: hidden

  @media screen and (max-width: 800px)
    flex-direction: column

  h1
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 25px

  #container
    display: flex

    div
      width: 50vw
      height: 100vh
      position: relative

      @media screen and (max-width: 800px)
        width: 100vw
        height: 50vh

      #direction
        display: flex
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
        width: auto
        height: auto

      button
        height: 60px
        width: 100px
        margin: 20px
        border: none
        border-radius: 5px
        background: #d3d3d3
        transition: opacity .2s
        -webkit-transition: .2s 
        font-size: 0.9em

      button:hover
        background: #04AA6D
        cursor: pointer

    .slidecontainer

      /* The slider itself */
      #speed
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
      #speed:hover
        opacity: 1 /* Fully shown on mouse-over */

      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      #speed::-webkit-slider-thumb
        -webkit-appearance: none /* Override default look */
        appearance: none
        width: 25px /* Set a specific slider handle width */
        height: 25px /* Slider handle height */
        background: #04AA6D /* Green background */
        cursor: pointer /* Cursor on hover */

      #speed::-moz-range-thumb
        width: 25px /* Set a specific slider handle width */
        height: 25px /* Slider handle height */
        background: #04AA6D /* Green background */
        cursor: pointer /* Cursor on hover */


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