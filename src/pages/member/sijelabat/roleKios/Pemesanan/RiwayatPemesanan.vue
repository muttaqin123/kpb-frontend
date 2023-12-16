<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Data Riwayat Pemesanan</strong>
    </q-banner>
    <br />
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
          <template v-slot:body-cell-penyedia="props">
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
    <div class="text-right" style="padding-top: 30px">
      <q-btn color="primary" @click="toPenyediaPemesanan" icon="shopping_cart_checkout"> Buat Pesanan Baru</q-btn>
    </div>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'PEMESANAN',
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
        { name: 'penyedia', required: true, label: 'Penyedia Bahan Baku', align: 'left', field: 'penyedia', sortable: true },
        { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getRiwayat () {
      this.$showLoading()
      this.$axios.get(`sijelabat/kios/riwayat-pemesanan/get/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}/${btoa(this.$route.params.idRole)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.code === 507) {
            this.$notif(res.data.message, 'negative')
            this.$router.push({ name: 'sijelabatProfilUsahakios' })
          } else {
            if (this.$parseResponse(res.data, false)) {
              this.data = res.data.result
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (idtr) {
      const ids = btoa(idtr)
      this.$router.push({ name: 'sijelabatDetailPemesanankios', params: { id: ids } })
    },
    toPenyediaPemesanan () {
      this.$router.push({ name: 'sijelabatTambahPemesanankios' })
    }
  },
  created () {
    this.getRiwayat()
  }
}
</script>

<style scoped>

</style>
