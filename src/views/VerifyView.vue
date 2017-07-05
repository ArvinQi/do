<template>
  <div class="login">
    <text class="logo">D O</text>
    <div>
      <text class="info">{{info}}</text>
      <!--<input v-model="email" type="text" placeholder="email" class="input"></input>
      <input v-model="password" type="password" placeholder="password" class="input"></input>
      <text class="error" v-if="error">{{error}}</text>
      <text class="button" value="loading..." v-if="loading"></text>
      <text class="button" value="Verify" @click="login" v-else></text>-->
    </div>
  </div>
</template>

<style scoped>
  .login {
    padding: 20px;
    background-color: #fff;
  }

  .logo {
    font-size: 60px;
    color: #663366;
    text-align: center;
  }
  .info {
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
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
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    padding: 10px 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 48px;
    border-radius: 8px;
    color: #fff;
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
    display: block;
    color: #FF4949;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 50px;
    padding-right: 50px;
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
        loading: false,
        info: ""
      }
    },
    mounted() {
      const token = this.$route.params.token;
      this.$store.dispatch('VerifyEmail', {
        token: token
      }).then((res) => {
        modal.toast({
          message: res.message,
          duration: 0.8
        })
        this.$router.push({ path: '/login' });
      }, (err)=>{
      });
    },
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
          }).then((res) => {
            this.loading = false;
            modal.toast({
              message: res.message,
              duration: 0.8
            })
            this.$router.push({ path: '/top' });
            // this.showDialog = true;
          }, (err)=>{
            this.loading = false;
          });
        }
      }
    }
  }
</script>