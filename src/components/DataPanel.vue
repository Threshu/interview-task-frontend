<template>
  <section class="panel">
    <header class="panel__header">
      <h2 class="panel__title">{{ title }}</h2>
    </header>
    <div class="panel__body">
      <div class="panel__column-header">
        <span class="panel__column-label">{{ columnLabel }}</span>
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
      <ul class="panel__rows">
        <li
          v-for="item in items"
          :key="item"
          class="panel__row"
          :class="{
            'panel__row--clickable': clickable,
            'panel__row--selected': item === selectedKey,
          }"
          @click="clickable && $emit('item-click', item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import SortIcon from '@/components/SortIcon.vue'
defineProps<{
  title: string
  columnLabel: string
  items: string[]
  sortable?: boolean
  sortDirection?: 'asc' | 'desc'
  clickable?: boolean
  selectedKey?: string | null
}>()

defineEmits<{
  (e: 'toggle-sort'): void
  (e: 'item-click', key: string): void
}>()
</script>

<style scoped>
.panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
}

.panel__header {
  padding: 24px 24px 8px;
}

.panel__title {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  color: var(--color-text);
  margin: 0;
}

.panel__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.panel__column-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 24px 8px 23px 24px;
  border-bottom: 1px solid var(--color-border);
}

.panel__column-label {
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.001em;
  color: var(--color-text-secondary);
}


.panel__rows {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.panel__row {
  height: 56px;
  padding: 20px 0 19px 24px;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-bg);
}

.panel__row--clickable {
  cursor: pointer;
}

.panel__row--clickable:hover {
  background-color: #f8f8fb;
}

.panel__row--selected {
  color: var(--color-primary);
}
</style>
