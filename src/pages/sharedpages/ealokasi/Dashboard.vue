<template>
  <q-page class="q-pa-md">
    <div class="column">
      <div class="q-ma-md text-center">
        <div class="text-h5 text-weight-bold">
          Dashboard Admin Dinas {{ this.$getProfile().nama }}
        </div>
        <div class="text-subtittle text-grey-8">
          Pusat pengelolaan Seluruh {{ this.kab ? this.kec ? this.$getProfile().member.reg_districts.name : this.$getProfile().member.reg_regencies.name : 'Kabupaten Lampung' }}
        </div>
      </div>
      <q-img src="img-admin/1.png"/>
      <div class="row q-mt-md" v-if="this.data.length === 0">
        <div
          v-for="i in 5"
          :key="i" class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
          <q-card flat bordered style="max-width: 500px; background-color: transparent">
            <div class="q-pa-sm">
              <q-skeleton type="text" square height="40px" width="30%"/>
              <q-skeleton type="text" square height="30px" width="60%"/>
            </div>
          </q-card>
        </div>
      </div>
      <div class="row q-mt-md" v-else>
        <div
          v-for="i in data"
          :key="i"
          class="col-md-3 col-sm-6 col-xs-12 q-pa-sm">
          <div class="bg-green-10 q-pa-md text-white column" style="border-radius: 10px">
            <span class="text-h5">{{ this.$formatNumber(i.jumlah) }}</span>
            <span class="text-yellow-10">{{ i.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  props: {
    kab: {
      type: Boolean,
      default: false
    },
    kec: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: [],
      params: {}
    }
  },
  async created () {
    if (this.kab) {
      this.params.kab = this.$getProfile()?.member?.id_kab
    }
    if (this.kec) {
      this.params.kec = this.$getProfile()?.member?.id_kec
    }
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/check/getResult', this.$createToken(this.params))
        .then(res => {
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
