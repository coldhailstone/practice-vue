import { fetchMenuList, fetchMenu } from '@/api';

export default {
	FETCH_MENU_LIST({ commit }) {
		fetchMenuList()
			.then(data => {
				commit('SET_MENU_LIST', data.menuList);
			})
			.catch(console.error);
	},
	FETCH_MENU({ commit }, menuId) {
		fetchMenu(menuId)
			.then(data => {
				commit('SET_CURRENT_MENU', data);
			})
			.catch(console.error());
	}
};
