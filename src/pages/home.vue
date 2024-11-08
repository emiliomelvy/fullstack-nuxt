<template>
  <div>
    <UModal v-model="modal.isOpen" @close="redirectToLogin">
      <div class="p-4">
        <h3 class="text-lg font-semibold">Access Denied</h3>
        <p class="my-5">{{ modal.message }}</p>
        <UButton @click="redirectToLogin" color="primary">Go to Login</UButton>
      </div>
    </UModal>
    <div class="min-h-screen bg-emerald-30 p-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Welcome, {{ user }}</h1>
          <div class="space-x-4">
            <UButton
              v-if="user === 'admin'"
              @click="router.push('/admin')"
              color="primary"
            >
              Admin Panel
            </UButton>
            <UButton @click="handleLogout" color="red"> Logout </UButton>
          </div>
        </div>

        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold">Dashboard</h3>
          </template>
          <p>Welcome to your dashboard!</p>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import type { User } from "types/auth";
import useAuth from "../composables/useAuth";

const user = ref(null);
const modal = reactive({
  isOpen: false,
  message: "You need to be logged in to access this page.",
});
const { logout } = useAuth();

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
  } else {
    modal.isOpen = true;
  }
});

const router = useRouter();

const handleLogout = async () => {
  const response = await logout();
  if (response?.status) {
    router.push("/login");
    localStorage.removeItem("user");
  }
};

const redirectToLogin = () => {
  modal.isOpen = false;
  router.push("/login");
};
</script>
