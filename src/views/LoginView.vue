<template>
  <div class="login">
    <text class="login-logo">D O</text>
    <div>
      <input v-model="email" type="text" placeholder="email" class="input"></input>
      <input v-model="password" type="password" placeholder="password" class="input"></input>
      <text class="error" v-if="error">{{error}}</text>
      <text class="button" value="loading..." v-if="loading"></text>
      <text class="button" value="Login" @click="login" v-else></text>
      <text class="goto" @click="jump('/register')">No account, register?</text>
    </div>
  </div>
</template>

<style scoped>
  .login {
    padding: 20px;
    background-color: #fff;
  }

  .login-logo {
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
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 48px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }

  .input {
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 40px;
    margin-right: 40px;
    /*placeholder-color: #ccc;*/
    background-color: #ffffff;
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
    /* line-height: 1; */
    outline: none;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 10px;
    padding-right: 10px;
    /*transition: border-color .2s cubic-bezier(.645, .045, .355, 1);*/
  }

  .input:focus {
    outline: none;
    border-color: #20a0ff;
  }

  .error {
    color: #ff4949;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .goto{
    color: #F7BA2A;
    text-align: center;
    font-size: 40px;
    margin-top: 30px;
  }
</style>

<script>
  import {
    mapActions,
    mapMutations,
    mapGetters,
    mapState
  } from 'vuex'
  const modal = weex.requireModule('modal')

  export default {
    data() {
      return {
        email: "",
        password: "",
        error: "",
        loading: false
      }
    },
    mounted() {},
    components: {},
    methods: {
      login() {
        this.error = "";
        if(!this.email){
          this.error = "Please input the username or email!"
        }else if(!this.password){
          this.error = "Password need!"
        }else{
          this.loading = true;
          this.$store.dispatch('LoginByEmail', {
            email: this.email,
            password: this.password
          }).then(() => {
            this.loading = false;
            this.$store.dispatch('GetInfo').then(() => {
              this.$router.push('/index');
            })
            // this.showDialog = true;
          }, (err)=>{
            this.loading = false;
          });
        }
      }
    }
  }
</script>