<template>
  <mu-tabs class="tabs"  :value="activeTab" @change="handleTabChange">
    <mu-tab value="all" title="全部" />
    <mu-tab value="good" title="精华" />
    <mu-tab value="share" title="分享" />
    <mu-tab value="ask" title="问答" />
    <mu-tab value="job" title="招聘" />
  </mu-tabs>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
  .nav
    width 100%
    position fixed
    top 0
    z-index 5
    box-shadow 0px 1px 2px $color-theme-color
    background $color-text
    ul
      margin 0
      padding 0
      display flex
      li
        float left
        flex 1
        text-align center
        position relative
      li.active a
          color $color-background
        a
          display block
          text-decoration none
          height 50px
          line-height 50px
          font-size $font-size-medium
          color $color-theme-color
</style>
