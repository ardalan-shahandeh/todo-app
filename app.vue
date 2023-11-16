<script setup lang="ts">
const { data } = useFetch("/api/todo");
console.log(data);
</script>

<template>
  <div>{{ data }}</div>
</template>
