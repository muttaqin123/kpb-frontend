
<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Pilih Produk</strong>
    </q-banner>
    <br />
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="175px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="youtube_searched_for" size="56px" />
        <div class="q-mt-md text-center">
          Cari dan Pilih Produk yang Anda Butuhkan
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-icon name="swipe_right" size="56px" />
        <div class="q-mt-md text-center">
          Pastikan Produk Terpilih Diceklis Sebelum Melanjutkan Pembayaran
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="3" class="column no-wrap flex-center">
        <q-icon name="paid" size="56px" />
        <div class="q-mt-md text-center">
          Lakukan Pembayaran Sesuai Barang/ Produk yang Anda Pilih
        </div>
      </q-carousel-slide>
    </q-carousel>
    <br />
    <q-card flat>
      <q-card-section>
        <q-table
          class="my-sticky-column-table"
          flat
          bordered
          :rows="data"
          :columns="columns"
          row-key="mm_id"
          :filter="filter"
          :pagination="pagination"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          v-model:selected="selectedProduk"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
          <template v-slot:body-cell-gambar="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="blue" @click="showGambar(props.row.mm_img)" size="sm" icon="info"> Lihat</q-btn>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-deskripsi="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="blue" size="sm" @click="showDeskripsi(props.row.mm_deskripsi)" icon="info"> Lihat</q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <div class="text-right" style="padding-top: 30px">
      <q-btn color="primary" @click="toPayment" icon="shopping_cart_checkout"> Lanjutkan</q-btn>
    </div>
    <q-dialog v-model="modalGambar">
      <q-card class="my-card" style="width: 500px; max-width: 100%">
        <q-img :src="`${$baseURL + 'file-sijelabat/' + gambar}`" />
      </q-card>
    </q-dialog>
    <q-dialog v-model="modalDeskripsi">
      <q-card class="my-card" style="width: 500px; max-width: 100%">
        <q-item>
          <q-input type="textarea" outlined class="full-width" readonly v-model="mm_deskripsi" label="Deskripsi"  required/>
        </q-item>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'PEMESANAN',
  data () {
    return {
      modalGambar: false,
      modalDeskripsi: false,
      mm_deskripsi: null,
      gambar: null,
      slide: 'style',
      selectedProduk: [],
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'mm_nama', required: true, label: 'Nama Produk', align: 'left', field: 'mm_nama', sortable: true },
        { name: 'mm_merk', required: true, label: 'Merk', align: 'left', field: 'mm_merk', sortable: true },
        { name: 'stok', required: true, label: 'Stok', align: 'left', field: 'stok', sortable: true },
        { name: 'harga', required: true, label: 'Harga', align: 'left', field: 'harga', sortable: true },
        { name: 'gambar', required: true, label: 'Gambar', align: 'left', field: 'gambar', sortable: true },
        { name: 'deskripsi', required: true, label: 'Deskripsi', align: 'left', field: 'deskripsi', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getProduk () {
      this.$showLoading()
      this.$axios.get(`sijelabat/distributor/list-penyedia/produk/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    showGambar (gambar) {
      this.modalGambar = true
      this.gambar = gambar
    },
    showDeskripsi (text) {
      this.modalDeskripsi = true
      this.mm_deskripsi = text
    },
    toPayment () {
      const idmm = this.selectedProduk.map(mm => mm.mm_id)
      this.$showLoading()
      this.$axios.post('sijelabat/checkout/keranjang/input/', {
        mm_id: idmm,
        profil_usaha_penyedia_id: atob(this.$route.params.id),
        member_id_pembeli: profile.member.id_member
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.$router.push({ name: 'sijelabatCheckoutProdukPemesanandistributor', params: { id: this.$route.params.id } })
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getSelectedString () {
      return this.selectedProduk.length === 0 ? '' : `${this.selectedProduk.length} Produk Dipilih`
    }
  },
  created () {
    this.getProduk()
  }
}
</script>

<style scoped>

</style>
