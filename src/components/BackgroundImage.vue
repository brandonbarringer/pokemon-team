<template functional>
		<div 
			:class="[data.class, data.staticClass]" 
			:style="{backgroundImage: 'url(' + props.src + ')'}">
		
			<slot></slot>		
		</div>
</template>

<script>
	export default {
		name: 'BackgroundImage',
		props: {
			src: {
				type: String,
				required: true
			}
		}
	}
</script>
