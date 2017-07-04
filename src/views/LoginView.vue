<template>
  <div class="login">
    <text class="logo">D O</text>
    <div>
      <input v-model="loginName" type="text" placeholder="email or username" class="input"></input>
      <input v-model="loginPass" type="password" placeholder="password" class="input"></input>
      <text class="button" value="Login" @click="login"></text>
    </div>

  </div>
</template>

<style scoped>
  .login {
    padding: 20px;
    background-color: #fff;
  }
  .logo{
    font-size: 60px;
    color: #663366;
    text-align: center;
  }
  .button {
    height: 80px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #bfcbd9;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 20px 40px;
    padding: 10px 15px;
    font-size: 48px;
    border-radius: 8px;
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }

  .input {
    height: 80px;
    margin: 10px 40px;
    /*placeholder-color: #ccc;*/
    background-color: #fff;
    background-image: none;
    border-radius: 8px;
    border: 1px solid #bfcbd9;
    border-width: 1px;
    border-style: solid;
    border-color: #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: none;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .input:focus{
    outline: none;
    border-color: #20a0ff;
  }
</style>

<script>
  import {
    mapActions,
    mapMutations,
    mapGetters,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        loginName: "",
        loginPass: ""
      }
    },
    mounted() {},
    components: {
    },
    methods: {
      login() {
        console.log('on click', this.loginName, this.loginPass)
      }
    }
  }
</script>