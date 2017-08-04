<template>
    <div class="wrapper">
        <mu-appbar class="title" title="发布话题">
        </mu-appbar>
        <main>
            <mu-select-field class="text" v-model="list" :labelFocusClass="['label-foucs']" label="选择板块">
                <mu-menu-item v-for="text,index in lists" :key="index" :value="index" :title="text" />
            </mu-select-field>
            <mu-text-field v-model="title" class="text" label="标题" hintText="标题字数 10字以上" />
            <mu-text-field v-model="content" class="text content" hintText="输入文本" multiLine :rows="5" :underlineShow="false" />
            <mu-raised-button @click="setData" label="发布话题" class="demo-raised-button" icon="near_me"  primary/>
        </main>
        
    
          <mu-raised-button label="请选择" @click="open"/>
            <mu-dialog :open="dialog" title="提示"  >
              请登录
            <mu-flat-button slot="actions" @click="close" to="/index" primary label="取消"/>
            <mu-flat-button slot="actions" primary @click="close" to="/userinfo" label="确定"/>
            </mu-dialog>
           <mu-dialog :open="publish" title="提示：">
            {{tips}}
            <mu-flat-button slot="actions" primary @click="close" label="确定" />
        </mu-dialog>
      <mfooter></mfooter>
    </div>

</template>
<script>
import Footer from 'base/m-footer'
import marked from 'marked'
import { mapGetters } from 'vuex'
export default {
  components: {
    mfooter: Footer
  },
  data () {
    return {
      accesstoken: '',
      list: 0,
      lists: ['分享', '问答', '招聘', '测试'],
      title: '',
      tab: '',
      dialog: false,
      content: '',
      publish: false,
      tips: '请输入正确格式'
    }
  },
  created () {
    // var user = window.localStorage.getItem('user')
    // user = JSON.parse(user)
    // this.accesstoken = user.accesstoken
    if (!this.userInfo.accesstoken) {
      this.$router.push({
        path: '/userinfo'
      })
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.publish = false
      this.dialog = false
    },
    setData () {
      if (this.list === 0) {
        this.tab = 'share'
      } else if (this.list === 1) {
        this.tab = 'ask'
      } else if (this.list === 2) {
        this.tab = 'job'
      } else if (this.list === 3) {
        this.tab = 'dev'
      }
      let that = this
      that.content = marked(that.content)
      console.log(that.$store.state.userInfo.accesstoken)
          // console.log(that.title)
          // console.log(that.tab)
          // console.log(that.content)
      that.axios.post('https://cnodejs.org/api/v1/topics', {
        accesstoken: that.userInfo.accesstoken,
        title: that.title,
        tab: that.tab,
        content: that.content
      }).then((response) => {
        console.log(response.data)
        that.title = ''
        that.content = ''
        that.tips = '发表成功！'
        that.publish = true
        setTimeout(() => {
          that.publish = false
        }, 1500)
      }).catch((e) => {
        that.publish = true
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .mu-flat-button-primary
    color $color-theme
  .mu-text-field-focus-line
    background-color $color-theme
  .mu-menu-item-wrapper
    .active
      color $color-theme
  .mu-text-field.focus-state
    color $color-theme 
textarea
  height: 10rem
.wrapper 
  display flex
  flex-direction column
  .title
    text-align center
    height 5rem
    background-color $color-theme
  main
    flex 1
    margin 5rem 0
    padding 1rem
    display flex
    flex-direction column
    .text
      width 100%  
    .content
      flex 1
      background-color $color-sub-theme
      padding 1rem
      overflow-y auto
    .mu-raised-button-primary
      background-color $color-theme
  .rgba
    position fixed
    background-color $color-text-x
    left 0
    right 0
    bottom 0
    top: 0
    z-index 2222
  .rgba .mu-raised-button
      position fixed
      top: 50%
      left: 40%
</style>
