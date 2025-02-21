<template>
  <div class="register-container">
    <div class="content">
      <img src="@/assets/img.png" alt="App Preview" class="image" />
      <div class="main-text">Sign In</div>

      <!-- Поля ввода -->
      <InputField label="Username" v-model="username" />
      <InputField label="Password" v-model="password" type="password" eyeIcon />

      <div class="space"></div>

      <!-- Кнопка "Sign In" -->
      <BaseButton
          label="Sign In"
          to="#"
          variant="black"
          :disabled="!isFormValid"
          @click="login"
      />

      <!-- Ссылка на регистрацию -->
      <div class="register-link">
        Don't have an account? <router-link to="/register">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import InputField from '@/components/InputField.vue'; // Для полей ввода
import BaseButton from '@/components/BaseButton.vue'; // Для кнопки

const username = ref('');
const password = ref('');
const isFormValid = ref(false);
const router = useRouter();

// Проверка валидности формы
const validateForm = () => {
  isFormValid.value = username.value && password.value;
};

// Логика авторизации
const login = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      username: username.value,
      password: password.value,
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);

    router.push('/profile');  // Перенаправляем на страницу профиля
  } catch (error) {
    console.error('Ошибка входа', error.response?.data || error);
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 373px;
  padding: 20px;
  text-align: center;
}

.image {
  width: 315px;
  height: 273px;
  margin-bottom: 30px;
}

.main-text {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 30px;
}

input {
  width: 353px; /* Ширина 353px */
  height: 56px; /* Высота 56px */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-right: 40px; /* Место для глазика справа */
}

input::placeholder {
  color: #999; /* Цвет подсказки */
  font-size: 14px;
}

.eye-icon img {
  width: 20px;
  height: 20px;
}

.space {
  margin-top: 20px;
}

.register-link {
  font-size: 14px;
  color: gray;
  margin-top: 20px;
}

.register-link a {
  text-decoration: none;
  color: #000;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
