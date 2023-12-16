<template>
  <q-page padding>
    <q-table
      title="Data Realisasi Sertifikasi Benih"
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
      :loading="loading"
    >
      <template v-slot:top-right>
        <!-- <q-btn
          label="Tambah Saprotan"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        /> -->
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="alamat" :props="props">
            {{ props.row.alamat }}
          </q-td>
          <q-td key="noTelp" :props="props">
            {{ props.row.noTelp }}
          </q-td>
          <q-td key="lokasiKebun" :props="props">
            <q-btn
              type="a"
              label="Lihat Lokasi"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="suratPermohonan" :props="props">
            <q-btn
              type="a"
              label="Lihat File"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="iup" :props="props">
            <q-btn
              type="a"
              label="Lihat File"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="suratAsalUsul" :props="props">
            <q-btn
              type="a"
              label="Lihat File"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="dokumenPendukung" :props="props">
            <q-btn
              type="a"
              label="Lihat File"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="suratPAD" :props="props">
            <q-btn
              type="a"
              label="Lihat File"
              color="primary"
              outline
            />
          </q-td>
          <q-td key="suratPAD" :props="props">
            <q-badge color="positive" class="q-pa-sm">
              {{ props.row.label }}
            </q-badge>
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Verifikasi Pengajuan" v-if="(props.row.status === 1)" color="primary" unelevated/>
              <q-btn label="Verifikasi Kunjungan Lapangan" v-if="props.row.status === 2" color="primary" unelevated/>
              <q-btn label="Upload Sertifikat" v-if="props.row.status === 2" @click="dialog = !dialog" color="warning" unelevated/>
              <!-- <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <q-btn label="Hapus" unelevated color="negative" @click="hapusData(props.row.mm_id)"/> -->
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Upload Sertifikat</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-file
              dense
              v-model="fileSertifikat"
              label="File Sertifikat"
              :rules="[null]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama Pemohon', field: 'nama' },
        { name: 'alamat', align: 'left', label: 'Alamat Pemohon', field: 'alamat' },
        { name: 'noTelp', align: 'left', label: 'No Telp', field: 'noTelp' },
        { name: 'lokasiKebun', align: 'left', label: 'Lokasi Kebun', field: 'lokasiKebun' },
        { name: 'suratPermohonan', align: 'left', label: 'Surat Permohonan', field: 'suratPermohonan' },
        { name: 'iup', align: 'left', label: 'IUP', field: 'iup' },
        { name: 'suratAsalUsul', align: 'left', label: 'Surat Asal Usul Benih', field: 'suratAsalUsul' },
        { name: 'dokumenPendukung', align: 'left', label: 'Dokumen Pendukung Label Benih', field: 'dokumenPendukung' },
        { name: 'suratPAD', align: 'left', label: 'Surat Rekomendasi PAD', field: 'suratPAD' },
        { name: 'status', align: 'left', label: 'Status Pengajuan', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      fileSertifikat: null
    }
  },
  created () {
    this.rows = [
      // {
      //   id: 1,
      //   alamat: 'Jalan di bandar lampung',
      //   nama: 'Hariyanto',
      //   noTelp: '08123132434',
      //   status: 1,
      //   label: 'Menunggu Persetujuan'
      // },
      {
        id: 2,
        alamat: 'Desa Tanjung Raya Kec. Bangun Rejo, Lampung Tengah',
        nama: 'CV. Hikmah Tani',
        noTelp: '08123132434',
        status: 2,
        label: 'Disetujui Untuk Ditinjau'
      }
    ]
    // this.getData()
    // this.getPabrik()
  },
  methods: {
    onSubmit () {
      this.dialog = false
    },
    getData () {
      this.loading = true
      this.$axios.get(`master/barang-distri/${this.$getProfile().member.id_member}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    hapusData (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`master/barang-distri/${id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
