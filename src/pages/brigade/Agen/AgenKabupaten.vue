<template>
  <q-page padding>
    <q-table
      title="Data Agen"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      flat
    >
      <template v-slot:top-right>
                <q-btn  v-if="show_filter" outline  label="Tambah Agen" @click="$router.push({ name: 'formAgenkabupaten', params: { nik: 'MDA=' } })" />
                <q-space style="padding-right: 10px" />
        <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
      </template>
      <template v-slot:body-cell-aksi="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn outline color="teal" size="sm" @click="ToDetail(props.row.nik)" icon="receipt_long"> Detail Agen</q-btn>
            <!--            <q-btn outline color="blue" size="sm" @click="openDialog(true, props.row)" icon="receipt_long"> Ubah</q-btn>-->
            <!--            <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>-->
          </div>
        </q-td>
      </template>

    </q-table>
  </q-page>
</template>
<script>

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
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama Agen', field: 'nama' },
        { name: 'kabupaten', align: 'left', label: 'Kabupaten', field: 'kabupaten' },
        { name: 'desa', align: 'left', label: 'Desa', field: 'desa' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      filter: '',
      show_filter: false
    }
  },
  methods: {
    ToDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'formAgenkabupaten', params: { nik: ids } })
    },
    getAgen () {
      this.$showLoading()
      this.$axios.get('alsintan/agen', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getAgen()
  }
}
</script>
<style scoped>

</style>
