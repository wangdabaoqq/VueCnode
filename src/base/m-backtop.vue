<template>
    <mu-back-top :height="1" :top="100" :right="10" :duration="1000" :callBack="backTopCallBack">
      <mu-raised-button class="demo-raised-button iconfont icon-dingbu" primary/>
    </mu-back-top>
</template>
<script>
export default {
  methods: {
    backTopCallBack () {
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable" 
.mu-raised-button-primary
  background-color $color-theme 
  border-radius 50%
  color #fff
.mu-raised-button
  width 50px
  height 50px
  min-width 100% 
.iconfont
  font-size 30px    
</style>