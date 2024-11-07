<script setup lang="ts">
import Login from "./login.vue";
import { useRouter } from "vue-router";

const router = useRouter();

router.replace("/login");
</script>

<template>
  <div>Index</div>
</template>
