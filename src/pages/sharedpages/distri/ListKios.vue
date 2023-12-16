<template>
  <q-page padding>
    <q-table
      title="Data Kios Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="kode_kios"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Cari Kios">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          label="Tambah Kios"
          unelevated
          outline
          class="q-ml-md"
          @click="openDialog"
          v-if="canAdd"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="kode_kios" :props="props">
            {{ props.row.kode_kios }}
          </q-td>
          <q-td key="nama_kios" :props="props">
            {{ props.row.nama_kios }}
          </q-td>
          <q-td key="area" :props="props">
            {{ `${props.row.pubers_kios.member.reg_villages.name} - ${props.row.pubers_kios.member.reg_districts.name} - ${props.row.pubers_kios.member.reg_regencies.name}` }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Tambah Kios</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              v-model="kios"
              :options="listKios"
              label="Pilih Kios"
              :option-label="r => `${r.nama_kios} (${r.kode_kios})`"
              option-value="kode_kios"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              use-input
              @filter="filterKios"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  props: {
    nik: {
      type: String,
      default: ''
    },
    canAdd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      kios: null,
      dialog: false,
      listKios: [],
      rows: [],
      columns: [
        { name: 'kode_kios', align: 'left', label: 'Kode Kios', field: 'kode_kios' },
        { name: 'nama_kios', align: 'left', label: 'Nama Kios', field: 'nama_kios' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' }
      ],
      loading: false,
      activeData: null,
      activeStatus: null,
      fileImport: null,
      filter: '',
      listSubsektor: [],
      subsektor: null,
      listKomoditas: [],
      komoditas: null,
      mt: null,
      tahun: new Date().getFullYear(),
      pagination: {
        sortBy: 'nik',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    openDialog () {
      this.$showLoading()
      this.$axios.get(`master/pubers-kios-belum-ada-distri/${this.$route.params.kode}?key=null`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKios = res.data.result
            this.dialog = true
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.loading = true
      this.$axios.get(`master/data-kios-distri/${this.nik}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result.map(r => {
              return {
                ...r,
                nama_kios: r.pubers_kios.nama_kios
              }
            })
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.post('master/distri-kios', {
        kode_distributor: this.$route.params.kode,
        kode_kios: this.kios.kode_kios
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.kios = null
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    filterKios (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.$axios.get(`master/pubers-kios-belum-ada-distri/${this.$route.params.kode}?key=${needle}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data, false)) {
              this.listKios = res.data.result
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
