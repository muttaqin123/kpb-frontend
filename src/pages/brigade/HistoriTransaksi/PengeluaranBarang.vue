<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Riwayat Permohonan/ Transaksi Pengeluaran Barang</span>
      </q-card-section>
      <q-separator/>
      <q-table
        :rows="rows3"
        :columns="columns"
        row-key="name"
        :filter="filter3"
        flat
      >
        <template v-slot:top-right>
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
      show_filter: true
    }
  },
  methods: {
    getPengajuan () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/riwayat-pengajuan/${profile.member.id_member}/3`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailPermohonan', params: { id: ids } })
    }
  },
  created () {
    this.getPengajuan()
  }
}
</script>

<style scoped>

</style>
