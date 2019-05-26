<template>
		<h1 v-text="title"></h1>
</template>

<script>
	export default {
		name: 'Title',
		props: {
			title: String
		}
	}
</script>