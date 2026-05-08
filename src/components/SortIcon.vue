<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="{ 'sort-icon--flipped': flipped }"
  >
    <rect x="1.33" y="1.33" width="13.33" height="13.33" rx="3.33" stroke="currentColor" stroke-width="1"/>
    <path d="M8 4.5V9.5" stroke="currentColor" stroke-width="1.33" stroke-linecap="round"/>
    <path d="M5.5 7.5L8 10.5L10.5 7.5" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ flipped?: boolean }>()
</script>

<style scoped>
svg {
  color: var(--color-text-light);
  transition: transform 0.2s ease;
}

.sort-icon--flipped {
  transform: rotate(180deg);
}
</style>
