<template>
  <div class="game-start" :style="{ backgroundImage: `url(${bgUrl})` }">
    <div class="overlay"></div>
    <div class="content">
      <div class="badge">RIDDLE JOKER</div>
      <div class="title">星幽术世界 · 转学日</div>
      <div class="prompt">世界线旅行者，选择登场地点</div>
      <div class="locations">
        <button
          v-for="loc in locations"
          :key="loc.id"
          class="loc-btn"
          type="button"
          @click="choose(loc)"
        >
          <span class="loc-name">{{ loc.name }}</span>
          <span class="loc-desc">{{ loc.desc }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const bgUrl =
  'https://testingcf.jsdelivr.net/gh/Polnareff258/riddle-joker-tavern-ui/assets/bg-start.jpg';

const locations = [
  {
    id: '校门',
    name: '橘花学院校门',
    desc: '转学生人流中，与在原晓、七海擦肩',
    relation: '转学日校门口初识在原晓与七海，彼此不知底细',
  },
  {
    id: '车站',
    name: '车站',
    desc: '电车到站，拖着行李箱走出闸口',
    relation: '转学日从车站出站，独自走向橘花学院，尚未结识他人',
  },
  {
    id: '宿舍',
    name: '学生寮',
    desc: '寄宿宿舍门前，寮长二条院羽月核对名单',
    relation: '转学日到学生寮报到，与寮长二条院羽月初见',
  },
];

function choose(loc: (typeof locations)[number]) {
  store.data.世界.当前地点 = loc.name;
  store.data.世界.关系摘要 = loc.relation;
  createChatMessages([{ role: 'user', message: `我选择在${loc.name}登场。` }]).then(() => {
    triggerSlash('/trigger');
  });
}
</script>

<style scoped>
.game-start {
  position: relative;
  width: 100%;
  max-width: 720px;
  min-height: 340px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  background-size: cover;
  background-position: center 20%;
  font-family: var(--font-ui);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20, 22, 34, 0.55) 0%, rgba(20, 22, 34, 0.72) 100%);
}

.content {
  position: relative;
  padding: 28px 22px 26px;
  color: #fff;
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 4px 14px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.92);
}

.title {
  margin-top: 12px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.prompt {
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.82);
}

.locations {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loc-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.loc-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.55);
}

.loc-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}

.loc-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.35;
}
</style>
