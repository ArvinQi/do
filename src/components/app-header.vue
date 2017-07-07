<template>
  <div class="header">
    <div class="do-header">
    <text class="email">{{email}}</text>
    <text class="logo">{{title}}</text>
    <text class="logout" @click="logout">logout</text>
    </div>
  </div>
</template>

<script>
  const storage = weex.requireModule('storage')
  export default {
    props: {
     title: {
        type: String,
        default: 'D O'
      } 
    },
    data() {
      return {
        email: ''
      }
    },
    mounted() {
      storage.getItem('User-Email', e => {
        this.email = e.data;
      })
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    height: 120px;
    margin-bottom: 2px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #20a0ff;
  }
  .do-header{
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    position: absolute;
    width: 200px;
    left: 375px;
    bottom: 10px;
    margin-left: -100px;
    font-size: 40px;
    color: #fff;
    text-align: center;
    align-items: center;
  }
  .email{
    left: 10px;
    bottom: 10px;
    /*line-height: 110px;*/
    color: #fff;
  }
  .logout{
    right: 10px;
    bottom: 10px;
    /*line-height: 110px;*/
    color: #fff;
  }
</style>
