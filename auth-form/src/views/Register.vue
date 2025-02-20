<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import InputField from '@/components/InputField.vue'; // Для полей ввода
import BaseButton from '@/components/BaseButton.vue'; // Для кнопки

const username = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const isFormValid = ref(false); // Состояние для проверки валидности формы

// Функция для проверки валидности всех полей
const validateForm = () => {
  isFormValid.value = username.value && email.value && password.value;
};

// Отправка данных на бэкенд
const register = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/register/', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    console.log('Успешная регистрация', response.data);
    router.push('/login');  // Перенаправление на страницу входа
  } catch (error) {
    console.error('Ошибка регистрации', error.response?.data || error);
    alert('Произошла ошибка при регистрации');
  }
};
</script>

<template>
  <div class="register-container">
    <div class="content">
      <img src="@/assets/img.png" alt="App Preview" class="image" />
      <div class="main-text">Create account</div>

      <!-- Поля ввода -->
      <InputField label="Username" v-model="username" />
      <InputField label="Email" v-model="email" />
      <InputField label="Password" v-model="password" type="password" eyeIcon />

      <div class="space"></div>

      <!-- Кнопка "Create account" с условием отключения при незаполненных полях -->
      <BaseButton
          label="Create account"
          to="#"
          variant="black"
          :disabled="!isFormValid"
          @click="register"
      />

      <!-- Текст с условиями -->
      <div class="terms-text">
        By creating an account or signing you agree to our <a href="#">Terms and Conditions</a>
      </div>
    </div>
  </div>
</template>

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
  margin-bottom: 20px;
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

.space{
  margin-top: 15px;
}

.terms-text {
  font-size: 14px;
  color: gray;
  margin-top: 80px;
  margin-bottom: 40px;
  width: 250px;
}

.terms-text a {
  font-weight: 600;
  color: #000;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>

