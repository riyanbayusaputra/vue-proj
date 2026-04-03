// src/stores/logbook.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export const useLogbookStore = defineStore('logbook', () => {

  // ── STATE ─────────────────────────────────────────────
  const entri   = ref([])
  const loading = ref(false)

  // ── GETTERS ───────────────────────────────────────────
  const total = computed(() => entri.value.length)

  // ── ACTIONS ───────────────────────────────────────────

  // Ambil semua data dari Supabase
  async function fetchEntri() {
    loading.value = true
    const { data, error } = await supabase
      .from('penerima')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Gagal fetch:', error.message)
    } else {
      entri.value = data
    }
    loading.value = false
  }

  // Tambah data baru
  async function tambahEntri(payload) {
    const { data, error } = await supabase
      .from('penerima')
      .insert(payload)
      .select()

    if (error) {
      console.error('Gagal tambah:', error.message)
    } else {
      entri.value.unshift(data[0])
    }
  }

  // Hapus data by ID
  async function hapusEntri(id) {
    const { error } = await supabase
      .from('penerima')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Gagal hapus:', error.message)
    } else {
      entri.value = entri.value.filter(e => e.id !== id)
    }
  }

  // Update data by ID
  async function updateEntri(id, payload) {
    const { error } = await supabase
      .from('penerima')
      .update(payload)
      .eq('id', id)

    if (error) {
      console.error('Gagal update:', error.message)
    } else {
      const idx = entri.value.findIndex(e => e.id === id)
      if (idx !== -1) {
        entri.value[idx] = { ...entri.value[idx], ...payload }
      }
    }
  }

  return { entri, total, loading, fetchEntri, tambahEntri, hapusEntri, updateEntri }
})