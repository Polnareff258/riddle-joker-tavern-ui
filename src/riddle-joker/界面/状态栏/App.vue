<template>
  <div class="status-card" :class="{ crisis: is_crisis }">
    <div
      class="header"
      role="button"
      tabindex="0"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
      @keydown.enter="expanded = !expanded"
    >
      <HeaderBar :crisis="is_crisis" />
      <div class="chevron" :class="{ open: expanded }">
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </div>

    <transition name="expand">
      <div v-if="expanded" class="expand-area">
        <ExposurePanel />
        <EventList />
        <MissionPanel />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from './components/HeaderBar.vue';
import ExposurePanel from './components/ExposurePanel.vue';
import EventList from './components/EventList.vue';
import MissionPanel from './components/MissionPanel.vue';
import { useDataStore } from './store';

const store = useDataStore();
const expanded = useLocalStorage<boolean>('riddle-joker:statusbar:expanded', false);

const is_crisis = computed(() => {
  const data = store.data;
  const exposed_count = _(data.在原晓.身份暴露).values().filter(Boolean).value().length;
  return data.在原晓.潜伏任务进度 === '身份危急' || exposed_count >= 3;
});
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(58, 58, 68, 0.1);
  overflow: hidden;
  font-family: var(--font-ui);
  color: var(--c-text);
  font-size: 13px;
  line-height: 1.4;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.status-card::before {
  content: '';
  display: block;
  height: 3px;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  transition: background 0.3s ease;
}

.status-card.crisis {
  border-color: color-mix(in srgb, var(--c-ink) 55%, var(--c-border));
  box-shadow: 0 4px 16px rgba(62, 92, 138, 0.18);
}

.status-card.crisis::before {
  background: linear-gradient(90deg, var(--c-ink), var(--c-danger));
}

.header {
  position: relative;
  cursor: pointer;
  user-select: none;
  background: linear-gradient(180deg, var(--c-surface-alt) 0%, var(--c-surface) 100%);
}

.status-card.crisis .header {
  background: linear-gradient(180deg, #f2f5fa 0%, var(--c-surface) 100%);
}

.chevron {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--c-text-muted);
  font-size: 0.8rem;
  transition: transform 0.25s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.expand-area {
  border-top: 1px dashed var(--c-border);
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
