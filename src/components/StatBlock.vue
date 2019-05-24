<template>
		<div class="stat-block">
			<div class="stat-block__label">{{label}}</div>
			<div class="stat-block__value">{{value}}</div>
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
