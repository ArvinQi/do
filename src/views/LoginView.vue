<template>
  <div>
    <group>
      <cell :title="$t('My Account')" :value="$t('Protected')" @click.native="onClick"></cell>
      <cell :title="$t('Money')" @click.native="onClick" :is-loading="!money" :value="money"></cell>
      <cell :title="$t('Withdraw')" disabled is-link></cell>
    </group>
    <view-box>sdfsdf</view-box>
  
    <web class="webview" :src="url | https"></web>
    <text class="fixed-button" @click="jump(`/`)">back</text>
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

import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
export default {
  mounted () {
    setTimeout(() => {
      this.money = -1024
    }, 2000)
  },
  components: {
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
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
