<template>
  <div class="messageContent">
     <mu-appbar class="title" title="消息中心"></mu-appbar>
        <main>
            <mu-tabs class="activeTab" :value="activeTab"  @change="handleTabChange">
                <mu-tab value="hasnot_read" title="未读消息" />
                <mu-tab value="has_read" title="已读消息" />
                <span v-show="count" class="count">{{count}}</span>
            </mu-tabs>
            <!-- 未读消息列表 -->
            <ul v-if="this.userInfo.accesstoken" class="lists" v-show="activeTab === 'hasnot_read'">
                <router-link :to="{path:'/detail',query:{id:item.topic.id}}" tag="div" class="list" v-for="item in hasnot_read_messages" :key="item.id">
                    <section class="user">
                      <div class="author">
                        <img :src="item.author.avatar_url" alt="user">
                      </div>
                      <div class="info">
                        <span class="cl">
                          <span class="name">{{item.author.loginname}}</span>
                          <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                          <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                        </span>
                        <div class="timer">
                          <span>{{item.reply.create_at | formatDate}}</span>
                        </div>
                      </div>
                    </section>
                    <div class="content">
                        <div v-html="item.reply.content"></div>
                        <p class="from">来自：《{{item.topic.title}}》</p>
                    </div>
                </router-link>
                <li v-if="!hasnot_read_messages.length">暂无消息</li>
            </ul>
            <!-- 已读消息列表 -->
            <ul v-if="this.userInfo.accesstoken" class="lists" v-show="activeTab === 'has_read'">
                <router-link :to="{path:'/detail',query:{id:item.topic.id}}" tag="div"  class="list" v-for="item in has_read_messages" :key="item.id">
                    <section class="user">
                      <div class="author">
                        <img :src="item.author.avatar_url" alt="user">
                      </div>
                    <div class="info">
                      <span class="cl">
                        <span class="name">{{item.author.loginname}}</span>
                        <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                        <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                      </span>
                      <div v-if="item.reply.content" class="timer">
                        <span>{{item.reply.create_at | formatDate}}</span>
                      </div>
                    </div>
                    </section>
                    <div class="content">
                        <div v-if="item.reply.content" v-html="item.reply.content"></div>
                        <div v-if="!item.reply.content">此内容已被作者删除</div>
                        <p class="from">来自：《{{item.topic.title}}》</p>
                    </div>
                </router-link>
              <li v-if="!has_read_messages.length">暂无消息</li>
            </ul>
          <mu-raised-button class="btn" v-if="count" v-show="activeTab === 'hasnot_read'" @click="mark_all" icon="done_all"  label="标记全部已读" primary/>
        </main>
      <mfooter></mfooter>
  </div>
</template>

 <script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'
    import timeago from 'timeago.js'
    import Footer from 'base/m-footer'
    export default{
      components: {
        mfooter: Footer
      },
      data () {
        return {
          activeTab: 'hasnot_read',
          hasnot_read_messages: [],
          has_read_messages: [],
          accesstoken: '',
          count: null
        }
      },
      computed: {
        ...mapGetters({
          userInfo: 'getUserInfo'
        })
      },
      methods: {
        handleTabChange (value) {
          this.activeTab = value
        },
        _getDate () {
          this.axios.get('https://cnodejs.org/api/v1/messages', {
            params: {
              accesstoken: this.userInfo.accesstoken
            }
          }).then((response) => {
            this.hasnot_read_messages = response.data.data.has_read_messages
            this.has_read_messages = response.data.data.has_read_messages
          })
          this.axios.get('https://cnodejs.org/api/v1/message/count', {
            params: {
              accesstoken: this.userInfo.accesstoken
            }
          }).then((response) => {
            // 获取未读消息数量
            this.count = response.data.data
            console.log(this.count)
          })
        },
        mark_all () {
          let that = this
          this.axios.post('https://cnodejs.org/api/v1/message/mark_all', {
            accesstoken: this.userInfo.accesstoken
          }).then((response) => {
            that._getDate()
          })
        }
      },
      created () {
        if (!this.userInfo.accesstoken) {
          this.$router.push({
            path: '/userinfo'
          })
        } else {
          this._getDate()
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

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.title
  text-align center
  height 60px
  background-color $color-theme
main
  flex 1
  display flex
  flex-direction column
  .activeTab
    position relative
    border-top 1px solid rgba(255, 255, 255, .1)
    background-color $color-theme
    .count
      position absolute
      left 34px
      top 10px
      background-color $color-theme-d
      width 30px
      height 30px
      line-height 30px
      text-align center
      border-radius 50%
  .lists
    padding 0px 0
    border-bottom 1px solid #ccc
    margin 0
    .list
      border-bottom 1px solid #ccc
      padding 10px 0 
      .user
        width 100%
        padding 0 10px
        .author
          display inline-block  
        img
          height 40px
          width 40px
          border-radius 50%
        .info
          width 84%
          display inline-block
          vertical-align top
          line-height 45px  
          .cl 
            width 68%
            text-align center
            display inline-block
          .timer
            display inline-block
            color $color-theme
      .content
        padding 0 15px
        margin-bottom 10px
        .from
          background $color-sub-theme
          padding 4px 
          border-radius 4px
          color $color-theme

.btn {
    margin 15px 10px 55px
    background $color-theme
}


</style>

