<!-- src/components/ModalSalin.vue -->

<template>
  <!-- Overlay gelap, klik di luar = tutup modal -->
  <div v-if="modelValue" class="overlay" @click.self="tutup">

    <div class="modal">
      <h2>Salin Data</h2>

      <!-- Preview teks yang akan disalin -->
      <pre ref="areaRef">{{ teksHasil }}</pre>

      <!-- Tombol -->
      <div>
        <button @click="tutup">Batal</button>
        <button @click="salin">
          {{ tersalin ? '✔ Tersalin!' : 'Salin Semua' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLogbookStore } from '../stores/logbook'

// Props: buka/tutup modal dikontrol dari parent
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const store    = useLogbookStore()
const tersalin = ref(false)
const areaRef  = ref(null)

// Buat teks dari semua data di store
const teksHasil = computed(() => {
  if (store.entri.length === 0) return 'Belum ada data.'

  return store.entri
    .map((e, i) => `${i + 1}. ${e.nama} — ${e.nik}`)
    .join('\n')
})

// Salin ke clipboard
async function salin() {
  try {
    await navigator.clipboard.writeText(teksHasil.value)
    tersalin.value = true
    setTimeout(() => { tersalin.value = false }, 2000)
  } catch {
    alert('Gagal salin, coba manual.')
  }
}

function tutup() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 400px;
}
pre {
  background: #f3f3f3;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.8;
  white-space: pre-wrap;
  margin: 12px 0;
}
</style>