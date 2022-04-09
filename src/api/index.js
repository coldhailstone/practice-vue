import axios from '@/utils/axios';

const API = axios.create({
	baseUrl: 'http://localhost.com:8080'
});

function fetchMenuList() {
	return API.get();
}

function fetchMenu(menuId) {
	return API.get(`/${menuId}`);
}

export { fetchMenuList, fetchMenu };
