<template>
    <div class="s">
      <div class="text">
        <h2>404</h2>
      </div>
      <vue-particles 
      color="#fff" 
      particleopacity="0.7" 
      linescolor="#009688" 
      particlesnumber="80" 
      shapetype="circle" 
      particlesize="5" 
      lineswidth="10" 
      linelinked="true" 
      lineopacity="0.4" 
      linesdistance="150" 
      movespeed="3" 
      hovereffect="true" 
      hovermode="grab" 
      clickeffect="true" 
      clickmode="push">
        <p>404</p>
      </vue-particles>
    </div>
 </template>

<script>
export default {

}
</script>

<style lang="stylus" >
.s
  height 100%
  position relative
  justify-content center
  display flex
  align-items center
  overflow hidden
  .text
    z-index 999
    color #fff
    position absolute
    text-shadow 2px 2px red
    top 50%
    left 50%
  #particles-js
    background-image url('https://vue-particles.netlify.com/static/img/sky.871d198.jpg')  
    background-size cover 
    top 0
    left 0
    width 100%
    height 100%
</style>
