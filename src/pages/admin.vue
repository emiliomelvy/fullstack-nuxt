<template>
  <div>
    <UModal v-model="modal.isOpen" @close="redirectToLogin">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Access Denied</h3>
        <p class="my-5">{{ modal.message }}</p>
        <UButton @click="redirectToLogin" color="primary">Go to Login</UButton>
      </div>
    </UModal>
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
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const user = ref(null);
const modal = reactive({
  isOpen: false,
  message: "You need to be logged in to access this page.",
});

const redirectToLogin = () => {
  modal.isOpen = false;
  router.push("/login");
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  } else {
    modal.isOpen = true;
  }
});
</script>
