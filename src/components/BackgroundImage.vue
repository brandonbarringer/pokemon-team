<template>
		<div :style="{backgroundImage: 'url(' + imagePath + ')'}"></div>
</template>

<script>
	export default {
		name: 'BackgroundImage',
		props: {
			imagePath: String
		}
	}
</script>
