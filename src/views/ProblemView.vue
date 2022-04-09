<template>
	<div class="problem">
		<h1>{{ fetchedCurrentMenu.title }}</h1>
		<div v-html="fetchedCurrentMenu.content"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['fetchedCurrentMenu'])
	}
};
</script>

<style scoped>
.problem {
	width: 100%;
	padding: 10px;
}
</style>
