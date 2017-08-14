<template>
  <div id="app">
    <transition  name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
      <router-view  v-if="!$route.meta.keepAlive"></router-view> 
  </div>
</template>
<script>
import Index from 'components/Index'
export default {
  data () {
    return {
    }
  },
  components: {
    mindex: Index
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
.mu-buttom-item
  min-width auto!important
  height auto!important
.mu-bottom-nav
  height 50px
  .content
    .breadcrumb
      a
        color $color-theme
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width: 100%
  height: 100%
  position: relative
  -webkit-tap-highlight-color transparent
  .mu-bottom-nav-shift
    background-color  $color-theme!important
  .mu-bottom-item-active .mu-bottom-item-icon,.mu-bottom-item-active .mu-bottom-item-text 
    color $color-theme!important
  .mu-raised-button-wrapper
    height 0!important
.markdown-text 
  img
    display block
    margin-bottom 20px
    width 100%
    vertical-align middle
  p
    margin 0
    padding 0
    a
      color $color-theme
  h2
    border-bottom 1px solid #ccc
    font-size 24px
    height 65px
    line-height 30px  
    a
      color $color-theme
  h3
    font-size 16px    
  li
    list-style none
    a
      color $color-theme
      font-size 16px    
  blockquote
    border-left 4px solid #ccc  
    padding 0 10px
    color #222
    font-size 16px
    margin 6px 0 6px 0
  table
    width 100%
    display block
    overflow auto
    tr
      border 1px solid #ccc
      background-color #fff
      td
        padding 6px 13px
        border 1px solid #ccc
    tr:nth-child(2n)
      background-color #f6f8fa  
      th
        padding 6px 13px
        border 1px solid #dfe2e5
      td
        padding 6px 13px
        border 1px solid #dfe2e5

.fadeIn-enter-active,.fadeIn-leave-active {
  transition: all .8s ease;
}
.fadeIn-enter-active,.fadeIn-leave{
    opacity: 1;
}
.fadeIn-enter,.fadeIn-leave-active {
  opacity: 0;
}

</style>
