<!-- src/components/TabelLogbook.vue -->
<template>
  <div class="tabel-card">

    <!-- Header -->
    <div class="tabel-header">
      <h2 class="tabel-title">Data Penerima</h2>
      <input
        v-model="cari"
        type="text"
        placeholder="🔍 Cari nama / NIK..."
        class="input-cari"
      />
    </div>

    <!-- Kosong -->
    <div v-if="hasilFilter.length === 0" class="kosong">
      <div class="kosong-icon">📋</div>
      <p>Belum ada data penerima.</p>
    </div>

    <!-- Tabel -->
    <div v-else class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIK</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in hasilFilter" :key="item.id">

            <!-- Mode normal -->
            <template v-if="editId !== item.id">
              <td class="td-no">{{ index + 1 }}</td>
              <td class="td-nama">
                <div class="nama-wrap">
                  <div class="avatar">{{ item.nama.charAt(0).toUpperCase() }}</div>
                  {{ item.nama }}
                </div>
              </td>
              <td class="td-nik">
                <div class="nik-wrap">
                  <span class="nik-text">{{ item.nik }}</span>
                  <button
                    class="btn-salin-nik"
                    @click="salinNik(item.nik, item.id)"
                    :title="'Salin NIK ' + item.nama"
                  >
                    {{ disalin === item.id ? '✔' : '⎘' }}
                  </button>
                </div>
              </td>
              <td>
                <div class="aksi-group">
                  <button class="btn btn-outline btn-sm" @click="mulaiEdit(item)">✏ Edit</button>
                  <button class="btn btn-danger btn-sm" @click="hapus(item.id)">✕ Hapus</button>
                </div>
              </td>
            </template>

            <!-- Mode edit -->
            <template v-else>
              <td class="td-no">{{ index + 1 }}</td>
              <td>
                <input v-model="editForm.nama" class="input-inline" placeholder="Nama" />
              </td>
              <td>
                <input v-model="editForm.nik" class="input-inline" maxlength="16" placeholder="NIK" />
              </td>
              <td>
                <div class="aksi-group">
                  <button class="btn btn-primary btn-sm" @click="simpanEdit(item.id)">✔ Simpan</button>
                  <button class="btn btn-outline btn-sm" @click="editId = null">✕ Batal</button>
                </div>
              </td>
            </template>

          </tr>
        </tbody>
      </table>

      <!-- Footer tabel -->
      <div class="tabel-footer">
        Menampilkan {{ hasilFilter.length }} dari {{ store.total }} penerima
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useLogbookStore } from '../stores/logbook'

const store    = useLogbookStore()
const cari     = ref('')
const editId   = ref(null)
const disalin  = ref(null) // nyimpen ID row yang NIK nya baru disalin
const editForm = reactive({ nama: '', nik: '' })

const hasilFilter = computed(() => {
  const q = cari.value.toLowerCase().trim()
  if (!q) return store.entri
  return store.entri.filter(e =>
    e.nama.toLowerCase().includes(q) || e.nik.includes(q)
  )
})

// Salin NIK per baris
async function salinNik(nik, id) {
  try {
    await navigator.clipboard.writeText(nik)
    disalin.value = id
    setTimeout(() => { disalin.value = null }, 2000)
  } catch {
    alert('Gagal salin NIK.')
  }
}

function hapus(id) {
  if (confirm('Yakin hapus data ini?')) store.hapusEntri(id)
}

function mulaiEdit(item) {
  editId.value  = item.id
  editForm.nama = item.nama
  editForm.nik  = item.nik
}

async function simpanEdit(id) {
  await store.updateEntri(id, { nama: editForm.nama.trim(), nik: editForm.nik.trim() })
  editId.value = null
}
</script>

<style scoped>
.tabel-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

/* Header */
.tabel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
  gap: 12px;
}
.tabel-title { font-size: 14px; font-weight: 700; }
.input-cari  { width: 220px; padding: 8px 12px; font-size: 12px; }

/* Table */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: #F8FAFF; }
th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid var(--border);
}
td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 13px;
  vertical-align: middle;
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: #F8FAFF; transition: background 0.15s; }

/* No kolom */
.td-no {
  color: var(--muted);
  font-family: var(--mono);
  font-size: 12px;
  width: 48px;
  text-align: center;
}

/* Nama dengan avatar */
.nama-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #7C3AED);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* NIK dengan tombol salin */
.nik-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nik-text {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  letter-spacing: 0.5px;
}
.btn-salin-nik {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  color: var(--accent);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.btn-salin-nik:hover {
  background: var(--accent);
  color: #fff;
}

/* Aksi */
.aksi-group  { display: flex; gap: 6px; }
.input-inline { padding: 6px 10px; font-size: 12px; }

/* Footer */
.tabel-footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--muted);
  background: #F8FAFF;
}

/* Kosong */
.kosong {
  text-align: center;
  padding: 56px 20px;
  color: var(--muted);
}
.kosong-icon { font-size: 40px; margin-bottom: 12px; }
.kosong p    { font-size: 13px; }
</style>