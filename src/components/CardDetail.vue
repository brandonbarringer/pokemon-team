<template>
		<ul class="detail">
			<!-- <li class="detail__item" v-for="(item, index) in statList" :key="index"> -->
			<li class="detail__item">
				{{details}}
			</li>
		</ul>
</template>

<script>
	export default {
		name: 'CardDetail',
		components: {
		},
		props: {
			details: String
		},
		data() {
			return {
			}
		},

	}
</script>
