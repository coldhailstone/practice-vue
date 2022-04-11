<template>
	<nav class="nav">
		<div style="padding: 10px">
			<v-select
				label="title"
				:options="fetchedMenuList"
				:value="fetchedCurrentMenu.title"
				@input="onSelectMenu"
			></v-select>
		</div>
		<div
			v-for="menu of fetchedMenuList"
			:key="menu.id"
			class="nav-link"
			:class="fetchedCurrentMenu.id === menu.id ? 'select' : null"
		>
			<router-link :to="`/${menu.id}`">
				<span>{{ menu.title }}</span>
			</router-link>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
	components: {
		vSelect
	},
	computed: {
		...mapGetters(['fetchedMenuList', 'fetchedCurrentMenu'])
	},
	created() {
		this.$store.dispatch('FETCH_MENU_LIST');
	},
	methods: {
		onSelectMenu({ id }) {
			const path = `/${id}`;
			if (this.$route.path !== path) this.$router.push(path);
		}
	}
};
</script>

<style scopred>
.nav {
	width: 500px;
	height: 100%;
	border: 1px solid black;
}
.nav-link {
	padding: 30px;
}
.nav-link.select {
	background: yellow;
	border: 1px solid black;
}
.vs__clear {
	display: none;
}
</style>
