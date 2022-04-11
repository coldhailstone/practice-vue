import axios from '@/utils/axios';

const API = axios.create({
	baseUrl: 'http://localhost:8080'
});

function fetchMenuList() {
	return API.get('/menu');
}

function fetchMenu(menuId) {
	return API.get(`/menu/${menuId}`);
}

export { fetchMenuList, fetchMenu };
