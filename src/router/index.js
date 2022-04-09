import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/problem1'
		},
		{
			path: '/:id',
			name: 'problem',
			component: () => import('@/views/ProblemView')
		}
	]
});

export default router;
