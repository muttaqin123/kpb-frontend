<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>List Data Produk</strong>
    </q-banner>
    <br />
    <div style="padding-bottom: 10px">
      <q-card flat>
        <q-card-section class="q-pa-sm">
          <q-toolbar class="GNL__toolbar">
              <q-input style="width: 100%"  rounded v-model="search"  @update:model-value="getProduk()" outlined placeholder="Search Product">
                <template v-slot:append>
                  <q-icon v-if="search === ''" name="search"/>
                  <q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch"/>
                </template>
              </q-input>
          <q-space style="padding: 5px" />
            <q-btn
              @click="toCheckout"
              fab
              color="teal-7"
              icon="shopping_cart" padding="sm"
            />
          </q-toolbar>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm " v-if="totalSearch">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="data in dataProduk" :key="data.mm_id">
        <q-card class="no-shadow" bordered>
          <q-img :src="$baseURL+'file-sijelabat/'+data.mm_img" height="220px" />

          <q-card-section>
            <q-btn
              @click="saveKeranjang(data)"
              fab
              color="teal-7"
              icon="add_shopping_cart" padding="sm"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">
              {{ data.mm_nama }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              Merk: {{ data.mm_merk }} <br />
              Kios: {{data.nama_usaha}} <br />
              Stok: {{data.stok?.stok}}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">{{$convertRupiah(data.harga?.harga)}} </span>
              <span class="text-h6 float-right">
          <q-btn @click="toDetail(data.mm_id, data.profil_usaha_id)" label="Lihat Detail" rounded color="secondary" outline></q-btn>
        </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card v-if="!totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <img v-bind:style="$q.screen.lt.md?{'width': '90%'}:{'width':'35%'}" src="alsintan/404-error.png" alt="">
      </q-card-section>
    </q-card>
    <q-card v-if="totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <q-pagination
          v-model="current"
          :max="totalPages"
          input
          input-class="text-orange-10"
          @update:model-value="getProduk()"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default ({
  data () {
    const search = ''
    return {
      dataProduk: [],
      search,
      current: 1,
      itemsPerPage: 12,
      resultCount: 0,
      nextPage: null,
      totalPages: 0,
      totalSearch: true
    }
  },
  methods: {
    getProduk () {
      this.$showLoading()
      this.$axios.get(`sijelabat/pembudi-daya/list-produk?perpage=${this.itemsPerPage}&page=${this.current}&search=${this.search}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.result.length > 0) {
            this.totalSearch = true
            if (this.$parseResponse(res.data, false)) {
              const paginate = res.data.paginate
              this.resultCount = paginate.rowsNumber
              this.current = paginate.page
              this.itemsPerPage = paginate.rowsPerPage
              this.totalPages = Math.ceil(paginate.rowsNumber / paginate.rowsPerPage)
              this.dataProduk = res.data.result
            }
          } else {
            this.totalSearch = false
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (idmm, idpu) {
      const idmms = btoa(idmm)
      const idpus = btoa(idpu)
      this.$router.push({ name: 'sijelabatDetailListProdukPembudidaya', params: { idmm: idmms, idprofilusaha: idpus } })
    },
    saveKeranjang (data) {
      this.$showLoading()
      this.$axios.post('sijelabat/pembudi-daya/keranjang/input/', {
        mm_id: data.mm_id,
        profil_usaha_penyedia_id: data.profil_usaha_id,
        member_id_pembeli: profile.member.id_member
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.$notif('Berhasil Menambah Ke Keranjang', 'positive')
            this.getProduk()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toCheckout () {
      this.$router.push({ name: 'sijelabatCheckoutListProdukPembudidaya' })
    },
    resetSearch () {
      this.search = ''
      this.getProduk()
    }
  },
  created () {
    this.getProduk()
  }
})
</script>

<style scoped>

</style>
