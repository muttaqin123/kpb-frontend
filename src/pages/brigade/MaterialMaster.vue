<template>
  <q-page padding>
    <div>
      <q-card flat>
        <q-card-section class="q-pa-sm">
          <q-toolbar class="GNL__toolbar">
            <q-input style="width: 100%"  @update:model-value="getMaterialMaster()" outlined dense v-model="search" color="bg-grey-7 shadow-1" placeholder="cari berdasarkan nama material master">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
              </template>
            </q-input>
          </q-toolbar>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="totalSearch" class="row q-col-gutter-sm " style="padding-top: 25px">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="d in data" :key="d">
        <q-card class="">
          <q-img :src="d.mm_img != null ? $baseURL+'file-sarpras/'+d.mm_img : 'alsintan/barangsewa/tractorsampel.png'" height="220px" />
          <q-card-section>
            <div class="text-h6">
              {{ d.mm_nama }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              <b>Kategori : </b>{{d.child_dtlk_nama }} <br /> <b>Merk/ Seri : </b>{{d.mm_merk}}
            </div>
            <div style="color:gray;" class="text-subtitle5 text-justify q-mt-sm">Klik detail untuk Memasukan kegudang & SN</div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">&nbsp;</span>
              <span class="text-h6 float-right">
          <q-btn label="Detail" rounded color="secondary" @click="detailProduk(d.mm_id)" outline></q-btn>
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
          @update:model-value="getMaterialMaster()"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      current: 1,
      showadd: false,
      data: [],
      order: 1,
      itemsPerPage: 12,
      resultCount: 0,
      nextPage: null,
      totalPages: 0,
      totalSearch: true
    }
  },
  methods: {
    detailProduk (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailMaterialMaster', params: { id: ids, idgudang: this.$route.params.idgudang } })
    },
    getMaterialMaster () {
      // this.$showLoading()
      this.$axios.get(`alsintan/material-master?perpage=${this.itemsPerPage}&page=${this.current}&search=${this.search}`, this.$createToken())
        // .finally(() => this.$hide())
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
        }).catch((e) => console.log(e))
      // this.$commonErrorNotif())
    }
  },
  created () {
    this.getMaterialMaster()
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
