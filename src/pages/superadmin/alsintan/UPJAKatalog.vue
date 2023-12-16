<template>
  <q-page padding>
    <div>
      <q-card flat>
        <q-card-section class="q-pa-sm">
          <q-toolbar class="GNL__toolbar">
          <q-input :style="showadd ? {'width': '78%'} : {'width': '97%'}" outlined dense v-model="search" color="bg-grey-7 shadow-1" placeholder="Search for topics, locations & sources">
            <template v-slot:prepend>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
            <template v-slot:append>
              <q-btn
                flat
                dense
                round
                aria-label="Menu"
                icon="arrow_drop_down"
              >
                <q-menu anchor="bottom end" self="top end">
                  <div class="q-pa-md" style="width: 400px">
                    <div class="text-body2 text-grey q-mb-md">
                      Narrow your search results
                    </div>

                    <div class="row items-center">
                      <div class="col-3 text-subtitle2 text-grey">
                        Exact phrase
                      </div>
                      <div class="col-9 q-pl-md">
                        <q-input dense v-model="exactPhrase" />
                      </div>

                      <div class="col-3 text-subtitle2 text-grey">
                        Has words
                      </div>
                      <div class="col-9 q-pl-md">
                        <q-input dense v-model="hasWords" />
                      </div>

                      <div class="col-3 text-subtitle2 text-grey">
                        Exclude words
                      </div>
                      <div class="col-9 q-pl-md">
                        <q-input dense v-model="excludeWords" />
                      </div>

                      <div class="col-3 text-subtitle2 text-grey">
                        Website
                      </div>
                      <div class="col-9 q-pl-md">
                        <q-input dense v-model="byWebsite" />
                      </div>

                      <div class="col-12 q-pt-lg row justify-end">
                        <q-btn flat dense no-caps color="grey-7" size="md" style="min-width: 68px;" label="Search" v-close-popup />
                        <q-btn flat dense no-caps color="grey-7" size="md" style="min-width: 68px;" @click="onClear" label="Clear" v-close-popup />
                      </div>
                    </div>
                  </div>
                </q-menu>
              </q-btn>
            </template>
          </q-input>
          <q-space />
            <q-btn v-if="showadd && !$q.screen.lt.md" outline label="Tambah Produk" />
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
          </q-toolbar>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm " style="padding-top: 25px">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="data in data" :key="data">
        <q-card class="">
          <q-img :src="data.img" height="220px">
            <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip>
          </q-img>

          <q-card-section>
            <q-btn
              fab
              color="teal-7"
              icon="shopping_cart_checkout" padding="sm"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">
              {{ data.title }}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              {{ data.caption }}
            </div>
            <div>
              <q-rating
                v-model="data.rating"
                max="5"
                size="1.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half" readonly
                no-dimming
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">{{ data.amount }}</span>
              <span class="text-h6 float-right">
          <q-btn label="Detail" rounded color="secondary" @click="detailProduk(9)" outline></q-btn>
                 <q-btn icon="delete" rounded color="red" outline></q-btn>
        </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-card class="no-border no-shadow bg-transparent">
      <q-card-section class="flex flex-center q-pa-sm">
        <q-pagination
          v-model="current"
          :max="5"
          input
          input-class="text-orange-10"
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
      data: [
        {
          title: 'Our Changing Planet',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          rating: 2,
          amount: '$30',
          img: 'alsintan/c-d-x-PDX_a_82obo-unsplash.jpeg',
          chip: 'Discount 90%',
          chip_color: 'grey-4',
          chip_class: 'text-blue absolute-top-right'
        },
        {
          title: 'Our Changing Planet',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          rating: 4,
          amount: '$15',
          img: 'alsintan/frankie-valentine-VghbBAYqUJ0-unsplash.jpeg'
        },
        {
          title: 'Our Changing Planet',
          caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          rating: 1,
          amount: '$50',
          img: 'alsintan/frankie-valentine-VghbBAYqUJ0-unsplash.jpeg',
          chip: 'Stok Habis',
          chip_color: 'grey-8',
          chip_class: 'text-white absolute-top-right'
        }
      ]
    }
  },
  methods: {
    detailProduk (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'manajemenDetailProdukAlsintanSuperAdmin', params: { id: ids } })
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
