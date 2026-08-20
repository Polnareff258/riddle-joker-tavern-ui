<template>
  <section class="panel">
    <h3 class="panel-title"><i class="fa-solid fa-flag"></i>已触发事件</h3>
    <div v-if="events.length" class="event-list">
      <span v-for="(ev, i) in events" :key="i" class="event-badge">
        <i class="fa-solid fa-circle"></i>{{ ev }}
      </span>
    </div>
    <p v-else class="empty">暂无已触发事件</p>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const events = computed(() => store.data.世界.已触发事件);
</script>

<style lang="scss" scoped>
.panel {
  padding: 12px 14px;
  border-top: 1px solid var(--c-border);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 10px;
}

.panel-title i {
  color: var(--c-ink);
  width: 16px;
  text-align: center;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.event-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 11px;
  border-radius: 999px;
  background: var(--c-surface-alt);
  border: 1px solid var(--c-border);
  font-size: 0.78rem;
  color: var(--c-text);
}

.event-badge i {
  color: var(--c-accent);
  font-size: 0.42rem;
}

.empty {
  font-size: 0.8rem;
  color: var(--c-text-muted);
}
</style>
