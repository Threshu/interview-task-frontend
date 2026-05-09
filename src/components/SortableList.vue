<template>
  <div class="sortable-list">
    <div class="sortable-list__header">
      <span class="sortable-list__label">{{ columnLabel }}</span>
      <button
        v-if="sortable"
        type="button"
        class="btn-icon"
        aria-label="Toggle sort order"
        @click="$emit('toggle-sort')"
      >
        <SortIcon :flipped="sortDirection === 'desc'" />
      </button>
    </div>
    <ul class="sortable-list__rows">
      <li v-for="item in items" :key="item" class="sortable-list__row-wrap">
        <button
          v-if="clickable"
          type="button"
          class="sortable-list__row sortable-list__row--clickable"
          :class="{ 'sortable-list__row--selected': item === selectedKey }"
          :aria-pressed="item === selectedKey"
          @click="$emit('item-click', item)"
        >
          {{ item }}
        </button>
        <div v-else class="sortable-list__row">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SortIcon from '@/components/SortIcon.vue'
import type { SortOrder } from '@/types'

defineProps<{
  columnLabel: string
  items: string[]
  sortable?: boolean
  sortDirection?: SortOrder
  clickable?: boolean
  selectedKey?: string | null
}>()

defineEmits<{
  (e: 'toggle-sort'): void
  (e: 'item-click', key: string): void
}>()
</script>

<style scoped>
.sortable-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.sortable-list__header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 8px 23px 24px;
  border-bottom: 1px solid var(--color-border);
}

.sortable-list__label {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.001em;
  color: var(--color-text-secondary);
}

.sortable-list__rows {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.sortable-list__row-wrap {
  display: block;
}

.sortable-list__row {
  width: 100%;
  height: 56px;
  padding: 20px 0 19px 24px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-bg);
  text-align: left;
}

.sortable-list__row--clickable {
  cursor: pointer;
}

.sortable-list__row--clickable:hover {
  background-color: #f8f8fb;
}

.sortable-list__row--clickable:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.sortable-list__row--selected {
  color: var(--color-primary);
}
</style>
