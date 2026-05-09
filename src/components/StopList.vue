<template>
  <EmptyPanel v-if="selectedLine === null" message="Please select the bus line first" />
  <DataPanel
    v-else
    column-label="Bus Stops"
    sortable
    clickable
    :title="`Bus Line: ${selectedLine}`"
    :items="stops"
    :sort-direction="sortOrder"
    :selected-key="selectedStop"
    @toggle-sort="toggleSort"
    @item-click="onStopClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import EmptyPanel from '@/components/EmptyPanel.vue'
import DataPanel from '@/components/DataPanel.vue'

const store = useStore()
const selectedLine = computed(() => store.state.selectedLine)
const selectedStop = computed(() => store.state.selectedStop)
const sortOrder = computed(() => store.state.stopsSortOrder)

const stops = computed(() => store.getters.stopsForLine)

function toggleSort() {
  store.commit('TOGGLE_STOPS_SORT')
}

function onStopClick(key: string) {
  store.commit('SET_SELECTED_STOP', key)
}
</script>
