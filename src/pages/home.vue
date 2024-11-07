<template>
  <div class="min-h-screen bg-emerald-30 p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Welcome, {{ user?.username }}</h1>
        <div class="space-x-4">
          <UButton
            v-if="user?.role === 'admin'"
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
</template>

<script setup lang="ts">
import type { User } from "types/auth";

const router = useRouter();
const user = useState<User>("user");

async function handleLogout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  router.push("/login");
}
</script>
