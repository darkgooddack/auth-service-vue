<template>
  <div class="profile-container">
    <UserProfile :user="user" />
    <BaseButton label="Log Out" @click="logout" variant="white" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserProfile from '@/components/UserProfile.vue';  // Импортируем компонент UserProfile
import BaseButton from '@/components/BaseButton.vue';    // Импортируем кнопку для выхода
import axios from 'axios';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

// Функция для выхода (удаление токена и перенаправление на страницу входа)
const logout = () => {
  console.log('Logout button clicked');  // Добавим лог для отладки
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/login');  // Перенаправление на страницу логина
};

onMounted(async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      // Запрос для получения данных о пользователе
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user.value = response.data;
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя', error);
    }
  }
});
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
}
</style>
