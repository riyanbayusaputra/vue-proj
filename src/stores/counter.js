// src/stores/logbook.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLogbookStore = defineStore('logbook', () => {

  // ── 1. STATE ──────────────────────────────────────────
  // Ambil data dari localStorage kalau ada, kalau gak ada pakai array kosong
  const entri = ref(
    JSON.parse(localStorage.getItem('lpg_entri') || '[]')
  )

  // ── 2. GETTERS ────────────────────────────────────────
  // Hitung total penerima otomatis
  const total = computed(() => entri.value.length)

  // ── 3. ACTIONS ────────────────────────────────────────
  // Simpan ke localStorage (dipanggil tiap ada perubahan)
  function simpan() {
    localStorage.setItem('lpg_entri', JSON.stringify(entri.value))
  }

  // Tambah data baru
  function tambahEntri(data) {
    const id = Date.now().toString() // ID unik pakai timestamp
    entri.value.unshift({ id, ...data }) // unshift = taruh di atas
    simpan()
  }

  // Hapus data by ID
  function hapusEntri(id) {
    entri.value = entri.value.filter(e => e.id !== id)
    simpan()
  }

  // Update data by ID
  function updateEntri(id, data) {
    const idx = entri.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      entri.value[idx] = { ...entri.value[idx], ...data }
      simpan()
    }
  }

  // Jangan lupa di-return semua biar bisa dipakai komponen
  return { entri, total, tambahEntri, hapusEntri, updateEntri }
})