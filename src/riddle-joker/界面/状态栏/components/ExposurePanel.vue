<template>
  <section class="panel">
    <h3 class="panel-title"><i class="fa-solid fa-user-secret"></i>身份暴露</h3>
    <div class="card-grid">
      <div
        v-for="(exposed, name) in store.data.在原晓.身份暴露"
        :key="name"
        class="identity-card"
        :class="{ exposed }"
      >
        <div class="card-inner">
          <div class="card-face back">
            <i class="fa-solid fa-shield-halved"></i>
            <span>{{ name }}</span>
          </div>
          <div class="card-face front">
            <i class="fa-solid fa-eye"></i>
            <span>{{ name }}</span>
            <em>暴露</em>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.identity-card {
  position: relative;
  perspective: 600px;
  aspect-ratio: 3 / 4;
}

.card-inner {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.45s ease;
}

.identity-card.exposed .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1.5px solid var(--c-border);
}

.card-face.back {
  background:
    repeating-linear-gradient(45deg, rgba(229, 155, 166, 0.06) 0 6px, transparent 6px 12px),
    var(--c-surface-alt);
  color: var(--c-text);
  box-shadow: 0 2px 6px rgba(58, 58, 68, 0.06);
}

.card-face.back i {
  color: var(--c-primary);
  font-size: 1.1rem;
}

.card-face.front {
  background: var(--c-danger);
  border-color: var(--c-danger);
  color: #fff;
  transform: rotateY(180deg);
}

.card-face.front i {
  font-size: 1.1rem;
}

.card-face.front em {
  font-style: normal;
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  background: rgba(255, 255, 255, 0.22);
  padding: 1px 7px;
  border-radius: 999px;
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }
}
</style>
