<template>
  <div class="articleDetails" v-if="articleDetails">
    <div class="body">
      <div class="titleInfo">
        <div class="tags">
          <span v-show="articleDetails.data.top">置顶</span>
          <span v-show="articleDetails.data.good">精华</span>
          <span v-show="articleDetails.data.tab === 'share'">分享</span>
          <span v-show="articleDetails.data.tab === 'ask'">回答</span>
          <span v-show="articleDetails.data.tab === 'job'">招聘</span>
        </div>
        <h2>{{ articleDetails.data.title}}</h2>
        <div class="titileOthers">
          <div class="info">
            <div class="avator">
              <img :title="articleDetails.data.author.loginname"   :src="articleDetails.data.author.avatar_url">
            </div>
            <div class="flex">
              <div class="avatorName">
                <a>{{articleDetails.data.author.loginname}}</a>
              </div>
              <div class="time">
                <span><i class="fa iconfont icon-time"></i>{{articleDetails.data.create_at | formatDate }}</span>
              </div>
              <div class="look">
                <span><i class="fa iconfont icon-yuedu"></i>{{articleDetails.data.visit_count}}</span>
              </div>
              <div class="remark">
                <span><i class="fa iconfont icon-huifu"></i>{{articleDetails.data.reply_count}}</span>
              </div>
              <input v-show="articleDetails.data.is_collect===false" class="collect" @click="collect" type="button" value="收藏">
              <input v-show="articleDetails.data.is_collect===true" class="collect" @click="cancelCollect" type="button" value="取消收藏">
            </div>
          </div>
        </div>
      </div>
      <div class="articleContet" v-html="articleContent">
        {{articleContent}}
      </div>
      <div class="comment">
        <div class="commentNum">
          <h3>评论（{{commentInfo.length}}）</h3>
        </div>
        <div class="remarkOn"  v-if="this.userInfo.userId">
          <div class="remarkOnavatar">
            <img :title="userName" :src="userImg">
          </div>
          <textarea v-model="commentText">

          </textarea>
          <input type="button" value="发送" @click="submitComent(articleDetails.data.id)">
        </div>
        <div class="commentDetails" v-for="(comment, index) in commentInfo">
          <div class="commentuseravatar">
            <img :title="comment.author.loginname" :src="comment.author.avatar_url">
          </div>
          <div class="commentInfo">
            <p class="commentusername"><a>{{comment.author.loginname}}</a>&nbsp;&nbsp;<span>#{{index+1}}楼 {{comment.create_at | formatDate}} </span></p>
            <div class="commentcontent" v-html="comment.content">
              {{comment.content}}
            </div>
            <div class="commentOther">
              <a class="commentReply" @click="emergeReply(index, comment.author.loginname)">回复</a>
              <span class="commentHeart iconfont icon" @click="heart(comment)"  :class="{heartActive: isUps(comment.ups)}">&#xe609;&nbsp;{{comment.ups.length}}</span>
            </div>
            <div class="comentReply"   :class="{isEmerge: replyNum===index}">
              <textarea placeholder="发表你的看法...'" v-model="replyText">

              </textarea>
              <input type="button" value="回复" @click="replies(articleDetails.data.id, comment.id)">
            </div>
          </div>
        </div>
        <mu-dialog :open="publish" title="提示：">
            {{tips}}
            <mu-flat-button slot="actions" primary @click="close" label="确定" />
        </mu-dialog>
        <div v-if="commentInfo.length === 0" class="commentTips">
          <h2>暂无评论哦。。。🤣</h2>
        </div>
      </div>
      <mback>ss</mback>
<<<<<<< HEAD
      <div class="back">
        <i @click.stop.prevent="$router.go(-1)" class="iconfont icon-fanhui"></i>
=======
      <div @click="goBack" class="back">
        <i  class="iconfont icon-fanhui"></i>
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
      </div>
    </div>  
  </div>
</template>

 <script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'
    import timeago from 'timeago.js'
    import Loading from 'base/m-loading'
    import Back from 'base/m-backtop'
    import $ from 'jquery'
    export default{
      components: {
        mloading: Loading,
        mback: Back
      },
      data () {
        return {
          articleDetails: '',
          articleContent: '',
          commentInfo: '',
          isheart: true,
          userName: '',
          userImg: '',
          commentText: '',
          replyText: '',
          replyNum: '',
          shows: false,
          publish: false,
          tips: '发表成功'
        }
      },
      computed: {
        ...mapGetters({
          userInfo: 'getUserInfo'
        })
      },
      methods: {
        collect () {
          let url = `https://cnodejs.org/api/v1/topic_collect/collect`
          if (!this.userInfo.accesstoken) {
            this.$router.push({
              path: '/userinfo'
            })
          } else {
            this.axios.post(url, {
              accesstoken: this.userInfo.accesstoken,
              topic_id: this.articleDetails.data.id
            }).then((response) => {
              console.log(response.data)
              this.publish = true
              this.tips = '收藏成功'
              this.articleDetails.data.is_collect = true
            })
          }
        },
<<<<<<< HEAD
=======
        goBack () {
          this.$router.go(-1)
        },
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
        close () {
          this.publish = false
          this.dialog = false
        },
        cancelCollect () {
          let url = `https://cnodejs.org/api/v1/topic_collect/de_collect`
          this.axios.post(url, {
            accesstoken: this.userInfo.accesstoken,
            topic_id: this.articleDetails.data.id
          }).then((response) => {
            console.log(response.data)
            this.publish = true
            this.tips = '收藏失败'
            this.articleDetails.data.is_collect = false
          })
        },
        heart (value) {
          if (!this.userInfo.accesstoken) {
            this.$router.push({
              path: '/userinfo'
            })
          } else {
            let _this = this
            this.axios.post('https://cnodejs.org/api/v1/reply/' + value.id + '/ups', {
              accesstoken: _this.userInfo.accesstoken
            }).then((response) => {
              console.log(response.data.action)
              if (response.data.action === 'down') {
                let index = $.inArray(this.$store.state.userInfo.userId, value.ups)
                value.ups.splice(index, 1)
              } else {
                value.ups.push(this.$store.state.userInfo.userId)
              }
            }).catch(function (e) {
            })
          }
        },
        isUps (ups) {
          return $.inArray(this.$store.state.userInfo.userId, ups) >= 0
        },
        submitComent (value) {
          if (this.commentText === '') {
            this.tips = '内容不能为空'
            this.publish = true
            return false
          }
          this.axios.post('https://cnodejs.org/api/v1//topic/' + value + '/replies', {
            accesstoken: this.userInfo.accesstoken,
            content: this.commentText
          }).then((response) => {
            console.log(response.data)
            if (response.data.success === true) {
              this.tips = '回复成功'
              this.publish = true
              this.commentText = ''
              this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id, {
                params: {
                  accesstoken: this.userInfo.accesstoken
                }
              }).then((response) => {
                this.articleDetails = response.data
                this.articleContent = response.data.data.content
                this.commentInfo = response.data.data.replies
              })
            } else {
              this.$message({
                message: '评论失败',
                type: 'error'
              })
            }
          })
        },
        emergeReply (index, value) {
          if (this.replyNum === index) {
            this.replyNum = ''
          } else {
            this.replyNum = index
            this.replyText = '@' + value
          }
        },
        replies (value1, value2) {
          if (!this.userInfo.accesstoken) {
            this.$router.push({
              path: '/userinfo'
            })
          } else {
            if (this.replyText === '') {
              alert('请输入内容')
            }
            this.axios.post('https://cnodejs.org/api/v1//topic/' + value1 + '/replies', {
              accesstoken: this.userInfo.accesstoken,
              content: this.replyText,
              reply_id: value2
            }).then((response) => {
              console.log(response.data)
              if (response.data.success === true) {
                this.publish = true
                this.tips = '回复成功'
                this.replyNum = ''
                this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id, {
                  params: {
                    accesstoken: this.userInfo.accesstoken
                  }
                }).then((response) => {
                  this.articleDetails = response.data
                  this.articleContent = response.data.data.content
                  this.commentInfo = response.data.data.replies
                })
              } else {
                this.publish = true
                this.tips = '评论失败'
              }
            })
          }
        }
      },
      created () {
        // var user = window.localStorage.getItem('user')
        // user = JSON.parse(user)
        // this.accesstoken = user.accesstoken
        // this.userName = this.$store.state.userInfo.loginname
        this.userImg = this.userInfo.avatar_url
        let _this = this
        this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id, {
          params: {
            accesstoken: this.userInfo.accesstoken
          }
        }).then((response) => {
          this.articleDetails = response.data
          this.articleContent = response.data.data.content
          this.commentInfo = response.data.data.replies
        }).catch(function (error) {
          console.log(error)
          _this.$message({
            message: error.response.data.error_msg,
            type: 'error'
          })
          window.history.go(-1)
        })
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

<style lang="stylus" >
@import "~common/stylus/variable"
  .mu-flat-button-primary
    color $color-theme
  .heartActive
    color $color-theme
  .articleDetails
    width 100%
    padding 8px 5px 0
    background-color rgba(0,0,0,.07)
    .body
      background-color $color-text
      img
        width 100%  
      .titleInfo
        position relative
        box-shadow 0 1px 0 $color-theme-color
        .tags
          position absolute
          right 4px 
          top 50px
          span
            background $color-theme
            border-radius 2px
            color #fff
            padding 2px 4px
        h2
          padding 8px
          margin 0
          text-align center 
        .titileOthers
          .info
            padding 4px
            .avator
              display inline-block
              vertical-align top
              img 
                width 40px
                height 40px
                border-radius 50%
                border 1px solid #ccc     
            .flex
              display inline-block
              .avatorName
                padding-left 10px
<<<<<<< HEAD
              .time,.look,.remark
                display inline-block
                width 70px
=======
                a
                  color $color-theme!important
              .time,.look,.remark
                display inline-block
                width 80px
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
                line-height 25px
                text-align center
                height 25px
                span
                  text-align center
                  .fa
                    vertical-align top
              .remark
                display inline-block   
      .articleContet
        padding 6px 0 0 6px
      .markdown-text
        img
          width 100%
    .comment img
      width 40px
      height 40px
      border-radius 50%
      border 1px solid #ccc  
    .back
      position fixed
      top 60%
      left 6px
      width 50px;
      height 50px
      background $color-theme
      border-radius 100%
<<<<<<< HEAD
      opacity .6
=======
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
      text-align center
      .icon-fanhui
        font-size 40px
        color #fff
        line-height 50px
        height 50px
    .comment
      width 100%
      margin-top 15px
      .commentNum
        border-bottom 1px solid #ccc
        padding 5px 10px         
        border-top 1px solid #ccc   
        margin-bottom 15px
        color $color-theme
      .remarkOn
        border-bottom 1px solid #ccc
        display flex
        padding 10px
        position relative
        textarea
          border 1px solid rgba(0, 0, 0, 0.12)
          background-color #fff
          outline none
          resize none
          color #292525
          line-height 30px
          font-weight 400
          font-size 16px
        textarea:focus
          border-color #8492a6
        input
          border none
          outline none
          cursor pointer
          background #41b883
          color #fff
          border-radius 4px
          height 25px
          margin-top 40px
          margin-left 5px
        input:hover
          background-color #006741    
        .remarkOnavatar
          margin-right 10px
      .commentDetails
        border-bottom 1px solid #ccc
        display flex
        position relative
        margin 10px
        .commentuseravatar
          flex 1
        .commentInfo
<<<<<<< HEAD
          flex 7
=======
          flex 6
          .commentusername
            a
              color $color-theme!important
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
          .commentOther
            position absolute
            top 10px 
            right 10px
<<<<<<< HEAD
=======
            line-height 25px
            a
              color $color-theme!important
>>>>>>> 02199ea2cbf7e9ac2c05997645457b2f333ea8bb
          .comentReply
            padding-top 10px
            margin-bottom 30px
            position relative
            display none
            textarea
              border 1px solid rgba(0, 0, 0, 0.12)
              background-color #fff
              outline none
              resize none
              color #292525
              line-height 30px
              border-radius 5px
              font-weight 400
              font-size 16px
            textarea:focus
              border-color #8492a6
            input
              border none
              outline none
              cursor pointer
              background #41b883
              color #fff
              border-radius 4px
            input:hover
              background-color #006741  
          .isEmerge
            display block  
</style>