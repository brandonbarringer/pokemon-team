<template functional>
	<div class="preview">
	  <slot class="preview__focus" name="focus"></slot>
	  <slot class="preview__content" name="previewContent"></slot>
	  <slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'CardPreview'
	}
</script>