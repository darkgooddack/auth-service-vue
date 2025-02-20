import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
    { path: '/', component: Home }, // Главная страница
    { path: '/login', component: Login }, // Страница логина
    { path: '/register', component: Register }, // Страница регистрации
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
