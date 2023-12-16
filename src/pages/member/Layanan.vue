<template>
  <q-page padding>
    <div class="text-h5 text-bold text-blue-grey-14 q-mt-sm">
      Silahkan Pilih Layanan Yang Anda Sukai
    </div>
    <q-btn label="Kembali" color="primary" unelevated class="q-mt-md" :to="{name: 'indexRoleMember'}"/>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="m in listMenu" :key="m">
        <menu-utama
          :title="m.layanan.nama_layanan"
          :deskripsi="m.layanan.keterangan"
          labelBtn="Lihat Menu"
          withImage
          :image="`${$baseURL}image/layanan/${m.layanan.gambar}`"
          withParam
          :routeWithParam="{ name: m.layanan.routeIndex, params: { idRole: this.$route.params.idRole, idLayanan: m.id_layanan } }"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      listMenu: []
    }
  },
  created () {
    this.$showLoading()
    this.$axios.get(`users/layanan/${this.$route.params.idRole}`, this.$createToken())
      .finally(() => this.$hide())
      .then(res => {
        if (this.$parseResponse(res.data, false)) {
          this.listMenu = res.data.result
        }
      }).catch(() => this.$commonErrorNotif())
  }
}
</script>
