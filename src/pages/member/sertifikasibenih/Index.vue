<template>
  <q-page padding>
    <div class="q-ma-xs q-pa-sm bg-white text-green-10" style="border-radius: 10px">
      <div class="row items-center q-mb-md">
        <div class="col-md-10 col-sm-12 q-pa-sm">
          <div class="text-h5">Riwayat Pengajuan</div>
          <div>Pengajuan - pengajuan yang sudah pernah diajukan akan ditampilkan pada table</div>
        </div>
        <div class="col-md-2 col-sm-12 col-xs-12">
          <q-select
            v-model="status"
            :options="options"
            option-label="label"
            option-value="value"
            label="Pilih Status"
            @update:model-value="getStat"
            outlined
            clearable
          />
        </div>
      </div>
      <div
        v-for="(row,i) in rows"
        :key="i"
        class="q-pa-md border-shadow q-ma-sm">
        <div class="row items-center text-green-10">
          <div class="col-1 q-mr-md flex flex-center">
            <q-img src="img/sertif_benih/icon_sertif.png" style="width: 80%" />
          </div>
          <div class="col q-gutter-xs">
            <div class="row items-center q-gutter-sm">
              <span class="text-weight-medium col">Sertifikasi Siap Salur</span>
              <q-badge v-if="row.status == 0" class="q-pa-sm col flex flex-center" color="yellow-8" label="Sedang Diverifikasi" />
              <q-badge v-if="row.status == 1" class="q-pa-sm col flex flex-center" color="blue-8" label="Pengujian Lapangan" />
              <q-badge v-if="row.status == 2" class="q-pa-sm col flex flex-center" color="info" label="Pengujian Laboratorium" />
              <q-badge v-if="row.status == 3" class="q-pa-sm col flex flex-center" color="positive" label="Sertifikasi Berhasil" />
              <q-badge v-if="row.status == 5" class="q-pa-sm col flex flex-center" color="negative" label="Ditolak" />
            </div>
            <div class="text-h5 text-weight-bold">Pengajuan Sertifikasi {{ row.jenis_benih }}</div>
            <!-- <div class="">28 Februari 2023 | 09:03</div> -->
            <!-- <div class="">{{ row.sertifikat }}</div> -->
            <div class="">{{ this.$parseDate(row.tanggal_awal).timeCustom }}</div>
          </div>
          <div class="col-xs-12 col-md-6 q-mt-sm">
            <div class="row q-gutter-sm justify-end">
              <q-btn
                v-if="row.status == 3"
                type="a"
                target="_blank"
                :href="`${$baseURL}file-sertif/${row.sertifikat}`"
                label="Unduh Sertifikat"
                color="yellow-8"
                padding="xs xl"
                rounded
                no-caps />
              <q-btn
                v-if="row.status == 5"
                type="a"
                target="_blank"
                :href="`${$baseURL}file-sertif/${row.keterangan_error}`"
                label="Keterangan"
                color="blue-8"
                padding="xs xl"
                rounded
                no-caps />
              <q-btn :to="{ name: 'detailSertifikasi', params: { id: row.id } } " label="Detail" color="green-10" padding="xs xl" rounded no-caps/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      original: [],
      status: null,
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'tanggal', align: 'left', label: 'Tanggal', field: 'tanggal' },
        { name: 'status', align: 'left', label: 'Status Pengajuan', field: 'status' },
        { name: 'jenisBenih', align: 'left', label: 'Jenis Benih', field: 'jenisBenih' },
        { name: 'alamatLengkap', align: 'left', label: 'Alamat Lengkap', field: 'alamatLengkap' }
      ],
      options: [
        {
          label: 'Semua',
          value: 6
        },
        {
          label: 'Berkas Masuk',
          value: 0
        },
        {
          label: 'Verifikasi Lapangan',
          value: 1
        },
        {
          label: 'Verifikasi Laboratorium',
          value: 2
        },
        {
          label: 'Sertifikasi Berhasil',
          value: 3
        },
        {
          label: 'Berkas Gagal',
          value: 5
        }
      ],
      loading: false,
      dialog: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getStat () {
      this.rows = []
      this.$showLoading()
      if (this.status.value === 6) {
        this.rows = this.original
      } else {
        const data = this.original
        for (const d of data) {
          if (d.status.value === 4 || d.status.value === 1) {
            if (d.status === 4 || d.status === 1) {
              this.rows.push(d)
            }
          } else if (d.status === this.status.value) {
            this.rows.push(d)
          }
        }
      }
      this.$hide()
    },
    getData () {
      this.$showLoading()
      this.$axios.get(`sertif/getListSertifikasiBenihByNik/${this.$getProfile().nik}`)
        .finally(() => this.$hide())
        .then((res) => {
          this.rows = this.original = res.data.result
          // console.log(this.original)
        })
        .catch(() => this.$commonErrorNotif())
    },
    download (fileDownload) {
      this.$axios.get(`${this.$baseURL}file-sertif/${fileDownload}`)
    }
  }
}
</script>
