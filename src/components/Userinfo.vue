<template>
  <div class="userinfo">
    <mu-appbar class="title" title="登录">
    </mu-appbar>
    <main v-if="!userInfo.loginname">
      <mu-text-field v-model="accesstoken" label="Access Token" :errorText="error"  labelFloat/>
      <mu-raised-button @click="login" label="登录" class="demo-raised-button"  primary/> 
    </main>
    <div class="content" v-if="userInfo.loginname">
        <input class="logout" title="退出" type="button" value="退出" @click="logout">
        <div class="fistContent">
          <div class="avator">
            <img :title="userContent.loginname" :src="userContent.avatar_url">
          </div>
          <div class="userdetail">
            <h3>{{userContent.loginname}}</h3>
            <p><i class="iconfont icon-github fa-2x"></i>&nbsp;：{{userContent.githubUsername}}</p>
            <p>
              <span>创建时间：{{userContent.create_at | formatDate}}</span>
              &nbsp;&nbsp;
              <span>积分：{{userContent.score}}</span>
            </p>
          </div>
        </div>
        <div class="secondContent">
          <mu-tabs class="activeTab" :value="activeTab"  @change="handleTabChange">
                <mu-tab value="chuangjian" title="最近创建的话题" />
                <mu-tab value="canyu" title="最近参与的话题" />
                <mu-tab value="shoucang" title="收藏的话题" />
            </mu-tabs>
          <div class="othertopic">
            <div v-if="articleItems.length !== 0" class="article" v-for="article in articleItems">
              <div class="articleAvator">
                <img :title="article.author.loginname" :src="article.author.avatar_url">
              </div>
              <div class="articleTitle">
                <p>{{article.author.loginname}}<i>{{article.last_reply_at | formatDate}}更新</i></p>
                <h2><router-link :to="{ path: 'detail', query: { id: article.id}}" :title="article.title">{{article.title}}</router-link></h2>
              </div>
            </div>
            <div v-if="articleItems.length === 0" class="userTips">
              <h2>暂无内容哦。。。🙃</h2>
            </div>
          </div>
        </div>
      </div> 
    <mfooter></mfooter>
  </div>  
</template>

<script>
import Footer from 'base/m-footer'
import { mapGetters } from 'vuex'
import timeago from 'timeago.js'
export default {
  components: {
    mfooter: Footer
  },
  data () {
    return {
      accesstoken: '',
      error: '',
      userContent: '',
      articleItems: '',
      loginname: '',
      activeTab: 'chuangjian'
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  created () {
  },
  methods: {
    login () {
      if (this.accesstoken === '') {
        this.error = 'accesstoken不能为空'
        return false
      }
      let url = `https://cnodejs.org/api/v1/accesstoken`
      this.axios.post(url, {
        accesstoken: this.accesstoken
      }).then(data => {
        let user = {
          loginname: data.data.loginname,
          avatar_url: data.data.avatar_url,
          userId: data.data.id,
          accesstoken: this.accesstoken
        }
        //  this.setUserInfo(user)
        this.$store.dispatch('setUserInfo', user)
        this.$router.push({
          path: '/userinfo'
        })
        this._getDate()
        // var user = window.localStorage.getItem('user')
        // user = JSON.parse(user)
        // this.loginname = user.loginname
        let url = `https://cnodejs.org/api/v1/user/${this.userInfo.loginname}`
        this.axios.get(url).then((response) => {
          this.userContent = response.data.data
          this.articleItems = response.data.data.recent_topics
        })
      }).catch((error) => {
        this.error = 'accesstoken错误'
        console.log(error)
      })
    },
    handleTabChange (value) {
      this.activeTab = value
      this.url = 'https://cnodejs.org/api/v1/topics?tab=' + value
      this._getDate(value)
    },
    _getDate (val) {
      let url = `https://cnodejs.org/api/v1/user/${this.userInfo.loginname}`
      if (val === 'chuangjian') {
        this.axios.get(url).then((response) => {
          this.articleItems = response.data.data.recent_topics
        })
      }
      if (val === 'canyu') {
        this.axios.get(url).then((response) => {
          this.articleItems = response.data.data.recent_replies
        })
      }
      if (val === 'shoucang') {
        this.axios.get(`https://cnodejs.org/api/v1/topic_collect/${this.userInfo.loginname}`).then((response) => {
          this.articleItems = response.data.data
        })
      }
    },
    logout () {
      localStorage.clear()
      window.location.reload()
    }
  },
  filters: {
    formatDate (value) {
      if (!value) {
        return ''
      }
      var timeagos = timeago()
      return timeagos.format(value, 'zh_CN')
    }
  }
}
</script>

<style lang="stylus">
@import "~common/stylus/variable"
  .mu-text-field-focus-line
    background-color $color-theme!important
  .mu-text-field.focus-state
    color $color-theme!important
  a
    color $color-background!important
  .userinfo
    display flex
    flex-direction column
    main 
      flex 1
      margin 5rem 0
      display flex
      flex-direction column
      justify-content center
      align-items center
    .mu-appbar
      background $color-theme
    .title
      text-align center
      height 50px
    .mu-raised-button-primary
      background $color-theme
    .content
      position relative
      input
        position absolute
        right 2px
        top 2px
        background $color-theme
        border-radius 2px
        border none
        outline none
        &:hover
          background-color #006741
        color #fff
      .fistContent
        display flex
        .avator
          flex 1
          margin 26px 2px
          img
            width 40px
            height 40px
            border-radius 50%
            border 1px solid #ccc
        .userdetail
          flex 6   
          h3
            margin 0px
            p
              .fa-2x
                font-size 36px
      .secondContent
        .mu-tabs
          background-color $color-theme      
    .article  
      display flex
      .articleAvator
        flex 1
        margin 20px 2px
        img
          width 40px
          height 40px
          border-radius 50%
          border 1px solid $color-theme-color
      .articleTitle
        flex 6
        h2 
          a
            color $color-theme
            text-decoration underline     
</style>
