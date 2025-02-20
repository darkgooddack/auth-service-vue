<template>
  <div class="form-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Имя пользователя" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
    <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/register/', {
      username: username.value,  // Добавлен username в запрос
      email: email.value,
      password: password.value
    });

    console.log('Успешная регистрация', response.data);
    router.push('/login');  // Перенаправление на страницу входа
  } catch (error) {
    console.error('Ошибка регистрации', error.response?.data || error);
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
