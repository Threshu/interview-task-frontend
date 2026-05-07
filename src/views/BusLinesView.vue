<template>
  <div class="d-flex flex-column gap-3">
    <LineList />
    <div class="d-flex gap-3">
      <EmptyPanel message="Please select the bus line first" />
      <EmptyPanel message="Please select the bus line first" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LineList from '@/components/LineList.vue'
import EmptyPanel from '@/components/EmptyPanel.vue'
</script>
