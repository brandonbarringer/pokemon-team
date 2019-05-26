<template>
		<div class="stat-block">
			<div class="stat-block__label" v-text="label"></div>
			<div class="stat-block__value" v-text="value"></div>
		</div>
</template>

<script>
	export default {
		name: 'StatBlock',
		props: {
			label: String,
			value: Number,

		}
	}
</script>
