<template>
  <q-page padding>
    <div class="row q-gutter-sm justify-between border bg-white">
      <div class="col-xs-12 col-sm-12 col-lg-7 column q-pa-md">
        <div class="row items-center">
          <q-img src="img/sertif_benih/logo_lampung.png" :width="this.$q.screen.xs ? '50px' :'80px'"/>
          <div class="column q-ml-md text-black">
            <span class="text-weight-bold text-h4">Dinas Perkebunan</span>
            <span class="text-weight-reguler text-h5">Provinsi Lampung</span>
          </div>
        </div>
        <span class="text-weight-bold text-h4 q-mt-sm">Pengawasan dan sertifikasi benih Komoditi Perkebunan</span>
        <span class="text-weight-regular q-mt-sm text-h6">Proses verifikasi perbanyakan, pengembangan, dan distribusi benih sesuai dengan aturan yang ditetapkan oleh Departemen Pertanian untuk distribusi dikenal sebagai sertifikasi benih.</span>
      </div>
      <div class="col-4 q-pa-sm">
        <q-img v-if="!this.$q.screen.xs" src="img/sertif_benih/bppmb.png"/>
      </div>
    </div>
    <div class="border bg-white q-my-md">
      <div class="text-green-10 text-h4 text-center text-weight-bold q-my-sm">Pengajuan Benih</div>
      <q-tabs
        v-model="tab"
        class="bg-green-10 text-white q-pa-xs"
        active-color="yellow-10"
        indicator-color="yellow-10"
        align="left"
        narrow-indicator
      >
        <q-tab name="berkas_masuk" label="Berkas Masuk" no-caps />
        <q-tab name="verif_lokasi" label="Verifikasi Lokasi" no-caps />
        <q-tab name="verif_laboratorium" label="Verifikasi Laboratorium" no-caps />
        <q-tab name="sertifikat" label="Pengeluaran Sertifikasi" no-caps />
        <q-tab name="berkas_tolak" label="Berkas Tolak" no-caps />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        class="q-mt-md"
        style="border-radius: 10px"
        v-model="tab"
        animated
        transition-prev="jump-up"
        transition-next="jump-down">
        <q-tab-panel name="berkas_masuk">
          <q-table
            flat
            :rows="berkasMasuk"
            :columns="columns"
            row-key="nama"
            :loading="loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="aksi" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn :to="{name: 'detailSertifikasiBenihBPPMB', params: {id: props.row.id} }" label="Tinjau Berkas" no-caps color="primary" icon="assignment_turned_in"/>
                  </div>
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
                  <q-badge v-if="props.row.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
                  <q-badge v-if="props.row.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
                  <q-badge v-if="props.row.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
                  <q-badge v-if="props.row.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.ktp.nama }}
                </q-td>
                <q-td key="noTelp" :props="props">
                  {{ props.row.ktp.member.no_hp ?? '-' }}
                </q-td>
                <q-td key="jenis_benih" :props="props">
                  {{ props.row.jenis_benih }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="verif_lokasi">
          <q-table
            flat
            :rows="verifikasiLokasi"
            :columns="columns"
            row-key="nama"
            :loading="loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="aksi" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn :to="{name: 'detailSertifikasiBenihBPPMB', params: {id: props.row.id} }" label="Tinjau Berkas" no-caps color="primary" icon="assignment_turned_in"/>
                  </div>
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
                  <q-badge v-if="props.row.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
                  <q-badge v-if="props.row.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
                  <q-badge v-if="props.row.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
                  <q-badge v-if="props.row.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.ktp.nama }}
                </q-td>
                <q-td key="noTelp" :props="props">
                  {{ props.row.ktp.member.no_hp ?? '-' }}
                </q-td>
                <q-td key="jenis_benih" :props="props">
                  {{ props.row.jenis_benih }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="verif_laboratorium">
          <q-table
            flat
            :rows="verifikasiLab"
            :columns="columns"
            row-key="nama"
            :loading="loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="aksi" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn :to="{name: 'detailSertifikasiBenihBPPMB', params: {id: props.row.id} }" label="Tinjau Berkas" no-caps color="primary" icon="assignment_turned_in"/>
                  </div>
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
                  <q-badge v-if="props.row.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
                  <q-badge v-if="props.row.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
                  <q-badge v-if="props.row.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
                  <q-badge v-if="props.row.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.ktp.nama }}
                </q-td>
                <q-td key="noTelp" :props="props">
                  {{ props.row.ktp.member.no_hp ?? '-' }}
                </q-td>
                <q-td key="jenis_benih" :props="props">
                  {{ props.row.jenis_benih }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="sertifikat">
          <q-table
            flat
            :rows="sertifikasi"
            :columns="columns"
            row-key="nama"
            :loading="loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="aksi" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn :to="{name: 'detailSertifikasiBenihBPPMB', params: {id: props.row.id} }" label="Tinjau Berkas" no-caps color="primary" icon="assignment_turned_in"/>
                  </div>
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
                  <q-badge v-if="props.row.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
                  <q-badge v-if="props.row.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
                  <q-badge v-if="props.row.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
                  <q-badge v-if="props.row.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.ktp.nama }}
                </q-td>
                <q-td key="noTelp" :props="props">
                  {{ props.row.ktp.member.no_hp ?? '-' }}
                </q-td>
                <q-td key="jenis_benih" :props="props">
                  {{ props.row.jenis_benih }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="berkas_tolak">
          <q-table
            flat
            :rows="tolak"
            :columns="columns"
            row-key="nama"
            :loading="loading"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="aksi" :props="props">
                  <div class="justify-center q-gutter-x-xs">
                    <q-btn :to="{name: 'detailSertifikasiBenihBPPMB', params: {id: props.row.id} }" label="Tinjau Berkas" no-caps color="primary" icon="assignment_turned_in"/>
                  </div>
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status == 0" class="q-pa-sm" color="yellow-8" label="Sedang Diverifikasi" />
                  <q-badge v-if="props.row.status == 1" class="q-pa-sm" color="blue-8" label="Pengujian Lapangan" />
                  <q-badge v-if="props.row.status == 2" class="q-pa-sm" color="info" label="Pengujian Laboratorium" />
                  <q-badge v-if="props.row.status == 3" class="q-pa-sm" color="positive" label="Sertifikasi Berhasil" />
                  <q-badge v-if="props.row.status == 5" class="q-pa-sm" color="negative" label="Ditolak" />
                </q-td>
                <q-td key="nama" :props="props">
                  {{ props.row.ktp.nama }}
                </q-td>
                <q-td key="noTelp" :props="props">
                  {{ props.row.ktp.member.no_hp ?? '-' }}
                </q-td>
                <q-td key="jenis_benih" :props="props">
                  {{ props.row.jenis_benih }}
                </q-td>
                <q-td key="alamat" :props="props">
                  {{ props.row.alamat }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      tab: 'berkas_masuk',
      berkasMasuk: [],
      verifikasiLokasi: [],
      verifikasiLab: [],
      sertifikasi: [],
      tolak: [],
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' },
        { name: 'status', align: 'left', label: 'Status Pengajuan', field: 'status' },
        { name: 'nama', align: 'left', label: 'Nama Pemohon', field: 'nama' },
        { name: 'noTelp', align: 'left', label: 'No Telp', field: 'noTelp' },
        { name: 'jenis_benih', align: 'left', label: 'Jenis Benih', field: 'jenis_benih' },
        { name: 'alamat', align: 'left', label: 'Alamat Pemohon', field: 'alamat' }
      ],
      dialog: false
    }
  },
  created () {
    this.getData()
    // this.getPabrik()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('sertif/getListSertifikasiBenih')
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.status) {
            const data = res.data.result
            for (const d of data) {
              if (d.status === 0) {
                this.berkasMasuk.push(d)
              } else if (d.status === 1 || d.status === 4) {
                this.verifikasiLokasi.push(d)
              } else if (d.status === 2) {
                this.verifikasiLab.push(d)
              } else if (d.status === 3) {
                this.sertifikasi.push(d)
              } else {
                this.tolak.push(d)
              }
            }
            this.$notif(res.data.message, 'positive')
          }
        }).catch(() => {
          this.$commonErrorNotif()
        })
    }
  }
}
</script>
