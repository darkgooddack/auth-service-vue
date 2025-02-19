<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <router-link to="/register">Регистрация</router-link> |
      <router-link to="/login">Авторизация</router-link>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  text-align: center;
  margin-bottom: 20px;
}
</style>
