<template>
  <div class="index">
    <mcontent></mcontent>
    <mfooter></mfooter>
  </div> 
</template>
 <script type="text/ecmascript-6">
import Footer from 'base/m-footer'
import Nav from 'base/m-nav'
import Content from 'base/m-content'
export default {
  data () {
    return {
    }
  },
  components: {
    mfooter: Footer,
    mnav: Nav,
    mcontent: Content
  }
}
</script>
<style lang="stylus">
  .index
    height 100vh
    display flex
    flex-direction column
    -webkit-box-orient vertical
    -webkit-box-direction normal
</style>


