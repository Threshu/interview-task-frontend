<template>
  <div class="app-container">
    <h1 class="app-title">Timetable</h1>
    <div class="app-inner">
      <AppNav />
      <div class="app-view">
        <AsyncState :loading="loading" :error="error" @retry="loadStops">
          <RouterView />
        </AsyncState>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from '@/store'
import AppNav from '@/components/AppNav.vue'
import AsyncState from '@/components/AsyncState.vue'

const store = useStore()
const loading = computed(() => store.state.loading)
const error = computed(() => store.state.error)

function loadStops() {
  store.dispatch('loadStops')
}

onMounted(loadStops)
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

.app-title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: var(--color-text);
  margin: 0;
  padding: 4px 0;
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
</style>
