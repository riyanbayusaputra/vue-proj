<!-- src/components/FormEntri.vue -->
<template>
  <div class="form-card">
    <h2 class="form-title">Tambah Penerima</h2>

    <div class="form-row">
      <div class="form-group">
        <label>Nama Lengkap</label>
        <input
          v-model="form.nama"
          type="text"
          placeholder="Contoh: Budi Santoso"
          @keyup.enter="submit"
        />
      </div>

      <div class="form-group">
        <label>NIK (16 digit)</label>
        <input
          v-model="form.nik"
          type="text"
          maxlength="16"
          placeholder="3201XXXXXXXXXXXX"
          @keyup.enter="submit"
        />
      </div>

      <div class="form-group form-action">
        <label>&nbsp;</label>
        <button class="btn btn-primary" @click="submit">
          + Tambah
        </button>
      </div>
    </div>

    <p v-if="error" class="error-msg">⚠ {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLogbookStore } from '../stores/logbook'

const store = useLogbookStore()
const form  = reactive({ nama: '', nik: '' })
const error = ref('')

function validate() {
  if (!form.nama.trim())           return 'Nama tidak boleh kosong.'
  if (!form.nik.trim())            return 'NIK tidak boleh kosong.'
  if (!/^\d{16}$/.test(form.nik)) return 'NIK harus 16 digit angka.'
  return ''
}

async function submit() {
  error.value = validate()
  if (error.value) return

  await store.tambahEntri({ nama: form.nama.trim(), nik: form.nik.trim() })
  form.nama   = ''
  form.nik    = ''
  error.value = ''
}
</script>

<style scoped>
.form-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.form-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 16px;
}
.form-row {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
}
.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px;
}
.form-action {
  flex: 0;
}
.error-msg {
  margin-top: 10px;
  color: var(--red);
  font-size: 12px;
  font-family: var(--mono);
}
</style>