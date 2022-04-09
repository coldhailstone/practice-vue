import { fetchMenuList, fetchMenu } from '@/api';

export default {
	FETCH_MENU_LIST({ commit }) {
		fetchMenuList()
			.then(data => {
				commit('SET_MENU_LIST', data.menuList);
			})
			.catch(() => {
				commit('SET_MENU_LIST', []);
			});
	},
	FETCH_MENU({ commit, getters }, menuId) {
		fetchMenu(menuId)
			.then(data => {
				commit('SET_CURRENT_MENU', data);
			})
			.catch(e => {
				commit('SET_CURRENT_MENU', {
					...getters.fetchedCurrentMenu,
					title: 'Error Page',
					content: e
				});
			});
	}
};
