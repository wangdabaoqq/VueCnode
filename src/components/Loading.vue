<template>
	<div class="loading">
		 <mu-circular-progress :size="90" :strokeWidth="5" color="yellow"/>
		<p>VueCnode</p>
	</div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      setTimeout(() => {
        this.$router.push({name: 'index'})
      }, 2500)
    }
  }
</script>

<style lang="stylus" scoped>
	@keyframes index
		0
			width 100%
			opacity: 1
			transform: rotate(0)
			transform: translate3d(0, -100px, 0);
		100%
			opacity: 0
			transform: rotate(360deg)
			transform: translate3d(100%, 0, 0);
	.loading
		width: 100vw
		height: 100vh
		background-color #41b883
		display: -webkit-flex
		display: flex
		justify-content: center
		align-items: center
		transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		animation: index 2s ease-out 1s
		p
			font-size 24px
			color yellow
		img
			width: 100%
			animation: index 2s ease-out 1s
</style>