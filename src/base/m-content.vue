<template>
  <div ref="myElement" class="content demo-infinite-container">
  <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
    <mu-tab value="all" title="全部" />
    <mu-tab value="good" title="精华" />
    <mu-tab value="share" title="分享" />
    <mu-tab value="ask" title="问答" />
    <mu-tab value="dev" title="测试" />
    <mu-tab value="job" title="招聘" />
  </mu-tabs>
    <mu-list class="mlist">
      <mback></mback>
      <div v-for="item in Lists" class="list">
        <router-link :to="{ name: 'detail', query: { id: item.id } }"> 
          <div class="container">
            <div class="author">
              <img :title="item.author.loginname" v-lazy="item.author.avatar_url">
            </div>
            <div>
              <div class="name">{{item.author.loginname}}</div>
              <div class="timer">
              {{ item.create_at | formatDate }}<span>#分享#</span>
              </div>
            </div>
          </div>
          <div class="article_middle">
            <div class="tags">
              <span v-show="item.top">置顶</span>
              <span v-show="item.good">精华</span>
              <span v-show="item.tab === 'share'">分享</span>
              <span v-show="item.tab === 'ask'">回答</span>
              <span v-show="item.tab === 'job'">招聘</span>
            </div>
          </div>
          <div class="title">{{item.title}}</div>  
          <div class="count">
            <div>
              <i class="iconfont icon-yuedu"></i>
              <span class="visit_num" title="点击数">{{item.visit_count}}</span>
            </div>
            <div>
              <i class="iconfont icon-huifu"></i>
              <span class="reply_num" title="回复数" >{{item.reply_count}}</span>
            </div>
            <div>
              <i class="iconfont icon-time"></i>
              <span>{{item.last_reply_at | formatDate}}</span>
            </div>
          </div>
        </router-link>
       </div>
       <p class="nomore" v-show="nomore">没有更多了。。。</p>
    </mu-list>
     <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" /> 
    <div class="loading-container" v-show="!Lists.length">
      <mloading></mloading>
    </div>
  </div>
</template>

<script>
import timeago from 'timeago.js'
import Loading from 'base/m-loading'
import Nav from 'base/m-nav'
import Back from 'base/m-backtop'
export default {
  components: {
    mnav: Nav,
    mloading: Loading,
    mback: Back
  },
  data () {
    return {
      activeTab: 'all',
      page: 1,
      Lists: [],
      loading: false,
      scroller: null,
      nomore: false,
      url: 'https://cnodejs.org/api/v1/topics?tab=all',
      scrollValue: null
    }
  },
  created () {
    this._getData()
  },
  mounted () {
    this.$refs.myElement.addEventListener('scroll', this.getScroll)
    this.scroller = this.$el
  },
  update () {
    this.scrollValue = 200
  },
  filters: {
    formatDate (value) {
      if (!value) {
        return ''
      }
      var timeagos = timeago()
      return timeagos.format(value, 'zh_CN')
    }
  },
  methods: {
    getScroll () {
      // this.scrollValue = 200
      // this.$refs.myElement.scrollTop = this.scrollValue
      this.scrollValue = this.$refs.myElement.scrollTop
      // console.log(this.scrollValue)
    },
    backTopCallBack () {
    },
    loadMore () {
      if (!this.nomore) {
        this.loading = true
        this.page += 1
        let url = this.url + '&page=' + this.page
        let arr = []
        setTimeout(() => {
          let that = this
          this.axios.get(url).then((res) => {
            arr = res.data.data
            if (arr.length === 0) {
              that.loading = false
              that.nomore = true
              return
            }
            that.Lists = [...that.Lists, ...arr]
            arr = []
          })
          this.loading = false
        }, 1000)
      }
    },
    handleTabChange (val) {
      this.page = 1
      this.nomore = false
      this.activeTab = val
      this.url = 'https://cnodejs.org/api/v1/topics?tab=' + val
      this._getData()
    },
    _getData () {
      this.Lists = []
      let that = this
      that.axios.get(this.url).then((res) => {
        that.Lists = res.data.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
 .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  ul
    margin 0
    padding 0
  a
    text-decoration none
    color $color-background
  .tabs
    position fixed
    top 0
    left 0
    height 4rem
    display flex
    border-top 1px solid $color-text-d 
    background $color-theme
  .content
    overflow auto
    -webkit-overflow-scrolling touch
    border 1px solid $color-theme-color
    margin 5rem 0 3rem 0
    .container
      display flex
    .mlist 
      background $color-sub-theme
      padding 0
      .list
        padding 15px 15px 0 15px
        margin-bottom 15px
        box-shadow 0 0 5px $color-theme-color
        background $color-text
        position relative
        .author
          display inline-block  
          img
            width 32px
            height 32px 
            border-radius 50%  
        .article_middle
          position absolute
          top 10px 
          right 5px    
          .tags
            span
              background $color-theme
              padding 2px 4px
              border-radius 2px
              color $color-text
              font-size $font-size-small
        .name
          font-size $font-size-medium-x
          padding-left 5px
          height 20px
          line-height 20px
        .timer
          font-size $font-size-medium
          padding-left 5px
          span
            color $color-theme
            padding-left 4px       
        .count
          display flex
          padding 10px 0
          div
            flex 1
            text-align center
            line-height 20px
            height 20px
            border-right 1px solid $color-theme-color
            span
              color $color-background
              font-size $font-size-small-s
              vertical-align top
          div:last-of-type
            border none
        .title
          border-bottom 1px solid $color-theme-color
          padding 10px 0
          font-weight 600
</style>
