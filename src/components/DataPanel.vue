<template>
  <section class="panel">
    <header class="panel__header">
      <h2 class="panel__title">{{ title }}</h2>
    </header>
    <SortableList
      :column-label="columnLabel"
      :items="items"
      :sortable="sortable"
      :sort-direction="sortDirection"
      :clickable="clickable"
      :selected-key="selectedKey"
      @toggle-sort="emit('toggle-sort')"
      @item-click="(key: string) => emit('item-click', key)"
    />
  </section>
</template>

<script setup lang="ts">
import SortableList from '@/components/SortableList.vue'
import type { SortOrder } from '@/types'

defineProps<{
  title: string
  columnLabel: string
  items: string[]
  sortable?: boolean
  sortDirection?: SortOrder
  clickable?: boolean
  selectedKey?: string | null
}>()

const emit = defineEmits<{
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
</style>
