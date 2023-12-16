<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <div class="q-pa-md column">
      <span class="text-h5 text-weight-bold">Review Pengguna</span>
      <span class="q-mt-sm">Seluruh ulasan yang diberikan oleh pemohon</span>
      <div class="row text-black q-mt-md">
        <div
          v-for="(d,i) in data"
          :key="i"
          class="col-md-6 col-sm-12 q-pa-sm" style="width: 100%">
          <div class="column q-pa-sm border-shadow flex flex-center items-center">
            <div class="text-h6 text-center">{{ d.label }}</div>
            <div class="row justify-evenly q-mt-sm full-width">
              <div class="col">
                <div class="column q-pa-sm flex flex-center items-center">
                  <span class="text-h6">{{ d.sangat_tidak_puas }}</span>
                  <span class="text-center">Sangat Tidak Puas</span>
                </div>
              </div>
              <div class="col">
                <div class="column q-pa-sm flex flex-center items-center">
                  <span class="text-h6">{{ d.tidak_puas }}</span>
                  <span class="text-center">Tidak Puas</span>
                </div>
              </div>
              <div class="col">
                <div class="column q-pa-sm flex flex-center items-center">
                  <span class="text-h6">{{ d.puas }}</span>
                  <span class="text-center">Puas</span>
                </div>
              </div>
              <div class="col">
                <div class="column q-pa-sm flex flex-center items-center">
                  <span class="text-h6">{{ d.sangat_puas }}</span>
                  <span class="text-center">Sangat puas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-between items-center q-mt-md">
        <div class="col-auto">
          <div class="text-center text-h5 text-weight-bold q-mt-md">Ulasan</div>
        </div>
        <div class="col-auto">
          <q-btn label="Export Data" no-caps @click="exportFile" color="green-10"/>
        </div>
      </div>
      <div class="q-mt-md">
        <template
          v-for="(d, i) in rows"
          :key="i">
          <!-- <span> {{ d }} </span> -->
          <div class="q-ma-xs q-pa-md border-shadow" style="width: 100%">
            <div class="row">
              <div class="col-md-11 col-sm-12 col-xs-12">
                <div class="column">
                  <span class="text-h5 text-weight-medium">{{ d?.okkpd_form_permohonan?.nama_pemohon }}</span>
                  <span class="text-weight-regular">{{ d?.okkpd_form_permohonan?.nama_perusahaan }} | {{ this.$parseDate(d?.tanggal_pengajuan).timeWithDay }}</span>
                </div>
              </div>
              <div :class="`col-md-1 col-sm-12 col-xs-12 ${this.$q.screen.xs || this.$q.screen.sm ? 'q-mt-sm' : 'flex flex-center' }`">
                <q-btn label="Detail" :to="{name: 'ratingKepuasanOkkpd', params: {idDetail: d?.id_berkas_permohonan, id: d?.id_form_penilaian}}" color="green-10" no-caps/>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      data: [
        {
          label: 'Layanan di Kantor OKKP-D Provinsi Lampung',
          sangat_tidak_puas: 0,
          tidak_puas: 0,
          puas: 0,
          sangat_puas: 0
        },
        {
          label: 'Layanan Pengambilan contoh di Lokasi',
          sangat_tidak_puas: 0,
          tidak_puas: 0,
          puas: 0,
          sangat_puas: 0
        },
        {
          label: 'Penanganan Hasil uji laboratorium ulang',
          sangat_tidak_puas: 0,
          tidak_puas: 0,
          puas: 0,
          sangat_puas: 0
        },
        {
          label: 'Ketepatan Waktu Pelaksanaan pelayanan sertifikasi',
          sangat_tidak_puas: 0,
          tidak_puas: 0,
          puas: 0,
          sangat_puas: 0
        }
      ]
    }
  },
  created () {
    this.getReview()
  },
  methods: {
    getReview () {
      this.$showLoading()
      this.$axios.get('okkpd/getReview', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          const data = res.data.result
          this.rows = data
          for (const i of data) {
            if (i.okkpd_form_penilaian.kantor !== null || i.okkpd_form_penilaian.kantor !== 'null') {
              if (i.okkpd_form_penilaian.kantor === 'Sangat Tidak Puas') {
                this.data[0].sangat_tidak_puas += 1
              } else if (i.okkpd_form_penilaian.kantor === 'Tidak Puas') {
                this.data[0].tidak_puas += 1
              } else if (i.okkpd_form_penilaian.kantor === 'Puas') {
                this.data[0].puas += 1
              } else if (i.okkpd_form_penilaian.kantor === 'Sangat Puas') {
                this.data[0].sangat_puas += 1
              }
            }
            if (i.okkpd_form_penilaian.ketepatan !== null || i.okkpd_form_penilaian.ketepatan !== 'null') {
              if (i.okkpd_form_penilaian.ketepatan === 'Sangat Tidak Puas') {
                this.data[3].sangat_tidak_puas += 1
              } else if (i.okkpd_form_penilaian.ketepatan === 'Tidak Puas') {
                this.data[3].tidak_puas += 1
              } else if (i.okkpd_form_penilaian.ketepatan === 'Puas') {
                this.data[3].puas += 1
              } else if (i.okkpd_form_penilaian.ketepatan === 'Sangat Puas') {
                this.data[3].sangat_puas += 1
              }
            }
            if (i.okkpd_form_penilaian.penanganan !== null || i.okkpd_form_penilaian.penanganan !== 'null') {
              if (i.okkpd_form_penilaian.penanganan === 'Sangat Tidak Puas') {
                this.data[2].sangat_tidak_puas += 1
              } else if (i.okkpd_form_penilaian.penanganan === 'Tidak Puas') {
                this.data[2].tidak_puas += 1
              } else if (i.okkpd_form_penilaian.penanganan === 'Puas') {
                this.data[2].puas += 1
              } else if (i.okkpd_form_penilaian.penanganan === 'Sangat Puas') {
                this.data[2].sangat_puas += 1
              }
            }
            if (i.okkpd_form_penilaian.pengambilan !== null || i.okkpd_form_penilaian.pengambilan !== 'null') {
              if (i.okkpd_form_penilaian.pengambilan === 'Sangat Tidak Puas') {
                this.data[1].sangat_tidak_puas += 1
              } else if (i.okkpd_form_penilaian.pengambilan === 'Tidak Puas') {
                this.data[1].tidak_puas += 1
              } else if (i.okkpd_form_penilaian.pengambilan === 'Puas') {
                this.data[1].puas += 1
              } else if (i.okkpd_form_penilaian.pengambilan === 'Sangat Puas') {
                this.data[1].sangat_puas += 1
              }
            }
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    exportFile () {
      const header = ['Nama PT', 'Nama Pemilik', 'Tanggal Pengajuan', 'Pelayanan di kantor', 'Pelayanan pengambilan contoh di lokasi', 'Penanganan hasil uji lab', 'Ketepatan waktu pelaksanaan', 'Review']
      const data = this.rows.map(row => [
        `${row.okkpd_form_permohonan.nama_perusahaan}`,
        `${row.okkpd_form_permohonan.nama_pemohon}`,
        row.tanggal_pengajuan === null ? '-' : this.$parseDate(row.tanggal_pengajuan).timeStap,
        `${row.okkpd_form_penilaian.kantor ?? '-'}`,
        `${row.okkpd_form_penilaian.pengambilan ?? '-'}`,
        `${row.okkpd_form_penilaian.penanganan ?? '-'}`,
        `${row.okkpd_form_penilaian.ketepatan ?? '-'}`,
        `${row.okkpd_form_penilaian.review ?? '-'}`
      ])

      const headerRow = header.join(';')
      const dataRows = data.map(row => row.join(';'))

      const csvData = [headerRow, ...dataRows].join('\n')

      this.$exportToCsv('DataReviewPengguna.csv', csvData)
    }
  }
}
</script>
