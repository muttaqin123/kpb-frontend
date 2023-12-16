<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Report Laporan Permohonan</span>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-md row">

            <q-select style="width: 29%" outlined v-model="permohonan_status_pinjam" :options="dataStatus" label="Status" option-value="id"  option-label="log_dtl_status" />
            <q-input outlined v-model="tanggalmulai"  style="width: 29%" mask="date" :rules="['tanggalmulai']" label="Dari Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="tanggalmulai">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input outlined v-model="tanggalakhir"  style="width: 29%" mask="date" :rules="['tanggalakhir']" label="Sampai Tanggal">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="tanggalakhir">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div>
              <q-btn size="md" outline style="height: 57px" @click="getPengajuan()" label="Pilih" type="button" color="primary"/>
            </div>

          </div>
        </div>
      </q-card-section>
    </q-card>
    <br />
    <q-card flat v-if="showdata">
      <q-table
        :rows="rows3"
        :columns="columns"
        row-key="name"
        :filter="filter3"
        flat
      >
        <template v-slot:top-right>
          <q-space style="padding: 5px" />
          <q-btn
            v-if="show_filter"
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
          <q-space style="padding-right: 10px" />
          <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter3" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
        </template>

        <template v-slot:body-cell-nama="props">
          <q-td :props="props">
            {{props.row.member_detail.nama}}<br />{{props.row.member_detail.kecamatan+' '+props.row.member_detail.kabupaten}}
          </q-td>
        </template>

        <template v-slot:body-cell-mm="props">
          <q-td :props="props">
            {{props.row.barang_detail.mm_nama +' - '+props.row.barang_detail.mm_merk}}
          </q-td>
        </template>

        <template v-slot:body-cell-permohonan_tgl_pinjam="props">
          <q-td :props="props">
            {{$parseDate(props.row.permohonan_tgl_pinjam).fullDate}}
          </q-td>
        </template>

        <template v-slot:body-cell-permohonan_tgl_kembali="props">
          <q-td :props="props">
            {{$parseDate(props.row.permohonan_tgl_kembali).fullDate}}
          </q-td>
        </template>

        <template v-slot:body-cell-aksi="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../boot/Profile'
const profile = parseProfile()
import { exportFile } from 'quasar'

export default {
  data () {
    return {
      tabhistory: 'now',
      rows3: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama Peminjam', field: 'nama' },
        { name: 'mm', align: 'left', label: 'Barang / SN', field: 'mm' },
        { name: 'permohonan_alamat', align: 'left', label: 'Lokasi Pengiriman', field: 'permohonan_alamat' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      filter3: '',
      show_filter: true,
      showdata: false,
      tanggalmulai: '',
      tanggalakhir: '',
      permohonan_status_pinjam: null,
      dataStatus: [{
        id: null,
        log_dtl_status: null
      }]
    }
  },
  methods: {
    tanggal () {
      const date = new Date()
      const day = date.getDate()
      const yy = date.getYear()
      const year = (yy < 1000) ? yy + 1900 : yy

      const xb = date.getMonth() + 1
      let bulan
      if (xb > 9) {
        bulan = xb
      } else {
        bulan = '0' + xb
      }

      this.tanggalmulai = year + '/' + bulan + '/' + '1'
      this.tanggalakhir = year + '/' + bulan + '/' + day
    },
    getPengajuan () {
      this.showdata = true
      this.$showLoading()
      this.$axios.post(`alsintan/transaksi/brigade/rekaplaporan/${profile.member.id_member}`, {
        permohonan_status_pinjam: this.permohonan_status_pinjam.id,
        tanggalmulai: this.tanggalmulai,
        tanggalakhir: this.tanggalakhir
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailPermohonan', params: { id: ids } })
    },
    getDataStatus () {
      this.$axios.get('alsintan/master-logtransaksi/getAll', this.$createToken())
        .then(res => {
          // console.log(res)
          this.dataStatus = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    exportTable () {
      // naive encoding to csv format
      const content = [
        'Nama Peminjam;Barang/ SN;Lokasi Pengiriman;Tanggal Peminjaman;Tanggal Pengembalian;Kontak Penerima;Keterangan;Total Biaya; '
      ].concat(
        this.rows3.map(row => {
          return `${row.member_detail.nama};${row.barang_detail.mm_nama};${row.permohonan_alamat};${row.permohonan_tgl_pinjam};${row.permohonan_tgl_kembali};${row.permohonan_kontak_penerima};${row.feedback_brigade};${row.harga_total};`
        })
      ).join('\r\n')
      const status = exportFile(
        'Rekap Data Transaksi Alsintan.csv',
        content,
        'text/csv'
      )
      if (status !== true) {
        this.$commonErrorNotif()
      }
    }
  },
  created () {
    // this.getPengajuan()
    this.getDataStatus()
    this.tanggal()
  }
}
</script>

<style scoped>

</style>
