<script setup>
import BaseButton from '@/components/BaseButton.vue';
</script>

<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/img.png" alt="App Preview">
      <div class="main-text">Explore the app</div>
      <div class="secondary-text">
        Now your finances are in one place and always under control
      </div>
      <div class="buttons">
        <BaseButton label="Sign In" to="/login" variant="black" />
        <BaseButton label="Create Account" to="/register" variant="white" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center; /* Центрирует по вертикали */
  align-items: center; /* Центрирует по горизонтали */
  width: 100%;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 373px;
  height: auto; /* Убираем фиксированную высоту */
}

.content img {
  width: 315px;
  height: 273px;
  margin-bottom: 67px;
}

.main-text {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 11px;
}

.secondary-text {
  width: 250px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 76px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
