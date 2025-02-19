<template>
  <div class="form-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <p>Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link></p>

    <!-- Отображение информации о пользователе -->
    <div v-if="user">
      <h3>Информация о пользователе:</h3>
      <p>Имя: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const user = ref(null);  // для хранения данных пользователя
const router = useRouter();

// Функция для авторизации
const login = async () => {
  try {
    // 1. Запрос на авторизацию и получение токенов
    const response = await axios.post('http://localhost:8000/api/login/', {
      username: username.value,  // использование username вместо email
      password: password.value,
    });

    // 2. Сохранение токенов в localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    // 3. Запрос на получение информации о пользователе с использованием access токена
    const userResponse = await axios.get('http://localhost:8000/api/user/', {
      headers: {
        Authorization: `Bearer ${response.data.access}`
      }
    });

    // 4. Сохранение информации о пользователе в переменную user
    user.value = userResponse.data;

    console.log('Успешный вход', userResponse.data);
    router.push('/');  // Переход на главную страницу после успешного входа
  } catch (error) {
    console.error('Ошибка входа', error);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  width: 100%;
  padding: 8px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
