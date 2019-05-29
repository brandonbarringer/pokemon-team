<template functional>
	<header :class="[data.class, data.staticClass]" :style="[data.staticStyle, data.style]">
		<slot></slot>
	</header>
</template>

<script>
	export default {
		name: 'Title'
	}
</script>