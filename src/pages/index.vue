<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToAbout = () => {
  router.push("/home");
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (!userData) {
    router.push("/login");
  }
});
</script>

<template>
  <UContainer class="py-10">
    <UCard class="text-center">
      <h1 class="text-4xl font-bold mb-4">Welcome to Nuxt UI</h1>
      <p class="text-lg text-gray-600 mb-6">
        Build your UI with ease using Nuxt UI components.
      </p>
      <UButton color="primary" variant="solid" @click="navigateToAbout">
        Learn More
      </UButton>
    </UCard>
  </UContainer>
</template>
