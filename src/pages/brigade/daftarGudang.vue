<template>
  <q-page padding>
    <q-table
      title="Data Gudang"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      flat
    >
      <template v-slot:top-right>
<!--        <q-btn  v-if="show_filter" outline  label="Tambah Gudang" @click="openDialog(false, null)" />-->
<!--        <q-space style="padding-right: 10px" />-->
        <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
      </template>
      <template v-slot:body-cell-gudang_status="props">
        <q-td :props="props">
          <img :src="props.row.gudang_status === true ? 'alsintan/check.png' :  'alsintan/cancel.png'">
        </q-td>
      </template>

      <template v-slot:body-cell-aksi="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn outline color="teal" size="sm" @click="ToKatalog(props.row.gudang_id)" icon="shopping_cart"> Daftar Master Barang</q-btn>
<!--            <q-btn outline color="blue" size="sm" @click="openDialog(true, props.row)" icon="receipt_long"> Ubah</q-btn>-->
<!--            <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>-->
          </div>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>
<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
const model = () => {
  return {
    gudang_nama: null,
    gudang_lokasi: null,
    gudang_desa: null,
    gudang_jenis: null,
    gudang_status: null
  }
}
export default {
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler (to, from) {
  //       document.title = to.meta.title || 'UPJA & Katalog - E-KPB'
  //     }
  //   }
  // },
  data () {
    return {
      rows: [],
      columns: [
        { name: 'gudang_nama', align: 'left', label: 'Nama Gudang', field: 'gudang_nama' },
        { name: 'gudang_lokasi', align: 'left', label: 'Lokasi Gudang', field: 'gudang_lokasi' },
        { name: 'gudang_jenis', align: 'left', label: 'Jenis Gudang', field: 'gudang_jenis' },
        { name: 'gudang_status', align: 'center', label: 'Status Gudang', field: 'gudang_status' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      filter: '',
      show_filter: false,
      optionsMaster: [
        'Aktif', 'Tidak Aktif'
      ]
    }
  },
  methods: {
    openDialog (mode, data) {
      this.editMode = mode
      this.dialog = true
    },
    ToKatalog (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'isigudang', params: { idgudang: ids } })
    },
    getGudang () {
      this.$showLoading()
      this.$axios.get(`alsintan/gudang-master/member/${profile.member.id_member}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getGudang()
  }
}
</script>
<style scoped>

</style>
