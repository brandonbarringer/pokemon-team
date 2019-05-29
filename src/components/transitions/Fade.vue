<template>
	<component
		:is="componentType"
		:tag="tag"
		v-bind="$attrs"
		v-on="hooks">
		<slot v-on:load="onLoaded" v-show="loaded"></slot>
	</component>
</template>

<script>
	import anime from 'animejs';
	export default {
		name: 'Fade',
		inheritAttrs: false,
		props: {
			group: Boolean,
			stagger: {
				type: Number,
				default: 0
			},
			tag: {
				type: String,
				default: 'span'
			},
			duration: {
				type: Number,
				default: 500
			},
			easing: {
				type: String,
				default: 'easeOutQuart'
			},
			direction: {
				type: String,
				default: 'none'
			},
			amount: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				count: 0,
				loaded: false
			}
		},
		computed: {
			componentType() {
				return this.group ? 'transition-group' : 'transition'
			},
			hooks() {
				return {
					beforeEnter: this.beforeEnter,
					beforeLeave: this.beforeLeave,
					enter: this.enter,
					leave: this.leave,
					onLoaded: this.onLoaded,

					...this.$listeners
				}
			},
		},
		methods: {
			onLoaded: function(instance, image) {
				this.loaded = true
			},
			beforeEnter: function(el) {
				el.style.opacity = 0
				el.style.pointerEvents = 'none'
			},
			enter: function(el, done) {
				const translateY = () => {
					switch(this.direction) {
						case 'up':
							return [this.amount, 0];
						case 'down':
							return ['-' + this.amount, 0]
						default:
							return '0'
					}
				}
				const translateX = () => {
					switch(this.direction) {
						case 'left':
							return [this.amount, 0];
						case 'right':
							return ['-' + this.amount, 0]
						default:
							return '0'
					}
				}
				anime.remove(el)
				anime({
					targets: el,
					translateY: translateY(),
					translateX: translateX(),
					opacity: 1,
					duration: this.duration,
					easing: this.easing,
					delay: this.stagger * this.$data.count
				})
				this.$data.count ++
				el.style.pointerEvents = 'auto'
				done();
			},
			beforeLeave: function(el) {
				console.log(el)
			},
			leave: function(el) {
				console.log(el)
			},
		},
	}
</script>