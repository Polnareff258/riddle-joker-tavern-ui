<template>
  <div class="header-bar">
    <div class="meta-row">
      <span class="meta-item"><i class="fa-regular fa-calendar"></i>{{ store.data.世界.当前日期 }}</span>
      <span class="meta-item"><i :class="period_icon"></i>{{ store.data.世界.当前时段 }}</span>
      <span class="meta-item loc"><i class="fa-solid fa-location-dot"></i>{{ store.data.世界.当前地点 }}</span>
    </div>

    <div class="route-row">
      <span class="route-badge" :class="{ crisis }"><i class="fa-solid fa-route"></i>{{ store.data.路线.当前 }}</span>
      <div class="bond">
        <span class="bond-label"><i class="fa-solid fa-heart"></i>与主角</span>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: bond + '%' }"></div>
        </div>
        <span class="bond-value">{{ bond }}</span>
      </div>
    </div>

    <div class="girls-row">
      <div v-for="name in GIRLS" :key="name" class="girl">
        <span class="girl-name">{{ name }}</span>
        <div class="bar-track mini">
          <div
            class="bar-fill"
            :class="{ zero: (aff[name] ?? 0) === 0 }"
            :style="{ width: (aff[name] ?? 0) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const { crisis } = defineProps<{ crisis: boolean }>();

const store = useDataStore();

const GIRLS = ['绫濑', '七海', '茉优', '羽月', '千咲'] as const;

const PERIOD_ICON: Record<string, string> = {
  清晨: 'fa-solid fa-sun',
  上午: 'fa-solid fa-sun',
  中午: 'fa-solid fa-sun',
  下午: 'fa-regular fa-sun',
  傍晚: 'fa-solid fa-cloud',
  夜间: 'fa-solid fa-moon',
};

const bond = computed(() => store.data.玩家.与主角关系);
const aff = computed(() => store.data.玩家.与女主关系);
const period_icon = computed(() => PERIOD_ICON[store.data.世界.当前时段] ?? 'fa-solid fa-clock');
</script>

<style lang="scss" scoped>
.header-bar {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 16px;
  font-size: 0.82rem;
  color: var(--c-text-muted);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.meta-item i {
  color: var(--c-primary);
  width: 14px;
  text-align: center;
}

.meta-item.loc i {
  color: var(--c-ink);
}

.meta-item.loc {
  color: var(--c-text);
  font-weight: 600;
}

.route-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.route-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(229, 155, 166, 0.16);
  border: 1px solid rgba(229, 155, 166, 0.42);
  color: var(--c-primary);
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
}

.route-badge.crisis {
  background: rgba(62, 92, 138, 0.12);
  border-color: rgba(62, 92, 138, 0.36);
  color: var(--c-ink);
}

.bond {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 180px;
}

.bond-label {
  font-size: 0.78rem;
  color: var(--c-text-muted);
  white-space: nowrap;
}

.bond-label i {
  color: var(--c-accent);
  margin-right: 2px;
}

.bond .bar-track {
  flex: 1;
  height: 8px;
}

.bond-value {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--c-accent);
  min-width: 2.4em;
  text-align: right;
}

.girls-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.girl {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.girl-name {
  font-size: 0.7rem;
  color: var(--c-text-muted);
  text-align: center;
}

.bar-track {
  height: 7px;
  border-radius: 999px;
  background: rgba(229, 155, 166, 0.16);
  overflow: hidden;
}

.bar-track.mini {
  height: 5px;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent));
  transition: width 0.3s ease;
}

.bar-fill.zero {
  opacity: 0.35;
}

@media (max-width: 600px) {
  .girls-row {
    gap: 5px;
  }

  .bond {
    min-width: 100%;
    margin-top: 2px;
  }
}
</style>
