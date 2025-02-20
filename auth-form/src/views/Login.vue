<template>
  <div class="form-container">
    <h2>Авторизация</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Имя пользователя" required />
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const user = ref(JSON.parse(localStorage.getItem('user')) || null);
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      username: username.value,  // Используем username, а не email
      password: password.value,
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    await fetchUserData(response.data.access);
    router.push('/');
  } catch (error) {
    console.error('Ошибка входа', error.response?.data || error);
  }
};

const fetchUserData = async (token) => {
  try {
    const userResponse = await axios.get('http://localhost:8000/api/user/', {
      headers: { Authorization: `Bearer ${token}` },
    });

    user.value = userResponse.data;
    localStorage.setItem('user', JSON.stringify(userResponse.data));
  } catch (error) {
    console.error('Ошибка загрузки данных пользователя', error.response?.data || error);
  }
};

onMounted(() => {
  const token = localStorage.getItem('access_token');
  if (token) fetchUserData(token);
});
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
