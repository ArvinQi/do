<template>
  <div>
    <view-box>
       <text style='font-family:iconfont4;font-size:60;color:green'>&#xe71c;&#xe60b;</text>
    </view-box>
  </div>
</template>

<style scoped>
.webview {
  flex: 1;
}

.fixed-button {
  position: absolute;
  bottom: 50px;
  right: 50px;
  background-color: #FC6621;
  border-radius: 10px;
  width: 120px;
  padding: 15px;
  color: white;
  text-align: center;
}
</style>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    
  },
  methods: {
    onClick () {
      console.log('on click')
    }
  },
  data () {
    return {
      list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
      money: null,
      showContent001: false,
      showContent002: false,
      showContent003: false,
      showContent004: false
    }
  }
}
</script>
