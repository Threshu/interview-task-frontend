<template>
  <div class="stops-card">
    <div class="stops-card__header">
      <div class="search-field">
        <input
          id="stop-search"
          v-model="query"
          type="text"
          class="search-field__input"
          placeholder=" "
          autocomplete="off"
        />
        <label for="stop-search" class="search-field__label">Search</label>
        <svg class="search-field__icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" stroke-width="1.5" />
          <line x1="9.5" y1="9.5" x2="13.5" y2="13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
    </div>

    <div class="stops-card__body">
      <SortableList
        column-label="Bus Stops"
        sortable
        :items="filteredStops"
        :sort-direction="sortOrder"
        @toggle-sort="toggleSort"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/store'
import SortableList from '@/components/SortableList.vue'
import type { SortOrder } from '@/types'

const store = useStore()
const query = ref('')
const sortOrder = ref<SortOrder>('asc')

const filteredStops = computed(() => {
  const q = query.value.trim().toLowerCase()
  const base = q
    ? store.getters.allUniqueStops.filter((s) => s.toLowerCase().includes(q))
    : store.getters.allUniqueStops
  return sortOrder.value === 'asc' ? base : [...base].reverse()
})

function toggleSort() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}
</script>

<style scoped>
.stops-card {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 4px;
  overflow: hidden;
}

.stops-card__header {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 8px 24px 8px 8px;
}

.stops-card__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.search-field {
  position: relative;
  width: 288px;
  height: 40px;
}

.search-field__input {
  width: 100%;
  height: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text);
  background: #ffffff;
  outline: none;
  box-sizing: border-box;
  font-family: var(--font-family-base);
}

.search-field__input:focus {
  border-color: var(--color-primary);
}

.search-field__label {
  position: absolute;
  left: 16px;
  top: 12px;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-light);
  pointer-events: none;
  transition: top 0.15s, font-size 0.15s, padding 0.15s;
}

.search-field__input:focus ~ .search-field__label,
.search-field__input:not(:placeholder-shown) ~ .search-field__label {
  top: -8px;
  font-size: 10px;
  background: #ffffff;
  padding: 0 4px;
  left: 12px;
}

.search-field__icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-field__input:not(:placeholder-shown) ~ .search-field__icon {
  display: none;
}
</style>
