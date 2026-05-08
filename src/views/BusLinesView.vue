<template>
  <div class="d-flex flex-column gap-3">
    <LineList />
    <div class="d-flex gap-3">
      <StopList />
      <TimeList />
    </div>
  </div>
</template>

<script setup lang="ts">
import LineList from '@/components/LineList.vue'
import StopList from '@/components/StopList.vue'
import TimeList from '@/components/TimeList.vue'
</script>
