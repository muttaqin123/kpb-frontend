<template>
  <q-page class="q-pa-sm" style="padding-left: 10px; padding-right: 10px">
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Riwayat Pemsanan</strong>
    </q-banner>
    <br />
    <q-card flat>
      <div class="q-pa-xs q-gutter-xs">
        <q-btn
          @click="getTransaksi([1])"
          outline
          padding="lg"
          color="purple"
          icon="fact_check"
          :label="'Verifikasi Pemesanan ('+dataSummary.verifPemesanan+')'"
        />
        <q-btn
          @click="getTransaksi([3, 4])"
          outline
          padding="lg"
          color="orange"
          icon="currency_exchange"
          :label="'Verifikasi Pembayaran ('+dataSummary.verifPembayaran+')'"
        />
        <q-btn
          @click="getTransaksi([6, 7])"
          outline
          padding="lg"
          color="blue"
          icon="local_shipping"
          :label="'Pengiriman ('+dataSummary.pengiriman+')'"
        />
        <q-btn
          @click="getTransaksi([8])"
          outline
          padding="lg"
          color="teal"
          icon="done_all"
          :label="'Selesai ('+dataSummary.selesai+')'"
        />
        <q-btn
          @click="getTransaksi([9])"
          outline
          padding="lg"
          color="red"
          icon="remove_shopping_cart"
          :label="'Dibatalkan ('+dataSummary.dibatalkan+')'"
        />
      </div>
    </q-card><br />
    <q-card flat>
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
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge outline color="primary" :label="props.row.order_status_sijelabat.nama_status" />
            </q-td>
          </template>
          <template v-slot:body-cell-kios="props">
            <q-td :props="props">
             {{props.row.profil_usaha.nama_usaha}}
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
      columns: [
        {
          name: 'tanggal_transaksi',
          align: 'left',
          label: 'Tanggal Transaksi',
          field: 'tanggal_transaksi',
          sortable: true
        },
        { name: 'nomor_transaksi', required: true, label: 'ID Transkasi', align: 'left', field: 'nomor_transaksi', sortable: true },
        { name: 'kios', required: true, label: 'KIOS', align: 'left', field: 'kios', sortable: true },
        { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: [],
      dataSummary: []
    }
  },
  methods: {
    getSummary () {
      this.$axios.get(`sijelabat/pembudi-daya/pemesanan/summary/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .then(res => {
          this.dataSummary = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getTransaksi (status) {
      let data
      if (status !== undefined) {
        data = status
      } else {
        data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
      this.$showLoading()
      this.$axios.put(`sijelabat/pembudi-daya/pemesanan/show/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`,
        {
          status: data
        }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (idorder) {
      const ids = btoa(idorder)
      this.$router.push({ name: 'sijelabatDetailRiwayatPemesananPembudidaya', params: { id: ids } })
    }
  },
  created () {
    this.getTransaksi()
    this.getSummary()
  }
}
</script>

<style scoped>

</style>
