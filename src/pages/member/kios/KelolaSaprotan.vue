<template>
  <q-page padding>
    <q-table
      title="Kelola Saprotan"
      flat
      :rows="rows"
      :columns="columns"
      row-key="nama"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Saprotan"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_distri" :props="props">
            {{ props.row.master_barang_distri.member.ktp.nama }}
          </q-td>
          <q-td key="nama_pabrik" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.member.ktp.nama }}
          </q-td>
          <q-td key="nama_barang" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.mm_nama }}
          </q-td>
          <q-td key="sektor" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.child_dtl_kategori.detail_kategori.kategori_master.master_sektor.sektor }}
          </q-td>
          <q-td key="kategori" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.child_dtl_kategori.detail_kategori.kategori_master.kategori_nama }}
          </q-td>
          <q-td key="detailKategori" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.child_dtl_kategori.detail_kategori.dtlk_nama }}
          </q-td>
          <q-td key="detailKategori" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.child_dtl_kategori.child_dtlk_nama }}
          </q-td>
          <q-td key="merk" :props="props">
            {{ props.row.master_barang_distri.master_barang_pabrik.material_master.mm_merk }}
          </q-td>
          <q-td key="gambar" :props="props">
            <q-img
              :src="`${$baseURL}file-sarpras/${props.row.master_barang_distri.master_barang_pabrik.material_master.mm_img}`"
              width="100"
            />
          </q-td>
          <q-td key="harga" :props="props">
            {{ $formatPrice(props.row.harga_kios) }}
          </q-td>
          <q-td key="keterangan" :props="props">
            {{ props.row.keterangan }}
          </q-td>
          <!-- <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/>
              <q-btn label="Hapus" unelevated color="negative" @click="hapusData(props.row.mm_id)"/>
            </div>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Edit' : 'Tambah' }} Saprotan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              v-model="distri"
              :options="distris"
              label="Pilih Distributor"
              option-label="nama"
              option-value="id_member"
              use-input
              clearable
              @filter="filterDistri"
              @update:model-value="getBarang()"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-select
              v-model="barang"
              :options="barangs"
              label="Pilih Barang"
              :option-label="r => `${r.master_barang_pabrik.material_master.mm_nama} (${r.master_barang_pabrik.material_master.mm_merk})`"
              option-value="id"
              use-input
              clearable
              @filter="filterBarang"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.harga_kios"
              label="Harga"
              :rules="[
                val => val > 0 || 'Harga Tidak Boleh Kurang Dari 1',
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-input
              dense
              v-model="form.keterangan"
              label="Keterangan"
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
    id_member: null,
    id_barang_distri: null,
    harga_kios: 0,
    keterangan: null
  }
}
let barangs = [], distris = []
export default {
  data () {
    return {
      barang: null,
      barangs: barangs,
      rows: [],
      columns: [
        { name: 'nama_distri', align: 'left', label: 'Nama Distri', field: 'nama_distri' },
        { name: 'nama_pabrik', align: 'left', label: 'Nama Pabrik', field: 'nama_pabrik' },
        { name: 'nama_barang', align: 'left', label: 'Nama Barang', field: 'nama_barang' },
        { name: 'sektor', align: 'left', label: 'Sektor', field: 'sektor' },
        { name: 'kategori', align: 'left', label: 'Kategori', field: 'kategori' },
        { name: 'detailKategori', align: 'left', label: 'Detail Kategori', field: 'detailKategori' },
        { name: 'chilDetailKategori', align: 'left', label: 'Child Detail Kategori', field: 'chilDetailKategori' },
        { name: 'merk', align: 'left', label: 'Merk', field: 'merk' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' }
        // { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      activeId: null,
      distri: null,
      distris: distris
    }
  },
  created () {
    this.getData()
    this.getDistri()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(`master/barang-kios/${this.$getProfile().member.id_member}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.form.id_barang_distri = this.barang.id
      this.form.id_member = this.$getProfile().member.id_member

      if (this.editMode) {
        // this.$showLoading()
        // this.$axios.put(`master/barang-distri/${this.activeId}`, this.form, this.$createToken())
        //   .finally(() => this.$hide())
        //   .then(res => {
        //     if (this.$parseResponse(res.data)) {
        //       this.getData()
        //       this.resetForm()
        //     }
        //   }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        this.$axios.post('master/barang-kios', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    resetForm (resetDialog = true) {
      this.form = model()
      if (resetDialog) this.dialog = false
      this.barang = null
      this.distri = null
      this.activeId = null
    },
    openDialog (editMode, data) {
      this.resetForm(false)
      if (editMode) {
        this.editMode = true
        this.form = {
          id_barang: data.mm_id,
          harga: data.harga,
          keterangan: data.keterangan
        }
        this.activeId = data.id
        this.barang = data.material_master
      }
      this.editMode = editMode
      this.dialog = true
    },
    getBarang () {
      this.$axios.get(`master/barang-distri/${this.distri.id_member}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            barangs = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getDistri () {
      this.$axios.get('users/member-by-role/10', this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            distris = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    filterBarang (val, update) {
      update(() => {
        this.barangs = barangs.filter(v => v.master_barang_pabrik.material_master.mm_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterDistri (val, update) {
      update(() => {
        this.distris = distris.filter(v => v.nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    hapusData (id) {
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.delete(`master/barang-distri/${id}`, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
