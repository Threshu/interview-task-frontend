<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'sort-icon--flipped': flipped }"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      stroke-width="1.33"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ flipped?: boolean }>()
</script>

<style scoped>
svg {
  color: #63666e;
  transition: transform 0.2s ease;
}

.sort-icon--flipped {
  transform: rotate(180deg);
}
</style>
