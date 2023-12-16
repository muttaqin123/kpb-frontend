// Index poktan
<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-input
              v-model="filter"
              label="Cari Nama / NIK"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-provinsi withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kabupaten withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-kecamatan withAction :action="getData"/>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <area-desa withAction :action="getData"/>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-table
      title="Data Ketua Poktan"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      flat
      row-key="nik_poktan"
      :loading="loading"
      @request="onRequest"
      :pagination="pagination"
      v-model:pagination="pagination"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Role"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik_poktan" :props="props">
            {{ props.row.nik_poktan }}
          </q-td>
          <q-td key="nama_poktan" :props="props">
            {{ props.row.nama_poktan }}
          </q-td>
          <q-td key="sektor" :props="props">
            {{ props.row.sektor }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit Nama Poktan" no-caps @click="popup(true, props.row)" color="info" unelevated/>
              <q-btn label="Edit NIK Ketua" no-caps @click="popup(false, props.row)" color="warning" unelevated/>
              <q-btn label="Lihat Anggota Poktan" no-caps @click="this.$router.push({name: 'detailPoktanSuperAdmin', params: {nik: props.row.nik_poktan, nama: props.row.nama_poktan} })" color="positive" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="persistent" transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-primary" style="width: 400px">

        <q-card-section>
          <div class="row">
            <div class="text-h6"> {{ this.dataPopup.isEdit ? 'Edit Nama Poktan' : 'Edit Ketua Poktan' }} </div>
            <q-space/>
            <!-- <q-btn flat v-close-popup round dense icon="close" /> -->
          </div>
          <div class="q-pa-sm column">
            <q-form @submit="updateProfile">
              <q-input
                v-if="dataPopup.isEdit"
                v-model="dataPopup.data.nama_poktan" label="Nama Poktan"
                :rules="$defaultValidation"/>
              <q-input
                v-else
                v-model="dataPopup.data.nik_poktan" label="Nik Poktan"
                :rules="$defaultValidation"/>
                <q-btn
                  label="Batal"
                  outline
                  v-close-popup
                  class="q-mr-sm"
                />
                <q-btn
                  label="Perbaharui Data"
                  unelevated
                  color="primary"
                  type="submit"
                />
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import parseArea from '../../../helper/ParseArea'
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik_poktan', align: 'left', label: 'NIK', field: 'nik_poktan' },
        { name: 'nama_poktan', align: 'left', label: 'Nama Poktan', field: 'nama_poktan' },
        { name: 'sektor', align: 'left', label: 'Sektor', field: 'sektor' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      filter: '',
      persistent: false,
      dataPopup: {
        data: [],
        isEdit: false
      },
      pagination: {
        sortBy: 'nik_poktan',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.$resetArea()
    this.getData()
  },
  methods: {
    parseArea,
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: this.filter
      })
    },
    popup (isEdit, data) {
      this.dataPopup.data = data
      this.dataPopup.isEdit = isEdit
      this.persistent = true
    },
    reset () {
      this.dataPopup.data = []
      this.dataPopup.isEdit = false
      this.persistent = false
    },
    updateProfile () {
      this.$showLoading()
      this.$axios.put('/master/update-poktan', {
        data: this.dataPopup.data
      }, this.$createToken()).finally(() => { this.$hide() })
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.reset()
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onRequest (props) {
      this.loading = true
      const params = {
        prov: this.$store.state.area.provinsi ? this.$store.state.area.provinsi.id : '',
        kab: this.$store.state.area.kabupaten ? this.$store.state.area.kabupaten.id : '',
        kec: this.$store.state.area.kecamatan ? this.$store.state.area.kecamatan.id : '',
        desa: this.$store.state.area.desa ? this.$store.state.area.desa.id : ''
      }
      this.$axios.get('/master/ketua-poktan', this.$createPaginate(props, params))
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
