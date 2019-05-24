<template>
		<div>{{text}}</div>
</template>

<script>
	export default {
		name: 'PlainText',
		props: {
			text: String,
		}
	}
</script>