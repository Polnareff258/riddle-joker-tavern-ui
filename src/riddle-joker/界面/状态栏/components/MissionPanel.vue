<template>
  <section class="panel">
    <h3 class="panel-title"><i class="fa-solid fa-ghost"></i>潜伏任务</h3>
    <div class="stepper">
      <div
        v-for="(stage, i) in STAGES"
        :key="stage"
        class="step"
        :class="{
          done: i < current_index,
          current: i === current_index,
          crisis: is_crisis_stage && i === current_index,
        }"
      >
        <div class="step-dot">
          <i v-if="i < current_index" class="fa-solid fa-check"></i>
        </div>
        <span class="step-label">{{ stage }}</span>
      </div>
    </div>

    <div class="secret-badge" :class="{ known: store.data.在原晓.绫濑秘密知情 }">
      <i class="fa-solid" :class="store.data.在原晓.绫濑秘密知情 ? 'fa-unlock' : 'fa-lock'"></i>
      <span>绫濑的秘密</span>
      <b>{{ store.data.在原晓.绫濑秘密知情 ? '已知' : '未知' }}</b>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const STAGES = ['转入学院', '日常潜伏', '伪钞调查', '失踪案调查', '身份危急', '任务终结'] as const;

const current_index = computed(() => {
  const idx = STAGES.indexOf(store.data.在原晓.潜伏任务进度);
  return idx >= 0 ? idx : 0;
});

const is_crisis_stage = computed(() => store.data.在原晓.潜伏任务进度 === '身份危急');
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

.stepper {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 4px;
}

.stepper::before {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 10px;
  height: 2px;
  background: var(--c-border);
  border-radius: 2px;
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.step-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--c-surface-alt);
  border: 2px solid var(--c-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  color: var(--c-text-muted);
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.step.done .step-dot {
  background: var(--c-ink);
  border-color: var(--c-ink);
  color: #fff;
}

.step.current .step-dot {
  background: var(--c-surface-alt);
  border-color: var(--c-ink);
  color: var(--c-ink);
  box-shadow: 0 0 0 3px rgba(62, 92, 138, 0.15);
}

.step.crisis .step-dot {
  border-color: var(--c-danger);
  color: var(--c-danger);
  animation: pulse 1.2s ease infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(196, 69, 60, 0.16);
  }

  50% {
    box-shadow: 0 0 0 6px rgba(196, 69, 60, 0.07);
  }
}

.step-label {
  font-size: 0.6rem;
  color: var(--c-text-muted);
  text-align: center;
}

.step.current .step-label {
  color: var(--c-text);
  font-weight: 700;
}

.step.crisis .step-label {
  color: var(--c-danger);
  font-weight: 700;
}

.secret-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 13px;
  border-radius: 999px;
  background: rgba(62, 92, 138, 0.08);
  border: 1px solid rgba(62, 92, 138, 0.28);
  color: var(--c-ink);
  font-size: 0.8rem;
}

.secret-badge i {
  font-size: 0.85rem;
}

.secret-badge b {
  font-weight: 700;
}

.secret-badge.known {
  background: rgba(212, 91, 106, 0.08);
  border-color: rgba(212, 91, 106, 0.3);
  color: var(--c-accent);
}
</style>
