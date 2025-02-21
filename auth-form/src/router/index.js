import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from "@/views/Profile.vue";

const routes = [
    { path: '/', component: Home }, // Главная страница
    { path: '/login', component: Login }, // Страница логина
    { path: '/register', component: Register }, // Страница регистрации
    { path: '/profile', component: Profile, meta: { requiresAuth: true } }, // Страница профиля с проверкой авторизации
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Проверка авторизации перед переходом
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token'); // Получаем токен из localStorage
    if (to.meta.requiresAuth && !token) {
        // Если маршрут требует авторизации и токен отсутствует, перенаправляем на страницу логина
        next('/login');
    } else {
        next(); // Иначе продолжаем переход
    }
});

export default router;
