<template>
	<section class="pokemon-detail">
		This is {{name}}
	</section>
</template>

<script>
	export default {
		name: 'pokemon-detail',
		data() {
			return {
				name: this.$route.params.name
			}
		}
	}
</script>

<style></style>