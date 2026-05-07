<template>
  <div class="empty-panel">
    <p class="empty-panel__text">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>

<style scoped>
.empty-panel {
  flex: 1;
  min-height: 444px;
  background-color: #ffffff;
  border: 2px dashed #9a9da4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-panel__text {
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #63666e;
  margin: 0;
  text-align: center;
}
</style>
