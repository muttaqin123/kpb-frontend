<template>
  <q-page padding>
    <q-table
      title="Master Harga"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      flat
    >
      <template v-slot:top-right>
                <q-btn  v-if="show_filter" outline  label="Tambah Harga" @click="openDialog(false, null)" />
                <q-space style="padding-right: 10px" />
        <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
      </template>
      <template v-slot:body-cell-harga="props">
        <q-td :props="props">
          {{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(props.row.harga)}}
        </q-td>
      </template>
      <template v-slot:body-cell-aksi="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn outline color="blue" size="sm" @click="openDialog(true, props.row)" icon="receipt_long"> Ubah</q-btn>
<!--            <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>-->
          </div>
        </q-td>
      </template>

    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width: 50%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Form Harga</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <q-form @submit="onSubmit">
            <q-card-section>
              <div class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input type="number" v-model="form.harga" :rules="[val => val !== null || 'Mohon Isi']" label="Harga"/>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-select  :options="optionsMaster"   class="full-width" v-model="form.satuan_harga"  label="Pilih Satuan Harga"/>
                  </q-item-section>
                </q-item>
              </div>
            </q-card-section>
            <q-card-section>
              <q-item>
                <q-btn style="background-color: slategray;" type="submit" icon="done_all" class="text-capitalize  text-white"> &nbsp; Simpan</q-btn>
              </q-item>
            </q-card-section>
          </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
// import { parseProfile } from '../../boot/Profile'
// const profile = parseProfile()
const model = () => {
  return {
    satuan_harga: null,
    harga: null
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
        { name: 'satuan_harga', align: 'left', label: 'Satuan Harga', field: 'satuan_harga' },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      filter: '',
      show_filter: false,
      idharga: null,
      optionsMaster: [
        'Jam', 'Hari', 'Hektar', 'Musim'
      ]
    }
  },
  methods: {
    openDialog (mode, data) {
      this.editMode = mode
      this.dialog = true
      if (this.editMode === true) {
        this.form.harga = data.harga
        this.form.satuan_harga = data.satuan_harga
        this.idharga = data.id_harga
      }
    },
    ToKatalog (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'isigudang', params: { idgudang: ids } })
    },
    getMasterHarga () {
      this.$showLoading()
      this.$axios.get('alsintan/master-harga/getAll', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.editMode === false) {
        try {
          this.$showLoading()
          this.$axios.post('alsintan/master-harga/create/', this.form, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              if (this.$parseResponse(res.data)) {
                this.getMasterHarga()
              }
            })
            .catch(() => this.$commonErrorNotif())
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          this.$showLoading()
          this.$axios.put(`alsintan/master-harga/update/${this.idharga}`, this.form, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              if (this.$parseResponse(res.data)) {
                this.getMasterHarga()
              }
            })
            .catch(() => this.$commonErrorNotif())
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  created () {
    this.getMasterHarga()
  }
}
</script>
<style scoped>

</style>
