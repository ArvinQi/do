<template>
  <div>
    <div class="header">
      <text>login</text>
    </div>
    <div class="login">
      <input v-model="loginName" ref="loginName" type="text" placeholder="1email/username" class="input"></input>
      <input v-model="loginPass" type="password" placeholder="password" class="input"></input>
      <text class="button" value="Login" @click="login"></text>
    </div>

  </div>
</template>

<style scoped>
  .login {
    padding: .2rem;
  }

  .button {
    font-size: 36;
    width: 100%;
    color: #41B883;
    text-align: center;
    padding-top: 10;
    padding-bottom: 10;
    border-width: 2;
    border-style: solid;
    margin-right: 20;
    border-color: rgb(162, 217, 192);
    background-color: rgba(162, 217, 192, 0.2);
  }

  .input {
    font-size: 1rem;
    height: 1rem;
    width: 100%;
    border-bottom: #ddd 2px solid;
  }
</style>

<script>
  import {
    mapActions,
    mapMutations,
    mapGetters,
    mapState
  } from 'vuex'
  import Header from '../components/header.vue'
  export default {
    data() {
      return {
        loginName: "",
        loginPass: ""
      }
    },
    mounted() {},
    components: {
      Header
    },
    methods: {
      updateLoginName(e) {
        console.log(e.value, this.$refs.loginName)
        this.loginName = e.value
      },
      updateLoginPass(e) {
        this.loginPass = e.value
      },
      login() {
        console.log('on click', this.loginName, this.loginPass)
      }
    }
  }
</script>