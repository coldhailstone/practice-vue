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
	},
	beforeRouteUpdate(to, _, next) {
		this.getMenuById(to.params.id);
		next();
	},
	mounted() {
		this.getMenuById(this.$route.params.id);
	},
	methods: {
		getMenuById(menuId) {
			this.$store.dispatch('FETCH_MENU', menuId);
		}
	}
};
</script>

<style scoped>
.problem {
	width: 100%;
	padding: 10px;
}
</style>
