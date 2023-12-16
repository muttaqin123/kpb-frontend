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
                <q-toggle v-model="props.row.master_barang_kios_jelabat[0].status" @update:model-value="handleToggleUpdate(props.row.mm_id, props.row.master_barang_kios_jelabat[0].status)" color="green" />
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
              <q-item class="col-12" v-if="!modeEdit">
                <q-select outlined
                          class="full-width"
                          :options="optionsProfilUsaha"
                          v-model="profil_usahadistributor"
                          @filter="filterProfilUsaha"
                          :option-label="opt => Object(opt) === opt && 'profil_usaha_id' in opt ? opt.profil_usaha.nama_usaha : '- Tidak Ada Data -'"
                          option-value="profil_usaha_id"
                          label="Pilih Pemilik Usaha"
                          @update:model-value="getListMM"
                          :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
                />
              </q-item>
              <div class="col-12">
                <q-item>
                  <q-select outlined :readonly="modeEdit"
                            class="full-width"
                            :options="optionsMM"
                            v-model="form.mm_nama"
                            @filter="filterMM"
                            option-label="mm_nama"
                            option-value="mm_id"
                            label="Pilih Produk"
                            @update:model-value="setMM"
                            :rules="[
                    val => val !== null || 'Mohon Pilih'
                  ]"
                  />
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input readonly type="text" outlined class="full-width" v-model="form.mm_merk" label="Merk Produk Dari Produsen"  required/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input readonly type="textarea" outlined class="full-width" v-model="form.mm_deskripsi" label="Keterangan Dari Produsen"  required/>
                </q-item>
              </div>
              <div class="col-lg-12">
                <q-item>
                  <q-list bordered class="rounded-borders full-width">
                    <q-expansion-item
                      expand-separator
                      icon="mms"
                      label="Lihat Gambar"
                    >
                      <q-card>
                        <q-card-section>
                          <div class="text-center">
                            <q-img style="width: 40%" :src="`${$baseURL + 'file-sijelabat/' + form.mm_image}`" />
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </q-item>
              </div>
              <div style="padding-left:17px;padding-right:15px;padding-top: 20px" class="col-12">
                <span style="color: #050D33; font-size: 17px"><strong>Masukan Data Katalog Anda</strong></span>
                <q-separator style="background-color:#050D33;padding-top: 1px" />
              </div>
              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.stok" label="Stok"  required/>
                </q-item>
              </div>

              <div class="col-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.harga" label="Harga"  required/>
                </q-item>
              </div>
              <div class="col-12">
                <q-item>
                  <q-input type="textarea" outlined class="full-width" v-model="form.keterangan" label="Keterangan Produk Katalog Anda"  required/>
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
let [listProfilUsaha, listMM] = [[], []]
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      modalProduk: false,
      modalGambar: false,
      fileGambar: null,
      modeEdit: false,
      form: {
        master_distributor: null,
        profil_usaha_id: null,
        mm_id: null,
        mm_nama: null,
        mm_merk: null,
        mm_deskripsi: null,
        mm_image: null,
        keterangan: null,
        harga: 0,
        stok: 0
      },
      hargaLama: 0,
      idmm: null,
      profil_usahadistributor: null,
      optionsProfilUsaha: listProfilUsaha,
      optionsMM: listMM,
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
    getListProfilUsaha () {
      this.$axios.get(`sijelabat/kios/list-profil-usaha-distributor/byidmember/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .then(res => {
          listProfilUsaha = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getListMM (val) {
      this.form.mm_nama = null
      this.form.master_distributor = val.id
      const idprofilusaha = btoa(this.profil_usahadistributor.profil_usaha_id)
      this.$axios.get(`sijelabat/kios/list-mm-distributor/byidusaha/${idprofilusaha}`, this.$createToken())
        .then(res => {
          listMM = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    setMM (val) {
      // console.log(val)
      this.form.mm_merk = val.mm_merk
      this.form.mm_deskripsi = val.mm_deskripsi
      this.form.mm_image = val.mm_img
    },
    filterProfilUsaha (val, update) {
      update(() => {
        this.optionsProfilUsaha = listProfilUsaha.filter(v => v.profil_usaha.nama_usaha.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    filterMM (val, update) {
      update(() => {
        this.optionsMM = listMM.filter(v => v.mm_nama.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    },
    simpanKatalog () {
      this.form.ubahHarga = this.hargaLama !== this.form.harga
      this.$showLoading()
      if (this.modeEdit) {
        this.$axios.put(`sijelabat/kios/list-katalog/update/${btoa(this.idmm)}/`, this.form, this.$createToken())
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
        this.form.mm_id = this.form.mm_nama.mm_id
        this.$axios.post('sijelabat/kios/list-katalog/insert/', this.form, this.$createToken())
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
      this.$axios.get(`sijelabat/kios/list-katalog/show/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.code === 507) {
            this.$notif(res.data.message, 'negative')
            this.$router.push({ name: 'sijelabatProfilUsahakios' })
          } else {
            if (this.$parseResponse(res.data, false)) {
              // console.log(res)
              this.data = res.data.result[0]
              this.form.profil_usaha_id = res.data.result[1].profil_usaha_id
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (data) {
      this.modalProduk = true
      this.modeEdit = true
      this.form = data
      this.form.profil_usaha_id = data.master_barang_kios_jelabat[0].profil_usaha_id
      this.hargaLama = data.harga_jelabat[0].harga
      this.idmm = data.mm_id
      this.form.harga = data.harga_jelabat[0].harga
      this.form.stok = data.stok_pakan[0].stok
      this.form.keterangan = data.master_barang_kios_jelabat[0].keterangan
      this.form.mm_image = data.mm_img
    },
    handleToggleUpdate (newValue, status) {
      // Handle perubahan nilai sakelar di sini
      this.$showLoading()
      this.$axios.put(`sijelabat/kios/list-katalog/update-status/${btoa(newValue)}`, { status: status }, this.$createToken())
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
      this.form.mm_merk = null
      this.form.mm_deskripsi = null
      this.form.mm_nama = null
      this.mm_image = null
      this.form.keterangan = null
    },
    toGambar (gambar) {
      this.modalGambar = true
      this.fileGambar = gambar
    }
  },
  created () {
    this.getListProfilUsaha()
    this.getListKatalog()
  }
}
</script>

<style scoped>

</style>
