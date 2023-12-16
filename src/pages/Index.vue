<template>
  <q-page padding>
    <div class="">
      <q-img class="border" style="max-height: 250px;min-height: 180px;" src="img/imageTph.png">
        <div class="absolute-full border">
          <div class="q-pa-sm row">
            <div class="col-md-6 col-xs-12 column">
              <span class="text-h5 text-weight-bold">Selamat Datang Di KPB</span>
              <span class="">KPB adalah singkatan dari Kartu Petani Berjaya yang merupakan
              sebuah aplikasi website untuk mempermudah para petani dalam urusan
              pendistribusian dan penerimaan bantuan</span>
            </div>
          </div>
        </div>
      </q-img>
    </div>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="m in listMenu" :key="m">
        <menu-utama
          :title="m.nama"
          deskripsi="Ini Adalah Menu"
          :routeName="m.routeName"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      listMenu: this.$q.localStorage.getItem('menu')
    }
  }
}
</script>
