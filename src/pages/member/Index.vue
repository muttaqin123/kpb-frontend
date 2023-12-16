<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <carousel-menu/>
      </div>
    </div>
    <q-btn
      label="Tambah Role"
      class="q-mt-lg"
      unelevated
      color="primary"
      :to="{name: 'indexTambahRoleMember'}"
      icon="add"
      v-if="dataNIK.verified && loaded"
    />
    <banner
      :msg="`${dataNIK.alasan_penolakan === null || dataNIK.alasan_penolakan === 'null' || dataNIK.alasan_penolakan === '-' ? 'NIK anda belum tervalidasi' : `NIK Ditolak karena ${dataNIK.alasan_penolakan}`}`"
      type="negative"
      v-if="!dataNIK.verified"
    />
    <banner
      msg="Lengkapi Biodata Anda Segera"
      type="negative"
      v-if="this.$getProfile().member.no_hp == '' || this.$getProfile().member.no_hp == null || this.$getProfile().member.no_wa == '' || this.$getProfile().member.no_wa == null || this.$getProfile().member.email == '' || this.$getProfile().member.email == null"
    />
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md justify-center" v-if="listMenu.length < 1 && loaded">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-img src="/img/ilustration/norole.png" height="450px"/>
        <!-- <div class="text-center text-subtitle1">
          Pilih Role
        </div> -->
      </div>
    </div>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md" v-if="!loaded && $store.state.verified.verified">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-skeleton height="155px" square />
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-skeleton height="155px" square />
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <q-skeleton height="155px" square />
      </div>
    </div>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm q-mt-md">
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="m in listMenu" :key="m">
        <menu-utama
          :title="m.role.nama_role"
          :deskripsi="m.role.keterangan"
          labelBtn="Lihat Layanan"
          withParam
          :routeWithParam="{ name: 'indexLayanan', params: {idRole: m.id_role} }"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import carouselMenu from '../../components/Crousel.vue'
import banner from '../../components/card/Banner.vue'
export default {
  components: {
    carouselMenu,
    banner
  },
  data () {
    return {
      listMenu: [],
      loaded: false,
      dataNIK: {
        verified: false,
        alasan_penolakan: null
      }
    }
  },
  created () {
    this.cekValidasiKtp()
  },
  methods: {
    cekValidasiKtp () {
      this.$showLoading()
      this.$axios.get(`users/cek-verified-ktp/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => { this.$hide() })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.dataNIK = res.data.result
            if (res.data.result.verified) {
              // this.$store.commit('verified/updateVerified', true)
              this.getRoles()
            }
            // else {
            //   // this.$store.commit('verified/updateVerified', false)
            // }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getRoles () {
      this.loaded = false
      this.$axios.get(`users/role-member/${this.$getProfile().member.id_member}?status=1`, this.$createToken())
        .finally(() => { this.loaded = true })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listMenu = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
