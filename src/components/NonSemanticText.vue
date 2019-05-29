<template functional>
		<div :class="[data.class, data.staticClass]" :style="[data.staticStyle, data.style]" v-text="props.text"></div>
</template>

<script>
	export default {
		name: 'NonSemanticText',
		props: {
			text: {
				type: [String, Number],
				required: true
			},
		}
	}
</script>