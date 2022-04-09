import axios from '@/utils/axios';

const API = axios.create({
	baseUrl: 'http://localhost.com:8080'
});

function getTest(params) {
	return API.get('/recruit/web/test1', { params });
}

function postTest(data) {
	return API.post('/recruit/web/test1', data);
}

function fetchMenuList() {
	return API.get('/menu');
}

function fetchMenu(menuId) {
	return API.get(`/menu/${menuId}`);
}

export { getTest, postTest, fetchMenuList, fetchMenu };
