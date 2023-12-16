<template>
  <q-page :class="this.$q.screen.xs ? '' : 'q-px-xl'" padding style="background: #F2F7F5">
    <div class="column q-pa-sm">
      <div class="text-h4 q-mb-md text-weight-bold text-green-10">
        Produk Dari e-Pemasaran
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-12 col-xs-12 q-pa-sm">
          <div class="bg-white col column" style="border-radius: 10px">
            <div class="bg-green-10 text-white q-pa-sm" style="border-radius: 10px 10px 0px 0px">
              Filter
            </div>
            <div class="">
              <q-form>
                <div class="q-pa-sm q-gutter-sm column">
                  <template
                    v-for="(k, i) in optionsKomoditas"
                    :key="i">
                    <q-checkbox color="green-10" v-model="komoditas" :val="k.value" :label="k.label" />
                  </template>
                  <!-- <template
                    v-for="(k, i) in optionsKomoditas"
                    :key="i">
                    <q-radio
                      v-model="komoditas"
                      :val="k.value"
                      :label="k.label" />
                  </template> -->
                  <q-separator inset/>
                  <q-input placeholder="Cari Barang" outlined v-model="search"/>
                  <!-- <area-kabupaten
                    :outline="true"
                    :auto-load="true"
                    withAction
                    /> -->
                  <q-select
                    outlined
                    label="Urutkan Harga"
                    v-model="urutkan"
                    :options="urutkanHarga"
                    option-label="name"
                    option-value="val"/>
                  <q-btn
                    label="Cari Barang" @click="getData" no-caps color="green-10"/>
                </div>
              </q-form>
            </div>
          </div>
        </div>
        <div class="col-md-9 col-sm-12 col-xs-12">
          <div class="row">
            <div
              v-for="(barang,i) in barangs"
              :key="i"
              clickable
              @click="this.$router.push({ name: 'detailPemasaran', params: { id: barang.produk_id } })"
              class="col-md-4 col-sm-6 col-xs-12 q-pa-xs my-card" style="height: 100%">
              <q-card style="height: 100%">
                <img :src="`${this.$urlImagePemasaran}/file/api/v1/produk/foto/${barang.foto[0].nama_foto}`"
                  style="width: 100%; height: 300px; object-fit: fill;">
                <q-card-section>
                  <div class="ellipsis-2-lines">{{ barang.nama_produk }}</div>
                  <div class="text-weight-bold">{{ this.$formatPrice(barang.harga) }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none column">
                  <span class="text-caption">Stok Tersedia : {{ barang.stok }}</span>
                  <span class="text-caption">{{ barang.toko.nama_toko }}</span>
                  <span class="text-caption">{{ barang.toko.alamat }}</span>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      komoditas: [],
      barangs: [],
      filter: '',
      optionsKomoditas: [
        { label: 'Pertanian', value: '1' },
        { label: 'Perkebunan', value: '2' },
        { label: 'Peternakan', value: '3' },
        { label: 'Perikanan', value: '4' }
      ],
      paginationConfig: {
        size: 5,
        page: 0,
        totalPages: 1
      },
      urutkan: 'Termurah - Termahal',
      urutkanHarga: [
        {
          name: 'Termahal - Termurah',
          va: 'DESC'
        },
        {
          name: 'Termurah - Termahal',
          va: 'ASC'
        }
      ]
    }
  },
  created () {
    this.search = this.$route.params.search === ' ' ? '' : this.$route.params.search
    if (this.$route.params.id === 'semua') {
      this.komoditas = ['1', '2', '3', '4']
    } else {
      this.komoditas.push(this.$route.params.id)
    }
    // this.komoditas = this.$route.params.id
    // console.log(this.search)
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      const listKomoditas = this.komoditas.join(';')
      // console.log(listKomoditas)
      this.$api.get('produk/filter-pemasaran', {
        params: {
          page: this.paginationConfig.page,
          size: this.paginationConfig.size,
          search: this.search,
          status: true,
          statusAdmin: true,
          kategoriIdList: listKomoditas
          // kategoriIdList: Number(this.komoditas[0])
        }
      }).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.barangs = res.data.content
        }).catch(() => this.$commonErrorNotif())
    }

  }
}
</script>
<style>
  .my-card:hover {
    cursor: pointer;
  }
</style>
