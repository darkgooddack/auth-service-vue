<script setup>
defineProps({
  label: String,
  to: String,
  variant: {
    type: String,
    default: 'black', // 'black' - чёрная кнопка, 'white' - белая кнопка
  },
});
</script>

<template>
  <router-link :to="to" :class="['btn', variant]">
    {{ label }}
  </router-link>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Geologica&display=swap');

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 353px;
  height: 56px;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Geologica', sans-serif;
  border-radius: 10px;
  text-decoration: none;
}

/* Чёрная кнопка */
.btn.black {
  color: white;
  background-color: black;
}

/* Белая кнопка с контуром */
.btn.white {
  color: black;
  background-color: white;
  border: 2px solid #747474;
}

</style>
