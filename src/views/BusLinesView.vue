<template>
  <div class="bus-lines">
    <LineList />
    <div class="bus-lines__panels">
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

<style scoped>
.bus-lines {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bus-lines__panels {
  flex: 1;
  min-height: 0;
  display: flex;
  gap: 16px;
}
</style>
