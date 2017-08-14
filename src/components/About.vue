<template>
  <div class="layout">
       <mu-appbar class="title" title="项目介绍">
         <mu-icon-button @click="goBack" icon="arrow_back" slot="left" />
       </mu-appbar>
    <div class="content">
      <div class="breadcrumb">
        <mu-breadcrumb>
          <mu-breadcrumb-item href="/https://github.com/wangdabaoqq/VueCnode">VueCnode项目地址</mu-breadcrumb-item>
        </mu-breadcrumb>
      </div>
      <div class="body">
        <mu-sub-header>介绍如下:</mu-sub-header>
        <mu-content-block>
          此项目本来打算是练练手,然后跟着项目学习学习vue,当然在项目当中遇到了很多问题,有解决的也有没有解决的,没有解决的后期我会继续
          进行解决,如果你想了解更多的内容详情,独家新闻请点击左上方的地址进行查看。希望各位看官老爷,技术大牛等等爸爸们,可以给个start,稍微
          鼓励下,你看怎么样。万分感谢！那我就先告辞。
        </mu-content-block>
      </div>
    </div>
    <div class="footer">
      VueCnode ©2017 Created github
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="stylus">
a
  color #009688
.layout
  background-color: rgb(236, 236, 236)
  .mu-appbar
    background-color  #009688
    text-align left
    .mu-appbar-title
      text-align left
  .content
    width 90%
    margin 0 auto
    .breadcrumb
      margin 10px 0
      font-size 18px
    .body
      background-color white
      border-radius 5px
      min-height 500px
  .footer
    padding 20px 0
    text-align center
</style>