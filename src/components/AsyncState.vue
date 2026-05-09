<template>
  <div v-if="loading" class="async-state__loading">{{ loadingText }}</div>
  <div
    v-else-if="error"
    class="alert alert-danger d-flex align-items-center justify-content-between gap-3"
    role="alert"
  >
    <span>{{ error }}</span>
    <button type="button" class="btn btn-sm btn-outline-danger" @click="$emit('retry')">
      {{ retryText }}
    </button>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading: boolean
    error: string | null
    loadingText?: string
    retryText?: string
  }>(),
  {
    loadingText: 'Loading...',
    retryText: 'Try again',
  }
)

defineEmits<{ (e: 'retry'): void }>()
</script>

<style scoped>
.async-state__loading {
  text-align: center;
  padding: 48px 0;
  color: var(--color-text-light);
}
</style>
