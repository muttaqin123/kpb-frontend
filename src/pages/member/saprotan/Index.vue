<template>
  <q-page padding>
    <!-- <div>
      <q-card flat class="q-pa-md">
        <q-card-section class="q-pa-sm">
          <q-input outlined dense v-model="filter" color="bg-grey-7 shadow-1" placeholder="Search for topics, locations & sources">
            <template v-slot:prepend>
              <q-icon v-if="filter === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="filter = ''" />
            </template>
          </q-input>
          <q-space />
            </q-btn v-if="showadd && !$q.screen.lt.md" outline label="Tambah Produk" />
            <q-btn  round dense flat color="text-grey-7" size="25px" @click="showadd = true" icon="apps">
              <q-tooltip>Tools</q-tooltip>
              <q-menu v-if="$q.screen.lt.md">
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section>Tambah Produk</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
        </q-card-section>
      </q-card>
    </div> -->
    <div class="row q-col-gutter-md" v-if="loaded">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="(data, i) in datas" :key="i">
        <q-card flat>
          <q-img :src="`https://api.e-kpb.lampungprov.go.id:9068/api/v1/file-sarpras/${data.master_barang_distri.master_barang_pabrik.material_master.file}`" height="220px">
            <!-- <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip> -->
          </q-img>

          <!-- <q-card-section>
            <q-btn
              fab
              color="teal-7"
              icon="shopping_cart_checkout" padding="sm"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />
          </q-card-section> -->

          <q-card-section>
            <div class="text-h6">
              {{ data.master_barang_distri.master_barang_pabrik.material_master.mm_nama }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              {{ data.keterangan }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">{{ $formatPrice(data.harga_kios) }}</span>
              <span class="text-h6 float-right">
                <q-btn label="Detail" rounded color="secondary" outline></q-btn>
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-mt-sm" v-else>
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="n in 3" :key="n">
        <q-card style="max-width: 300px" flat>

          <q-skeleton height="200px" square />

          <q-card-actions align="left" class="q-gutter-md">
            <q-skeleton type="QBtn" />
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-card class="no-border no-shadow bg-transparent" v-if="datas.length > 0">
      <q-card-section class="flex flex-center q-pa-sm">
        <q-pagination
          v-model="current"
          :max="paginate.rowsNumber >= paginate.rowsPerPage ? Math.ceil(paginate.rowsNumber/paginate.rowsPerPage) : 1"
          input
          input-class="text-orange-10"
          @update:model-value="getData"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      current: 1,
      loaded: false,
      datas: [],
      paginate: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  created () {
    this.getData(false)
  },
  methods: {
    getData (val) {
      if (val) this.paginate.page = val
      this.loaded = false
      this.$axios.get('master/barang-kios', this.$createPaginate({
        pagination: this.paginate,
        filter: this.filter
      }))
        .finally(() => { this.loaded = true })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.datas = res.data.result
            this.paginate = res.data.paginate
          } else {
            this.datas = []
          }
        }).catch(() => this.$commonErrorNotif())
    }
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
