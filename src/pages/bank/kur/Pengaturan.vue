<template>
  <q-page padding>
    <q-table
      title="Pengaturan Skema KUR Bank Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Skema"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_skema" :props="props">
            {{ props.row.nama_skema }}
          </q-td>
          <q-td key="jenis" :props="props">
            {{ props.row.jenis }}
          </q-td>
          <q-td key="nominal" :props="props">
            {{props.row.nominal}}
          </q-td>
          <q-td key="skema" :props="props">
            {{props.row.skema}}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 500px;max-width: 600px;">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Skema KUR Bank</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.nama_skema"
              label="Nama Skema/KUR"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.jenis"
              label="Jenis"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              v-model="form.nominal"
              label="Nominal"
              type="number"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <div style="border-style: solid;" class="q-pa-md">
              <q-input
                dense
                v-model="form.skema[0].value"
                label="Skema"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-select
                dense
                v-model="form.skema[0].satuan"
                label="Satuan"
                :options="listSatuan"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-btn
                label="Tambah Skema"
                unelevated
                outline
                color="primary"
                class="q-mr-sm"
              />
              <q-btn
                label="Hapus Skema"
                unelevated
                outline
                color="negative"
              />
            </div>
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
const model = () => {
  return {
    nama_skema: null,
    jenis: null,
    nominal: null,
    skema: [{
      value: 0,
      satuan: null
    }]
  }
}
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_skema', align: 'left', label: 'Nama Skema', field: 'nama_skema' },
        { name: 'jenis', align: 'left', label: 'Jenis', field: 'jenis' },
        { name: 'nominal', align: 'left', label: 'Nominal', field: 'nominal' },
        { name: 'skema', align: 'left', label: 'Skema', field: 'skema' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      image: null,
      listSatuan: ['Bulan', 'Tahun']
    }
  },
  created () {
    // this.getData()
    this.rows = [
      {
        nama_skema: 'KUR BRI Mantap',
        jenis: 'KUR Mandiri',
        nominal: 'Rp.25.000.000,00',
        skema: '6 Bulan/12 Bulan/24 Bulan'
      }
    ]
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/get-fitur', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        })
    },
    onSubmit () {
      if (this.editMode) {
        this.$showLoading()
        this.$axios.put(`master/update-fitur/${this.form.id_fitur}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          })
      } else {
        this.$showLoading()
        delete this.form.id_fitur
        this.$axios.post('master/create-fitur', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          })
      }
    },
    resetForm () {
      this.form = model()
      this.dialog = false
      this.image = null
    },
    openDialog (editMode, data) {
      if (editMode) {
        this.editMode = true
        this.form = data
      }
      this.editMode = editMode
      this.dialog = true
    }
  }
}
</script>
