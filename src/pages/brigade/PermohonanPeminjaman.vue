<template>
  <q-page>
    <div class="q-pb-lg q-pl-md q-pr-md q-pt-sm">
      <q-table
        title="Permohonan Peminjaman Baru"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        flat
      >
        <template v-slot:top-right>
          <q-space style="padding-right: 10px" />
          <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge outline :color="props.row.permohonan_status_pinjam === 1 ? 'primary' : 'purple'" :label="props.row.permohonan_status_pinjam === 1 ? 'Mohon Ditinjau' : 'Dalam Proses Pengiriman'" />
          </q-td>
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
    </div>
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'PermohonanPeminjaman',
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama Peminjam', field: 'nama' },
        { name: 'mm', align: 'left', label: 'Barang / SN', field: 'mm' },
        { name: 'permohonan_alamat', align: 'left', label: 'Lokasi Pengiriman', field: 'permohonan_alamat' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'status', align: 'center', label: 'Status Permohonan', field: 'status' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      filter: '',
      show_filter: false,
      slide: ref(1)
    }
  },
  props: {
    icon_position: {
      required: false,
      default: 'left'
    }
  },
  methods: {
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailPermohonan', params: { id: ids } })
    },
    getPengajuan () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/pengajuan/${profile.member.id_member}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getPengajuan()
  }
})
</script>
