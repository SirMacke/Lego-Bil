<template>
  <main>
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div id="line"></div>
      <input type="text" v-model="state.usernameOrEmail" placeholder="Username or Email">
      <input type="password" v-model="state.password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
    <router-link to="/signup" class="bottom-link">
      <a id="signup">Signup</a>
    </router-link>
  </main>
</template>

<script>
import axios from "axios";
import store from '../store/';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
//import { useStore } from 'vuex';

export default {
  name: "Login",
  setup() {
    //const storeData = useStore();
    const router = useRouter();

    const state = reactive({
      usernameOrEmail: '',
      password: '',
      //user: {}
    });

    async function login() {
      const response = await axios.post('/api/routes/login', { usernameOrEmail: state.usernameOrEmail, password: state.password});
      //const response = await axios.post('http://localhost:5000/api/routes/login', { usernameOrEmail: state.usernameOrEmail, password: state.password});

      await store.dispatch('User/setUser', response.data);

      console.log('done');
      document.cookie = `auth=${response.data.auth}`

      if (response.isAdmin) router.push('/');

      //state.user = computed(() => storeData.state.User.user);
      //console.log(state.user);
    }

    return {
      state,
      login
    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

main
  width: 100%
  height: 100%
  padding: 0
  margin: 0

  form
    position: absolute
    display: -webkit-box
    display: -ms-flexbox
    display: flex
    -webkit-box-orient: vertical
    -webkit-box-direction: normal
    -ms-flex-direction: column
    flex-direction: column
    left: 50%
    top: 50%
    -webkit-transform: translate(-50%, -50%)
    transform: translate(-50%, -50%)

    h2
      text-align: center
      font-size: 3em
      margin: 50px 0px 0px 0px
      text-transform: uppercase
      color: #04AA6D

    #line
      position: relative
      width: 65px
      height: 3px
      left: 50%
      top: 25px
      -webkit-transform: translate(-50%, 0%)
      transform: translate(-50%, 0%)
      background-color: gray
      margin-bottom: 65px

    input
      width: 400px
      height: 45px
      font-family: Lato
      font-size: 1.25em
      margin-bottom: 20px
      border-radius: 2.5px
      border: 1px solid #333333
      color: black
      padding-left: 15px
      margin-left: -7.5px
      background-color: #F3F5FA

      @media (max-width: 500px)
        width: 300px

      @media (max-width: 400px)
        width: 250px

      &::placeholder
        color: #333333

      &:focus
        border-color: black

    button
      position: relative
      width: 185px
      height: 50px
      left: 50%
      -webkit-transform: translate(-50%, 0%)
      transform: translate(-50%, 0%)
      text-align: center
      font-family: Lato
      font-size: 1.4em
      background: none
      border: 2px solid #04AA6D
      margin-top: 25px

      @media (max-width: 400px)
        width: 150px

      &:hover
        cursor: pointer
        -webkit-animation-name: formButton
        animation-name: formButton
        -webkit-animation-duration: .5s
        animation-duration: .5s
        background: #04AA6D
        color: white

      @-webkit-keyframes formButton
        0%
          background: none
        100%
          background: #04AA6D

      @keyframes formButton
        0%
          background: none
        100%
          background: #04AA6D

  .bottom-link
    a
      position: absolute
      bottom: 30px
      color: #333333
      font-size: 1.1em
      width: auto

    #signup
      right: 35px
</style>