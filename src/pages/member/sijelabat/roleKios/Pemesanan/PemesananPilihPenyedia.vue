<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Pilih Penyedia Sesuai Produk yang Dicari</strong>
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
        <q-icon name="swipe_right" size="56px" />
        <div class="q-mt-md text-center">
          Pilih Penyedia yang Menyediakan Pesanan Anda
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="2" class="column no-wrap flex-center">
        <q-icon name="youtube_searched_for" size="56px" />
        <div class="q-mt-md text-center">
          Cari dan Pilih Produk yang Anda Butuhkan
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
          row-key="id"
          :filter="filter"
          :pagination="pagination"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-penyedia="props">
            <q-td :props="props">
              {{props.row.profil_usaha.nama_usaha}}
            </q-td>
          </template>
          <template v-slot:body-cell-kontak="props">
            <q-td :props="props">
              {{props.row.profil_usaha.kontak}}
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn outline color="blue" size="sm" @click="toDetail(props.row.profil_usaha_id)" icon="swipe_up"> Lihat Daftar Produk</q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PEMESANAN',
  data () {
    return {
      slide: 'style',
      filter: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'penyedia', required: true, label: 'Penyedia Bahan Baku', align: 'left', field: 'penyedia', sortable: true },
        { name: 'totalmm', required: true, label: 'Jumlah Produk', align: 'center', field: 'totalmm', sortable: true },
        { name: 'kontak', required: true, label: 'Kontak', align: 'left', field: 'kontak', sortable: true },
        { name: 'action', required: true, label: 'Action', align: 'left', field: 'action', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    getPenyedia () {
      this.$showLoading()
      this.$axios.get('sijelabat/kios/list-penyedia/show/', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            // console.log(res)
            this.data = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'sijelabatPilihProdukPemesanankios', params: { id: ids } })
    }
  },
  created () {
    this.getPenyedia()
  }
}
</script>

<style scoped>

</style>
