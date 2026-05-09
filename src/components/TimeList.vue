<template>
  <EmptyPanel v-if="selectedLine === null" message="Please select the bus line first" />
  <EmptyPanel v-else-if="selectedStop === null" message="Please select the bus stop first" />
  <DataPanel
    v-else
    column-label="Time"
    :title="`Bus Stop: ${selectedStop}`"
    :items="items"
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

const items = computed(() => store.getters.timesForStop)
</script>
