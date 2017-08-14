<template>
  <div class="footers">
    <!-- <mu-paper>
    <mu-bottom-nav :value="bottomNav"   @change="handleChange">
      <mu-bottom-nav-item value="index" to="index" title="首页" icon="home"/>
      <mu-bottom-nav-item value="create" to="create" title="发布" icon="create"/>
      <mu-bottom-nav-item value="message" to="message" title="消息" icon="message"/>
      <mu-bottom-nav-item value="userinfo" to="userinfo" title="我的" icon="person"/>
      <mu-bottom-nav-item value="about" to="about" title="关于" icon="info"/>
    </mu-bottom-nav>
  </mu-paper> -->
  <mu-paper>
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="Index" to="index" title="首页" icon="home"/>
      <mu-bottom-nav-item value="Create" to="create" title="发布" icon="create"/>
      <mu-bottom-nav-item value="Message" to="message" title="消息" icon="message"/>
      <mu-bottom-nav-item value="Userinfo" to="userinfo" title="我的" icon="person"/>
      <mu-bottom-nav-item value="About" to="about" title="关于" icon="info"/>
  </mu-bottom-nav>
</mu-paper>
  </div> 
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        bottomNav: 'Index'
        // list: [
        //   {
        //     title: '首页',
        //     name: 'index',
        //     icon: 'icon-shouye'
        //   },
        //   {
        //     title: '发表',
        //     name: 'create',
        //     icon: 'icon-feiji'
        //   },
        //   {
        //     title: '消息',
        //     name: 'message',
        //     icon: 'icon-sms'
        //   },
        //   {
        //     title: '我的',
        //     name: 'userinfo',
        //     icon: 'icon-geren'
        //   },
        //   {
        //     title: '关于',
        //     name: 'about',
        //     icon: 'icon-guanyu'
        //   }
        // ]
      }
    },
    created () {
      this.facthData()
    },
    watch: {
      '$route': 'facthData'
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      facthData () {
        if (this.userInfo.accesstoken) {
          // console.log('yes')
          this.person_path = '/userinfo'
        } else {
          // console.log('no')
          this.person_path = '/index'
        }
        if (this.$route.path === '/index') {
          this.bottomNav = 'Index'
        }
        if (this.$route.path === '/create') {
          this.bottomNav = 'Create'
        }
        if (this.$route.path === '/message') {
          this.bottomNav = 'Message'
        }
        if (this.$route.path === '/about') {
          this.bottomNav = 'About'
        }
        if (this.$route.path === '/userinfo') {
          this.bottomNav = 'Userinfo'
        }
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  ul 
    list-style none
  .footers
    position fixed
    width 100%
    overflow hidden
    bottom 0
    box-shadow 0 1px 4px $color-theme-color
    z-index 9
    background $color-text
    ul 
      margin 0  
      padding 0
      display flex
      flex-wrap nowrap
      li
        float left
        display inline-block
        flex 2
        height 50px
        margin 0px 0
        line-height 50px
        text-align center
        position relative
        flex-direction: column;
        a
          display block
          text-decoration none
          height 100%
          color $color-background
          i
            line-height 24px
            display block
            margin 4px 4px
          em
            font-size $font-size-medium
            display block
            line-height 15px
            font-style normal
      & .active a
        color $color-theme 
      // & .active:after
      //   content ''
      //   position absolute
      //   right 0
      //   left 0 
      //   bottom  1px
      //   z-index 1
      //   height 3px
      //   background #80bd01
         
</style>
