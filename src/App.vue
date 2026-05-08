<template>
  <div class="app-container">
    <h1 class="app-title">Timetable</h1>
    <div class="app-inner">
      <AppNav />
      <div class="app-view">
        <div v-if="loading" class="text-center py-5">Loading...</div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
        <RouterView v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from '@/store'
import AppNav from '@/components/AppNav.vue'

const store = useStore()
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

onMounted(() => {
  store.dispatch('loadStops')
})
</script>

<style scoped>
.app-container {
  height: 100vh;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
}

.app-inner {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.app-view {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.app-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: var(--color-text);
  margin: 0;
  padding: 4px 0;
}
</style>
