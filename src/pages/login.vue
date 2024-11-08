<template>
  <div>
    <UModal v-model="modal.isOpen">
      <div class="p-4">
        <div>{{ modal.message }}</div>
      </div>
    </UModal>
    <div
      class="bg-gray-200 lg:grid grid-cols-12 container xl:max-w-7xl rounded-xl"
    >
      <NuxtImg src="/login-image.png" class="col-span-8 rounded-xl" />

      <div
        class="text-black text-center col-span-4 bg-white m-3 p-16 rounded-xl"
      >
        <UIcon name="akar-icons:planet" class="w-10 h-10" />
        <div class="text-4xl font-medium">Welcome Back!</div>
        <div class="text-gray-500 lg:pt-3 lg:pb-5">
          Please enter your details
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <UFormGroup name="username" :error="errors.username">
            <template #label>
              <span class="text-black">Username</span>
            </template>
            <UInput
              v-model="form.username"
              placeholder="Enter username"
              :error="!!errors.username"
              class="bg-black mt-2"
            />
          </UFormGroup>

          <UFormGroup label="Password" name="password" :error="errors.password">
            <template #label>
              <span class="text-black">Password</span>
            </template>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              :error="!!errors.password"
              class="bg-black mt-2"
            />
          </UFormGroup>

          <UButton type="submit" color="primary" block :loading="loading">
            Login
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import useAuth from "../composables/useAuth";

const router = useRouter();
const loading = ref(false);
const errors = ref<Record<string, string>>({});
const modal = reactive({
  isOpen: false,
  message: "",
});

const form = reactive({
  username: "",
  password: "",
});

const schema = yup.object({
  username: yup
    .string()
    .min(4, "Must be at least 4 characters")
    .required("Required"),
  password: yup
    .string()
    .min(4, "Must be at least 4 characters")
    .required("Required"),
});

const { login } = useAuth();

async function handleSubmit() {
  try {
    loading.value = true;
    errors.value = {};
    await schema.validate(form, { abortEarly: false });

    const response = await login(form.username, form.password);

    if (response?.status) {
      localStorage.setItem(
        "user",
        JSON.stringify(response?.data?.user?.username)
      );
      await router.push("/home");
    } else {
      modal.isOpen = true;
      modal.message =
        response?.error?.message || "An error occurred during login.";
    }

    console.log("response :", response);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path) {
          errors.value[error.path] = error.message;
        }
      });
    } else {
      console.error("Login failed:", err);
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    router.push("/home");
  }
});
</script>
