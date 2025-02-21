<template>
  <div class="profile-container">
    <h2>User Profile</h2>
    <div v-if="user">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Вы можете добавить сюда другие данные пользователя, если нужно -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.profile-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile-container p {
  font-size: 16px;
  color: #333;
  margin: 5px 0;
}
</style>
