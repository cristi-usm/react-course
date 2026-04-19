<script setup>
import { computed } from 'vue'
import { THEME_CONFIG } from '../../../common/theme/config'

const props = defineProps({
  module: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

// Module order definition
const modules = [
  '01-introduction',
  '02-react-introduction',
  '03-props-and-rendering',
  '04-event-handling',
  '05-state',
  '06-handling-state',
  '07-reducer-and-context',
  '08-refs-and-effects',
  '09-fetching',
  '10-performance',
  '11-routing',
]

// Determine completion status
const isCompleted = computed(() => {
  const currentIndex = modules.indexOf(THEME_CONFIG.currentModule)
  const myIndex = modules.indexOf(props.module)
  // If the current module is not found or this module is not found, default to false
  if (currentIndex === -1 || myIndex === -1) return false

  // Completed if this module comes strictly before the current active module
  // Or should it include the current one? "passed the lesson" implies strictly before.
  // But usually "current" implies "in progress", so previous ones are done.
  return myIndex < currentIndex
})

// Development port mapping
const devPorts = {
  '01-introduction': 3031,
  '02-react-introduction': 3032,
  '03-props-and-rendering': 3033,
  '04-event-handling': 3034,
  '05-state': 3035,
  '06-handling-state': 3036,
  '07-reducer-and-context': 3037,
  '08-refs-and-effects': 3038,
  '09-fetching': 3039,
  '10-performance': 3040,
  '11-routing': 3041,
}

// Detect environment
const isDev = computed(() => {
  return import.meta.env.DEV || window.location.hostname === 'localhost'
})

// Generate correct URL based on environment
const moduleUrl = computed(() => {
  if (isDev.value) {
    const port = devPorts[props.module]
    return `http://localhost:${port}/`
  } else {
    // Production: use relative path (works with any base path)
    return `${props.module}/`
  }
})
</script>

<template>
  <a :href="moduleUrl" class="hub-card no-underline" :class="{ complete: isCompleted }">
    <div class="hub-card-icon">{{ icon }}</div>
    <div class="hub-card-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
    <div v-if="isCompleted" class="status-icon">✅</div>
  </a>
</template>

<style scoped>
a.no-underline {
  text-decoration: none;
  color: inherit;
}

.hub-card {
  display: flex;
  align-items: center;
  text-align: left;
  background: rgba(97, 218, 251, 0.05);
  border: 1px solid rgba(97, 218, 251, 0.2);
  border-radius: 8px;
  padding: 0.7rem 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  height: 100%;
  overflow: hidden;
  max-width: 100%;
  position: relative;
}

.hub-card:hover {
  background: rgba(97, 218, 251, 0.1);
  border-color: rgba(97, 218, 251, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hub-card.complete {
  border-color: rgba(74, 222, 128, 0.5);
  /* Green border */
  background: rgba(74, 222, 128, 0.05);
  /* Slight green tint */
}

.hub-card.complete:hover {
  background: rgba(74, 222, 128, 0.1);
  border-color: rgba(74, 222, 128, 0.7);
}

.hub-card-icon {
  font-size: 2rem;
  margin-right: 1rem;
  margin-bottom: 0;
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hub-card-content {
  flex: 1;
  min-width: 0;
  /* Crucial for text truncation in flex items */
  overflow: hidden;
}

.hub-card h3 {
  color: var(--course-primary, #61dafb);
  margin-bottom: 0.1rem;
  font-size: 1.05rem;
  line-height: 1.2;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hub-card.complete h3 {
  color: #4ade80;
  /* Green title for completed */
}

.hub-card p {
  opacity: 0.85;
  font-size: 0.8rem;
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-icon {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  flex-shrink: 0;
}
</style>
