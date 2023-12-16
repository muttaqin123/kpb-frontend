<template>
  <q-page padding>
    <q-table
      title="Data Sapras"
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
      :loading="loading"
      @request="onRequest"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Data"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_barang" :props="props">
            {{ props.row.mm_nama }}
          </q-td>
          <q-td key="sektor" :props="props">
            {{ props.row.child_dtl_kategori.detail_kategori.kategori_master.master_sektor.sektor }}
          </q-td>
          <q-td key="kategori" :props="props">
            {{ props.row.child_dtl_kategori.detail_kategori.kategori_master.kategori_nama }}
          </q-td>
          <q-td key="detailKategori" :props="props">
            {{ props.row.child_dtl_kategori.detail_kategori.dtlk_nama }}
          </q-td>
          <q-td key="detailKategori" :props="props">
            {{ props.row.child_dtl_kategori.child_dtlk_nama }}
          </q-td>
          <q-td key="merk" :props="props">
            {{ props.row.mm_merk }}
          </q-td>
          <q-td key="deskripsi" class="elipsiss" :props="props">
            {{ props.row.mm_deskripsi ? (props.row.mm_deskripsi.length > 20 ? `${props.row.mm_deskripsi.substring(0, 20)}...` : props.row.mm_deskripsi) : props.row.mm_deskripsi }}
          </q-td>
          <q-td key="gambar" :props="props">
            <q-img
              :src="`${$baseURL}file-sarpras/${props.row.mm_img}`"
              width="100"
            />
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.mm_status === true ? 'Aktif' : 'Tidak Aktif' }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <!-- <q-btn label="Fitur" unelevated color="primary" :to="{name: 'manajemenFiturLayananSuperAdmin', params: { idLayanan: props.row.id_layanan }}"/> -->
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Data</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              :options="listSektor"
              v-model="sektor"
              @filter="filterSektor"
              option-label="sektor"
              option-value="id"
              label="Pilih Sektor"
              @update:model-value="getKategori"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
            />
            <q-select
              :options="listKategori"
              v-model="kategori"
              @filter="filterKategori"
              option-label="kategori_nama"
              option-value="kategori_id"
              label="Pilih Kategori"
              @update:model-value="getJenis"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
            />
            <q-select
              :options="listDetailKategori"
              v-model="detailKategori"
              @filter="filterDetailKategori"
              option-label="dtlk_nama"
              option-value="dtlk_id"
              label="Pilih Detail Kategori"
              use-input
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              @update:model-value="getChild()"
            />
            <q-select
              :options="listChildDetailKategori"
              v-model="childDetailKategori"
              @filter="filterChildDetailKategori"
              option-label="child_dtlk_nama"
              option-value="child_dtlk_id"
              label="Pilih Child Detail Kategori"
              use-input
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
            />
            <q-input
              dense
              v-model="form.mm_nama"
              label="Nama Barang"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.mm_merk"
              label="Merk"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-file
              v-model="image"
              label="Gambar"
              accept=".jpg, image/*"
              :rules="[
                editMode ? null : val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.mm_deskripsi"
              label="Deskripsi"
              type="textarea"
              :rules="[null]"
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
const model = () => {
  return {
    mm_id: null,
    child_dtlk_id: null,
    mm_nama: null,
    mm_merk: null,
    mm_deskripsi: null,
    mm_status: true
  }
}
let listSektor = [], listKategori = [], listDetailKategori = [], listChildDetailKategori = []
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama_barang', align: 'left', label: 'Nama Barang', field: 'nama_barang' },
        { name: 'sektor', align: 'left', label: 'Sektor', field: 'sektor' },
        { name: 'kategori', align: 'left', label: 'Kategori', field: 'kategori' },
        { name: 'detailKategori', align: 'left', label: 'Detail Kategori', field: 'detailKategori' },
        { name: 'chilDetailKategori', align: 'left', label: 'Child Detail Kategori', field: 'chilDetailKategori' },
        { name: 'merk', align: 'left', label: 'Merk', field: 'merk' },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      image: null,
      sektor: null,
      listSektor: listSektor,
      kategori: null,
      listKategori: listKategori,
      detailKategori: null,
      listDetailKategori: listDetailKategori,
      childDetailKategori: null,
      listChildDetailKategori: listChildDetailKategori,
      pagination: {
        sortBy: 'mm_id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData()
    this.getSektor()
  },
  methods: {
    getSektor () {
      this.$axios.get('master/sektor', this.$createToken())
        .then(res => {
          listSektor = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getKategori () {
      this.$axios.get(`master/kategori/${this.sektor.id}`, this.$createToken())
        .then(res => {
          this.resetKategori()
          listKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getJenis () {
      this.$axios.get(`master/detail-kategori/${this.kategori.kategori_id}`, this.$createToken())
        .then(res => {
          this.resetDetailKategori()
          listDetailKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getChild () {
      this.$axios.get(`master/child-detail-kategori/${this.detailKategori.dtlk_id}`, this.$createToken())
        .then(res => {
          this.resetChildDetailKategori()
          listChildDetailKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getData () {
      this.onRequest({
        pagination: this.pagination,
        filter: undefined
      })
    },
    onRequest (props) {
      this.loading = true
      this.$axios.get('master/sarpras', this.$createPaginate(props))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
            this.pagination = res.data.paginate
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      const formData = new FormData()
      if (this.editMode) {
        this.$showLoading()
        this.form.child_dtlk_id = this.childDetailKategori.child_dtlk_id
        Object.assign(this.form, { adaGambar: false })
        if (this.image) {
          Object.assign(this.form, { adaGambar: true })
          formData.append('file', this.image)
        }
        formData.append('data', JSON.stringify(this.form))
        this.$axios.put(`master/sarpras/${this.form.mm_id}`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()

        delete this.form.mm_id
        this.form.child_dtlk_id = this.childDetailKategori.child_dtlk_id

        formData.append('file', this.image)
        formData.append('data', JSON.stringify(this.form))

        this.$axios.post('master/sarpras', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    resetForm (dialog = true) {
      this.form = model()
      if (dialog) {
        this.dialog = false
      }
      this.image = null
      this.resetSektor()
    },
    openDialog (editMode, data) {
      this.resetForm(false)
      if (editMode) {
        this.editMode = true
        this.sektor = data.child_dtl_kategori.detail_kategori.kategori_master.master_sektor
        this.kategori = data.child_dtl_kategori.detail_kategori.kategori_master
        this.detailKategori = data.child_dtl_kategori.detail_kategori
        this.childDetailKategori = data.child_dtl_kategori
        this.form.mm_nama = data.mm_nama
        this.form.mm_merk = data.mm_merk
        this.form.mm_deskripsi = data.mm_deskripsi
        this.form.mm_id = data.mm_id
      }
      this.editMode = editMode
      this.dialog = true
    },
    filterSektor (val, update) {
      update(() => {
        this.listSektor = listSektor.filter(v => v.sektor.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterKategori (val, update) {
      update(() => {
        this.listKategori = listKategori.filter(v => v.kategori_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterDetailKategori (val, update) {
      update(() => {
        this.listDetailKategori = listDetailKategori.filter(v => v.dtlk_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterChildDetailKategori (val, update) {
      update(() => {
        this.listChildDetailKategori = listChildDetailKategori.filter(v => v.child_dtlk_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    resetSektor () {
      this.sektor = null
      this.resetKategori()
    },
    resetKategori () {
      this.kategori = null
      this.resetDetailKategori()
    },
    resetDetailKategori () {
      this.detailKategori = null
      listDetailKategori = []
      this.resetChildDetailKategori()
    },
    resetChildDetailKategori () {
      this.childDetailKategori = null
      listChildDetailKategori = []
    }
  }
}
</script>
