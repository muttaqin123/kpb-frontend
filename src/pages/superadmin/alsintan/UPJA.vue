<template>
  <q-page padding>
    <q-table
      title="Data UPJA & Katalog"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-btn  v-if="show_filter" outline  label="Tambah UPJA" @click="openDialog(false, null)" />
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
          <img :src="props.row.status">
        </q-td>
      </template>

      <template v-slot:body-cell-aksi="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn outline color="teal" size="sm" @click="ToKatalog(7)" icon="shopping_cart"> Daftar Katalog</q-btn>
            <q-btn outline color="blue" size="sm" @click="openDialog(true, props.row)" icon="receipt_long"> Ubah</q-btn>
            <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>
          </div>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>
<script>
const model = () => {
  return {
    kategori: null,
    gambar: null,
    status: null
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
      rows: [
        {
          nama_upja: 'Konco Tani',
          domisili: 'Kabupaten Lampung Selatan',
          katalog: '12 Produk',
          status: 'alsintan/check.png'
        }
      ],
      columns: [
        { name: 'nama_upja', align: 'left', label: 'Nama UPJA', field: 'nama_upja' },
        { name: 'domisili', align: 'left', label: 'Domisili', field: 'domisili' },
        { name: 'katalog', align: 'left', label: 'Jumlah Katalog', field: 'katalog' },
        { name: 'status', align: 'center', label: 'Status Aktif', field: 'status' },
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
      this.$router.push({ name: 'manajemenUPJAKatalogAlsintanSuperAdmin', params: { id: ids } })
    }
  }
}
</script>
<style scoped>

</style>
