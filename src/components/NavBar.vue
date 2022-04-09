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
			:ref="menu.id"
			:key="menu.id"
			class="nav-link"
		>
			<router-link :to="`/${menu.id}`" @click.native="onClickMenu(menu.id)">
				<span>{{ menu.title }}</span>
			</router-link>
		</div>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { getTest, postTest } from '@/api';

export default {
	components: {
		vSelect
	},
	computed: {
		...mapGetters(['fetchedMenuList', 'fetchedCurrentMenu'])
	},
	beforeCreate() {
		// TODO: test
		// this.apiTest();
	},
	created() {
		this.$store.dispatch('FETCH_MENU_LIST');
	},
	mounted() {
		setTimeout(() => {
			this.getMenuById(this.fetchedMenuList[0].id);
		}, 100);
	},
	methods: {
		apiTest() {
			const data = {
				key: 'testKey',
				value: 'testValue'
			};
			getTest(data);
			postTest(data);
		},
		onSelectMenu({ id }) {
			this.$router.push(`/${id}`);
			this.getMenuById(id);
		},
		onClickMenu(menuId) {
			this.getMenuById(menuId);
		},
		getMenuById(menuId) {
			this.$store.dispatch('FETCH_MENU', menuId);
			this.toggleNavigationStyle(menuId);
		},
		toggleNavigationStyle(menuId) {
			document.querySelectorAll('.nav-link').forEach(el => {
				el.classList.remove('select');
			});
			const navEl = this.$refs[menuId][0];
			navEl.classList.add('select');
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
