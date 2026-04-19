<script setup>
import { computed } from 'vue'

// Detect if we're in the hub or a module
const isHub = computed(() => {
  if (typeof window === 'undefined') return true
  const path = window.location.pathname
  return path === '/' || path.match(/\/react-course\/?$/)
})

// Hub URL - go to slide 2 (Cursuri page)
const hubUrl = computed(() => {
  if (isHub.value) return null // Don't show link in hub
  if (typeof window === 'undefined') return '#'

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  return isDev ? 'http://localhost:3030/2' : '../2'
})
</script>

<template>
  <div v-if="hubUrl" class="fixed top-4 left-4 z-50">
    <a
      :href="hubUrl"
      class="back-to-courses-btn"
      title="Back to Cursuri"
    >
      <mdi-home-outline />
    </a>
  </div>
</template>

<style scoped>
.back-to-courses-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

.back-to-courses-btn:hover {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
</style>
