<template>
  <div
    class="bg-gray-200 lg:grid grid-cols-12 container xl:max-w-7xl rounded-xl"
  >
    <NuxtImg src="@/public/login-image.png" />
    <NuxtImg src="/login-image.png" class="col-span-8 rounded-xl" />
    <img
      src="/login-image.png"
      alt="login-image"
      class="col-span-8 rounded-xl"
    />
    <div class="text-black text-center col-span-4 bg-white m-3 p-16 rounded-xl">
      <UIcon name="akar-icons:planet" class="w-10 h-10" />
      <div class="text-4xl font-medium">Welcome Back!</div>
      <div class="text-gray-500 lg:pt-3">Please enter your details</div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <UFormGroup label="Username" name="username" :error="errors.username">
          <UInput
            v-model="form.username"
            placeholder="Enter username"
            :error="!!errors.username"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password" :error="errors.password">
          <UInput
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            :error="!!errors.password"
          />
        </UFormGroup>

        <UButton type="submit" color="primary" block :loading="loading">
          Login
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

const router = useRouter();
const loading = ref(false);
const errors = ref<Record<string, string>>({});

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

async function handleSubmit() {
  try {
    loading.value = true;
    errors.value = {};

    await schema.validate(form, { abortEarly: false });

    const { data, error } = await useFetch("/api/auth/login", {
      method: "POST",
      body: form,
    });

    console.log("log :", form);
    if (error.value) {
      throw error.value;
    }

    await router.push("/home");
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error) => {
        if (error.path) {
          errors.value[error.path] = error.message;
        }
      });
    } else {
      useToast().add({
        title: "Error",
        description: err.message || "Login failed",
        color: "red",
      });
    }
  } finally {
    loading.value = false;
  }
}
</script>
