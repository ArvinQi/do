<template>
  <div class="header">
    <text class="email">{{email}}</text>
    <text class="logo">D O</text>
    <text class="logout" @click="logout">logout</text>
  </div>
</template>

<style>
  .header {
    position: relative;
    height: 70px;
    flex-direction: row;
    background-color: #20a0ff;
    justify-content: space-between;
  }
  .logo {
    position: absolute;
    width: 375px;
    top: 25px;
    font-size: 40px;
    color: #fff;
    text-align: center;
  }
  .email{
    left: 10px;
    line-height: 110px;
    color: #fff;
  }
  .logout{
    right: 10px;
    line-height: 110px;
    color: #fff;
  }
</style>

<script>
  export default {
    props: {
      email: {
        type: String,
        required: true
      }
    }
  }
</script>