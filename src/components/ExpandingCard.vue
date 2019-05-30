<template>
  <article class="card" @click="animate">
  	<div class="wrapper">
  		<div class="content">
		  	<div class="hero">
		  		<img class="img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="">
		  		<div class="hero-content full">
			  		<div class="id"></div>
			  		<h1 class="name"></h1>
			  		<ul class="type-list">
						<li class="type"></li>
						<li class="type"></li>
					</ul>
				</div>
		  	</div>
		  	<ul class="detail-list full">
		  		<li class="detail-block"></li>
		  		<li class="detail-block"></li>
		  		<li class="detail-block"></li>
		  		<li class="detail-block"></li>
		  	</ul>
		</div>
  	</div>
  </article>
</template>

<script>
  // import BackgroundImage from './BackgroundImage.vue';
  // import Heading from './Heading.vue';
  import anime from 'animejs';

  export default {
    name: 'ExpandingCard',
    components: {
      // BackgroundImage,
      // Heading
    },
    data() {
    	return {
    		expanded: false,
    		position: null
    	}
    },
    methods: {
    	animate(event) {
    		this.expanded ? this.collapse(event) : this.expand(event)
    	},
    	expand(event) {
    		this.expanded = true
    		console.log('expanded')

    		const el = event.target
    		const container = event.target.parentNode
    		const wrapper = el.getElementsByClassName('wrapper')[0]
    		const content = el.getElementsByClassName('content')[0]
    		const dur = 250
    		const ease = 'easeOutSine'
    		const full = el.getElementsByClassName('full')
    		this.position = container.getBoundingClientRect()
    		
    		container.style.zIndex = 99
    		container.style.position = 'fixed'
    		container.style.left = this.position.x
    		container.style.top = this.position.y

    		anime({
    			targets: container,
    			left: [this.position.x, 0],
    			top: [this.position.y, 0],
    			duration: dur,
    			easing: ease
    		})
    		anime({
    			targets: wrapper,
    			width: '100vw',
    			height: '100vh',
    			duration: dur,
    			easing: ease
    		})
    		anime({
    			targets: content,
    			scale: 1,
    			duration: dur,
    			easing: ease
    		})
    		anime({
    			targets: full,
    			opacity: {
    				value: [0,1],
    				easing: 'linear'
    			},
    			translateY: ['30vh', 0],
    			duration: dur/2,
    			easing: ease,
    			delay: dur
    		})



    	},
    	collapse(event) {
    		this.expanded = false
    		console.log('collapsed')

    		const el = event.target
    		const container = event.target.parentNode
    		const wrapper = el.getElementsByClassName('wrapper')[0]
    		const content = el.getElementsByClassName('content')[0]
    		const dur = 250
    		const ease = 'easeOutSine'
    		const full = el.getElementsByClassName('full')
    		const pos = container.getBoundingClientRect()
    		const wrapperWidth = wrapper.getBoundingClientRect().width
    		const wrapperHeight = wrapper.getBoundingClientRect().height


    		anime({
    			targets: wrapper,
    			width: [wrapperWidth, '180px'],
    			height: [wrapperHeight, '190px'],
    			duration: dur,
    			easing: ease
    		})
    		anime({
    			targets: content,
    			scale: .5,
    			duration: dur,
    			easing: ease
    		})
    		anime({
    			targets: full,
    			opacity: [1,0],
    			duration: dur,
    			easing: 'linear'
    		})
    		anime({
    			targets: container,
    			left: [pos.x, this.position.x],
    			top: [pos.y, this.position.y],
    			duration: dur,
    			easing: ease,
    			complete: function() {
	    			container.style.zIndex = 0
	    			container.style.position = 'static'
	    		}
    		})

    		

    	}
    }
  }
</script>

<style lang="sass">
 @import 'public/assets/sass/expanding-card.sass'
</style>