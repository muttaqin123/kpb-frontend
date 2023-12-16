<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>List Katalog</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section>
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          :rows="data"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :pagination="pagination"
        >
          <template v-slot:top-right>
            <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>
            <q-space />&nbsp;
            <q-btn v-if="show_filter" outline color="blue" @click="toTambahKatalog" icon="add_circle"> Tambah Produk</q-btn>

            <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-toggle v-model="props.row.master_barang_pabrik_bahan_jadi[0].status" @update:model-value="handleToggleUpdate(props.row.mm_id, props.row.master_barang_pabrik_bahan_jadi[0].status)" color="green" />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-harga="props">
            <q-td :props="props">
              {{$convertRupiah(props.row.harga_jelabat[0].harga)}}
            </q-td>
          </template>
          <template v-slot:body-cell-stok="props">
            <q-td :props="props">
              {{props.row.stok_pakan[0].stok}}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="purple" size="sm" @click="toGambar(props.row.mm_img)" icon="picture_in_picture"> Gambar</q-btn>
                <q-btn outline color="blue" size="sm" @click="toDetail(props.row)" icon="view_timeline"> Detail</q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog v-model="modalProduk">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <!--        <div class="text-h6">Close icon</div>-->
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="simpanKatalog">
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.mm_nama" label="Nama Produk"  required/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.mm_merk" label="Merk Produk"  required/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.stok" label="Stok"  required/>
                </q-item>
              </div>

              <q-item class="col-12">
                <q-select
                  class="full-width"
                  :options="optionsSektor"
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
              </q-item>

              <q-item class="col-12">
                <q-select
                  class="full-width"
                  :options="optionsKategori"
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
              </q-item>

              <q-item class="col-12">
                <q-select
                  class="full-width"
                  :options="optionsDetailKategori"
                  v-model="subkategori"
                  @filter="filterDetailKategori"
                  option-label="dtlk_nama"
                  option-value="dtlk_id"
                  label="Pilih Detail Kategori"
                  @update:model-value="getChild"
                  :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
                />
              </q-item>

              <q-item class="col-12">
                <q-select
                  class="full-width"
                  :options="optionsChildDetailKategori"
                  v-model="form.child_dtlk_id"
                  @filter="filterChildDetailKategori"
                  option-label="child_dtlk_nama"
                  option-value="child_dtlk_id"
                  label="Pilih Child Detail Kategori"
                  use-input
                  :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
                />
              </q-item>

              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.harga" label="Harga"  required/>
                </q-item>
              </div>

              <div class="col-12">
                <q-item>
                  <q-input type="textarea" outlined class="full-width" v-model="form.mm_deskripsi" label="Keterangan"  required/>
                </q-item>
              </div>

              <div class="col-12">
                <q-item>
                  <q-file class="full-width" accept=".jpg, image/*" color="grey-3" outlined label-color="blue" v-model="form.mm_image" label="Gambar/ Foto Produk">
                    <template v-slot:append>
                      <q-icon name="attachment" color="blue" />
                    </template>
                  </q-file>
                </q-item>
              </div>

            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-item>
              <q-btn flat  type="submit" label="Simpan Data" color="primary"/>
            </q-item>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalGambar">
      <q-card class="my-card" style="width: 500px; max-width: 100%">
        <q-img :src="`${$baseURL + 'file-sijelabat/' + fileGambar}`" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
let [listSektor, listKategori, listDetailKategori, listChildDetailKategori] = [[], [], [], []]
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      modalProduk: false,
      modalGambar: false,
      fileGambar: null,
      modeEdit: false,
      form: {
        profil_usaha_id: null,
        child_dtlk_id: null,
        mm_nama: null,
        mm_merk: null,
        mm_deskripsi: null,
        mm_status: true,
        mm_image: null,
        harga: 0,
        stok: 0
      },
      hargaLama: 0,
      idmm: null,
      sektor: null,
      kategori: null,
      subkategori: null,
      optionsSektor: listSektor,
      optionsKategori: listKategori,
      optionsDetailKategori: listDetailKategori,
      optionsChildDetailKategori: listChildDetailKategori,
      show_filter: false,
      value: true,
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        {
          name: 'mm_nama',
          align: 'left',
          label: 'Nama Produk',
          field: 'mm_nama',
          sortable: true
        },
        { name: 'mm_merk', required: true, label: 'Merk', align: 'left', field: 'mm_merk', sortable: true },
        { name: 'stok', required: true, label: 'Stok', align: 'left', field: 'stok', sortable: true },
        { name: 'harga', required: true, label: 'Harga', align: 'left', field: 'harga', sortable: true },
        { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    simpanKatalog () {
      this.form.child_dtlk_id = this.form.child_dtlk_id.child_dtlk_id
      this.form.ubahHarga = this.hargaLama !== this.form.harga
      const formData = new FormData()
      formData.append('Foto', this.form.mm_image)
      formData.append('data', JSON.stringify(this.form))
      this.$showLoading()
      if (this.modeEdit) {
        this.$axios.put(`sijelabat/produsen/list-katalog/update/${btoa(this.idmm)}/`, formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.getListKatalog()
              this.modalProduk = false
            }
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        this.$axios.post('sijelabat/produsen/list-katalog/insert/', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.getListKatalog()
              this.modalProduk = false
            }
          })
          .catch(() => this.$commonErrorNotif())
      }
    },
    getListKatalog () {
      this.$showLoading()
      this.$axios.get(`sijelabat/produsen/list-katalog/show/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.code === 507) {
            this.$notif(res.data.message, 'negative')
            this.$router.push({ name: 'sijelabatProfilUsahaprodusen' })
          } else {
            if (this.$parseResponse(res.data, false)) {
              // console.log(res)
              this.data = res.data.result[0]
              this.form.profil_usaha_id = res.data.result[1].profil_usaha_id
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getSektor () {
      // this.$axios.get('master/sektor', this.$createToken())
      //   .then(res => {
      //     listSektor = res.data.result
      //   })
      //   .catch(() => this.$commonErrorNotif())
      listSektor = [{
        id: 4,
        sektor: 'Perikanan'
      }]
    },
    getKategori (val) {
      this.$axios.get(`master/kategori/${val.id}`, this.$createToken())
        .then(res => {
          this.resetKategori()
          listKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getJenis (val) {
      this.$axios.get(`master/detail-kategori/${val.kategori_id}`, this.$createToken())
        .then(res => {
          this.resetDetailKategori()
          listDetailKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getChild (val) {
      this.$axios.get(`master/child-detail-kategori/${val.dtlk_id}`, this.$createToken())
        .then(res => {
          this.resetChildDetailKategori()
          listChildDetailKategori = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    filterSektor (val, update) {
      update(() => {
        this.optionsSektor = listSektor.filter(v => v.sektor.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterKategori (val, update) {
      update(() => {
        this.optionsKategori = listKategori.filter(v => v.kategori_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterDetailKategori (val, update) {
      update(() => {
        this.optionsDetailKategori = listDetailKategori.filter(v => v.dtlk_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterChildDetailKategori (val, update) {
      update(() => {
        this.optionsChildDetailKategori = listChildDetailKategori.filter(v => v.child_dtlk_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
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
    },
    toDetail (data) {
      this.modalProduk = true
      this.modeEdit = true
      this.form = data
      this.form.profil_usaha_id = data.master_barang_pabrik_bahan_jadi[0].profil_usaha_id
      this.hargaLama = data.harga_jelabat[0].harga
      this.idmm = data.mm_id
      this.form.harga = data.harga_jelabat[0].harga
      this.form.stok = data.stok_pakan[0].stok
      const sektor = data.child_dtl_kategori
      this.form.child_dtlk_id = sektor
      this.subkategori = sektor.detail_kategori
      this.kategori = sektor.detail_kategori.kategori_master
      this.sektor = sektor.detail_kategori.kategori_master.master_sektor
    },
    handleToggleUpdate (newValue, status) {
      // Handle perubahan nilai sakelar di sini
      this.$showLoading()
      this.$axios.put(`sijelabat/produsen/list-katalog/update-status/${btoa(newValue)}`, { status: status }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getListKatalog()
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    toTambahKatalog () {
      this.modalProduk = true
      this.modeEdit = false
      this.form.harga = 0
      this.form.stok = 0
      this.form.child_dtlk_id = null
      this.form.mm_merk = null
      this.form.mm_deskripsi = null
      this.form.mm_nama = null
      this.mm_image = null
      this.subkategori = null
      this.kategori = null
      this.sektor = null
    },
    toGambar (gambar) {
      this.modalGambar = true
      this.fileGambar = gambar
    }
  },
  created () {
    this.getSektor()
    this.getListKatalog()
  }
}
</script>

<style scoped>

</style>
