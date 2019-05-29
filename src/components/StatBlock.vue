<template>
		<div class="stat-block">
			<NonSemanticText class="stat-block__label" :text="label" />
			<NonSemanticText class="stat-block__value" :text="value" />
		</div>
</template>

<script>
	import NonSemanticText from './NonSemanticText.vue'
	export default {
		name: 'StatBlock',
		components: {
			NonSemanticText
		},
		props: {
			label: {
				type: String,
				required: true
			},
			value: {
				type: Number,
				required: true
			},
		}
	}
</script>
