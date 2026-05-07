<template>
  <section class="bg-white rounded-1 overflow-hidden">
    <header class="pt-4 px-4 pb-2">
      <h2 class="title">Select Bus Line</h2>
    </header>
    <div class="p-4 d-flex flex-wrap gap-2">
      <button
        v-for="line in lines"
        :key="line"
        type="button"
        class="line-button"
        :class="{ 'line-button--active': line === selectedLine }"
        @click="selectLine(line)"
      >
        {{ line }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const lines = computed<number[]>(() => store.getters.lines)
const selectedLine = computed(() => store.state.selectedLine)

function selectLine(line: number) {
  store.commit('SET_SELECTED_LINE', line)
}
</script>

<style scoped>
.title {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text);
  margin: 0;
}

.line-button {
  height: 32px;
  padding: 8px 16px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
}

.line-button:hover {
  background-color: #1649ca;
}

.line-button--active,
.line-button--active:hover {
  background-color: #2e3e6e;
}
</style>
