<template>
  <div class="input-field">

    <input
        :type="type || 'text'"
        :id="label"
        :placeholder="label"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="eyeIcon" class="eye-icon" @click="togglePasswordVisibility">
      <img :src="isPasswordVisible ? eyeOpen : eyeClosed" alt="eye" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import eyeOpen from '@/assets/eye-open.png';
import eyeClosed from '@/assets/eye-closed.png';

const props = defineProps({
  label: String,
  type: String,
  modelValue: String,
  eyeIcon: Boolean,
});

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped>
.input-field {
  height: 56px;
  width: 353px;
  position: relative;
  margin-bottom: 14px;
}

input {
  width: 100%;
  height: 100%;
  padding: 18px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.eye-icon {
  position: absolute;
  right: 18px;
  top: 18px;
  cursor: pointer;
}

.eye-icon img {
  width: 20px;
  height: 20px;
}
</style>
