<template>
  <q-page class="q-pa-sm" style="padding-left: 10px; padding-right: 10px">
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Data Transaksi Bahan Baku</strong>
    </q-banner>
    <br />
    <q-card flat>
      <div class="row">
        <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-select
            class="full-width"
            v-model="formFilter.status"
            :options="optionsStatusTransaksi"
            label="Status Transaksi"
            option-value="label"
            option-id="kode"
          />
        </q-item>
        <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input class="full-width" label="Dari Tanggal" v-model="formFilter.tanggalDari" mask="date" :rules="['tanggalDari']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formFilter.tanggalDari">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item>
        <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-input class="full-width" label="Sampai Tanggal" v-model="formFilter.tanggalSampai" mask="date" :rules="['tanggalSampai']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formFilter.tanggalSampai">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item>
      </div>
        <div style="padding: 10px" class="row">
          <div class="col-md-6">
              <q-btn style="width: 100%"
                     outline
                     @click="getTransaksi"
                     label="Tampilkan Data"
                     type="submit"
                     color="teal"
              />
          </div>
          <div class="col-md-6">
              <q-btn style="width: 100%"
                     outline
                     @click="resetData"
                     label="Reset Filter"
                     type="submit"
                     color="orange"
              />
          </div>
        </div>
    </q-card><br />
    <q-card flat  v-if="showData">
      <q-card-section>
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          :rows="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :pagination="pagination"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-produk="props">
            <q-td :props="props">
              <table>
                <tbody>
                <tr>
                  <td><b>Kategori</b></td>
                  <td><b>Produk</b></td>
                  <td><b>Quantity</b></td>
                  <td><b>Harga</b></td>
                  <td><b>Total</b></td>
                </tr>
                <tr v-for="(a, i) in props.row.order_mm_jelabat" :key="i">
                  <td>{{a.material_master.child_dtl_kategori.child_dtlk_nama}}</td>
                  <td>{{a.material_master.mm_nama}}</td>
                  <td>{{a.quantity}}</td>
                  <td>{{$convertRupiah(a.harga_riwayat_jelabat.harga)}}</td>
                  <td><b>{{$convertRupiah(a.harga_riwayat_jelabat.harga * a.quantity)}}</b></td>
                </tr>
                </tbody>
              </table>
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
             {{props.row.order_status_sijelabat.nama_status}}
            </q-td>
          </template>
          <template v-slot:body-cell-tanggal_transaksi="props">
            <q-td :props="props">
              {{$parseDate(props.row.created_at).fullDate}}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="blue" size="sm" @click="toDetail(props.row.order_id)" icon="view_timeline"> Detail Transaksi</q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      optionsStatusTransaksi: [
        { kode: [1, 2, 3, 4, 5, 6, 7], label: 'Sedang Berjalan' }, { kode: [9], label: 'Selesai' }, { kode: [9], label: 'Dibatalkan' },
        { kode: [1, 2, 3, 4, 5, 6, 7, 8, 9], label: 'Semua' }
      ],
      formFilter: {
        tanggalDari: null,
        tanggalSampai: null,
        role: 'PUBB',
        status: null
      },
      columns: [
        {
          name: 'tanggal_transaksi',
          align: 'left',
          label: 'Tanggal Transaksi',
          field: 'tanggal_transaksi',
          sortable: true
        },
        { name: 'nomor_transaksi', required: true, label: 'ID Transkasi', align: 'left', field: 'nomor_transaksi', sortable: true },
        { name: 'pembeli', required: true, label: 'Nama Pemesan', align: 'left', field: 'pembeli', sortable: true },
        { name: 'produk', required: true, label: 'Rincian Produk', align: 'left', field: 'produk', sortable: true },
        { name: 'status', required: true, label: 'Keterangan', align: 'left', field: 'status', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: [],
      showData: false
    }
  },
  methods: {
    getTransaksi () {
      if (this.formFilter.status === null || this.formFilter.tanggalDari === null || this.formFilter.tanggalSampai === null) {
        this.$notif('Mohon Isi Semua Form Filter', 'negative')
        this.formFilter.status = null
        this.formFilter.role = null
      } else {
        this.formFilter.status = this.formFilter.status.kode
        this.$showLoading()
        this.$axios.put(`sijelabat/universal/laporan-transaksi/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.formFilter, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (res.data.code === 507) {
              this.$notif(res.data.message, 'negative')
              this.$router.push({ name: 'sijelabatProfilUsahaBahanBaku' })
            } else {
              if (this.$parseResponse(res.data, true)) {
                this.showData = true
                this.formFilter.status = null
                this.formFilter.tanggalSampai = null
                this.formFilter.tanggalDari = null
                this.data = res.data.result
              }
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    resetData () {
      this.data = []
      this.formFilter.status = null
      this.formFilter.tanggalSampai = null
      this.formFilter.tanggalDari = null
      this.showData = false
    },
    toDetail (idorder) {
      const ids = btoa(idorder)
      this.$router.push({ name: 'sijelabatDetailTransaksiBahanBaku', params: { id: ids } })
    }
  },
  created () {
    // this.getTransaksi()
    // this.getSummary()
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
