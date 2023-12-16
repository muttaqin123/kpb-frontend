<template>
  <q-page padding>
    <div>
      <q-card flat>
        <q-card-section class="q-pa-sm">
          <q-toolbar class="GNL__toolbar">
            <q-input style="width: 100%"  @update:model-value="getIsiGudang()" outlined dense v-model="search" color="bg-grey-7 shadow-1" placeholder="cari berdasarkan nama material master">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
              </template>
            </q-input>
            <q-space style="padding: 5px" />
            <q-btn v-if="showadd && !$q.screen.lt.md" outline label="Tambah Produk" @click="tambahProduk" />
            <q-btn round dense flat color="text-grey-7" size="25px" @click="showadd = true" icon="apps">
              <q-tooltip>Tools</q-tooltip>
              <q-menu v-if="$q.screen.lt.md">
                <q-list style="min-width: 200px">
                  <q-item clickable @click="tambahProduk">
                    <q-item-section>Tambah Produk</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="totalSearch" class="row q-col-gutter-sm " style="padding-top: 25px">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="data in data" :key="data">
        <q-card class="">
          <q-img :src="data.mm_img != null ? $baseURL+'file-sarpras/'+data.mm_img : 'alsintan/barangsewa/tractorsampel.png'" height="220px" />
          <q-card-section>
            <div class="text-h6">
              {{ data.mm_nama }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
            {{'Merk : '+ data.mm_merk}} <br />
              {{'Lok. Agen: '+data.kabagen}}
            </div>
            <div style="color:gray;" class="text-subtitle5 text-justify q-mt-sm">Klik detail untuk SN dan transaksi</div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">&nbsp;</span>
              <span class="text-h6 float-right">
          <q-btn label="Detail" rounded color="secondary" @click="detailProduk(data.mm_id, data.id_gudang, data.id_agen)" outline></q-btn>
                 <q-btn icon="delete" rounded color="red" outline></q-btn>
        </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card v-if="!totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <img v-bind:style="$q.screen.lt.md?{'width': '90%'}:{'width':'35%'}" src="alsintan/no-results.png" alt="">
      </q-card-section>
    </q-card>
    <q-card v-if="totalSearch" class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <q-pagination
          v-model="current"
          :max="totalPages"
          input
          input-class="text-orange-10"
          @update:model-value="getIsiGudang()"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
export default {
  data () {
    return {
      search: '',
      current: 1,
      showadd: false,
      data: [],
      itemsPerPage: 12,
      resultCount: 0,
      nextPage: null,
      totalPages: 0,
      totalSearch: true
    }
  },
  methods: {
    detailProduk (idmm, idgudang, idagen) {
      this.$router.push({ name: 'detailMaterialMasterGudang', params: { idmm: btoa(idmm), idgudang: btoa(idgudang), idagen: btoa(idagen) } })
    },
    tambahProduk () {
      // const ids = btoa(id)
      // console.log('aa')
      this.$router.push({ name: 'materialMaster', params: { idgudang: this.$route.params.idgudang } })
    },
    getIsiGudang () {
      this.$showLoading()
      this.$axios.get(`alsintan/gudang-master/member/barang/${profile.member.id_member}/${atob(this.$route.params.idgudang)}?perpage=${this.itemsPerPage}&page=${this.current}&search=${this.search}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (res.data.result.length > 0) {
            this.totalSearch = true
            if (this.$parseResponse(res.data, false)) {
              const paginate = res.data.paginate
              this.resultCount = paginate.rowsNumber
              this.current = paginate.page
              this.itemsPerPage = paginate.rowsPerPage
              this.totalPages = Math.ceil(paginate.rowsNumber / paginate.rowsPerPage)
              this.data = res.data.result
            }
          } else {
            this.totalSearch = false
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getIsiGudang()
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 75%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
