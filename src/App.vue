<!-- src/App.vue -->
<template>
  <div>
    <!-- Header -->
    <header class="app-header">
      <div class="container header-inner">
        <div class="header-left">
          <div class="lpg-chip">LPG 3 Kg</div>
          <h1>Logbook Penerima</h1>
        </div>
        <button class="btn btn-copy" @click="showModal = true">
          ⎘ Salin Data
        </button>
      </div>
    </header>

    <div class="container">
      <!-- Stats -->
      <div class="stat-card">
        <span class="stat-label">Total Penerima</span>
        <span class="stat-value">{{ store.total }}</span>
      </div>

      <!-- Form -->
      <FormEntri />

      <!-- Loading -->
      <p v-if="store.loading" class="loading-text">Memuat data...</p>

      <!-- Tabel -->
      <TabelLogbook v-else />
    </div>

    <ModalSalin v-model="showModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useLogbookStore } from './stores/logbook'
import FormEntri    from './components/FormEntri.vue'
import TabelLogbook from './components/TabelLogbook.vue'
import ModalSalin   from './components/ModalSalin.vue'

const store     = useLogbookStore()
const showModal = ref(false)

onMounted(() => store.fetchEntri())
</script>

<style scoped>
.app-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lpg-chip {
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
}
.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.stat-label {
  font-size: 13px;
  color: var(--muted);
  font-weight: 500;
}
.stat-value {
  font-family: var(--mono);
  font-size: 24px;
  font-weight: 600;
  color: var(--accent);
}
.loading-text {
  text-align: center;
  color: var(--muted);
  font-size: 13px;
  padding: 40px 0;
}
</style>