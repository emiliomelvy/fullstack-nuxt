<!-- <template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Admin Panel</h1>
        <UButton @click="router.push('/home')" color="primary">
          Back to Home
        </UButton>
      </div>

      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Admin Controls</h3>
        </template>
        <p>This page is only accessible by administrators.</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script> -->

<template>
  <div>
    <h1>Welcome to Home Page</h1>
    <button v-if="userRole === 'admin'" @click="goToAdmin">Go to Admin</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const userRole = ref("admin"); // Adjust based on logged-in user session data

function goToAdmin() {
  useRouter().push("/admin");
}
</script>
