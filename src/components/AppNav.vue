<template>
  <nav class="d-flex align-items-center bg-white rounded-1 px-4">
    <RouterLink :to="{ name: 'bus-lines' }" class="app-nav__link">
      <span class="app-nav__link-text">Bus Lines</span>
    </RouterLink>
    <RouterLink :to="{ name: 'stops' }" class="app-nav__link">
      <span class="app-nav__link-text">Stops</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav__link {
  display: flex;
  flex-direction: column;
  height: 64px;
  padding-top: 20px;
  gap: 18px;
  text-decoration: none;
}

.app-nav__link-text {
  padding: 0 24px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: var(--color-text-muted);
  text-align: center;
}

.app-nav__link.router-link-active .app-nav__link-text {
  color: var(--color-text-secondary);
}

.app-nav__link::after {
  content: '';
  height: 2px;
  background-color: transparent;
}

.app-nav__link.router-link-active::after {
  background-color: var(--color-primary);
}
</style>
