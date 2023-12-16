<template>
  <q-page>
    <div :class="`${!this.$q.screen.xs ? 'q-pl-xl card-honey ' : 'q-px-sm'} bg-yellow-15`">
      <div :class="`${!this.$q.screen.xs ? 'q-ml-xl' : 'q-mx-sm'} row justify-between`">
        <div class="col-md-6 col-sm-12 column q-gutter-md q-py-md" style="z-index: 1">
          <div class="row">
            <q-btn
              :to="{
                name: 'indexLayanan', params: { idRole: $route.params.idRole }
              }"
              icon="mdi-arrow-left"
              label="Kembali"
              rounded
              class="bg-white text-grey-9"
              no-caps/>
          </div>
          <span class="text-h5 green-15 tex text-weight-bold">Layanan Bantuan Permodalan e-KPB</span>
          <span class="text-body text-grey-8">Memberikan bantuan permodalan dalam bentuk kredit usaha tani untuk meningkatkan produktivitas usaha tani</span>
        </div>
        <div v-if="!this.$q.screen.xs" class="col-md-2 q-mr-xl flex flex-center">
          <q-img src="img/kur/KUR.png" style="width: 50%"/>
        </div>
      </div>
    </div>
    <div :class="`${!this.$q.screen.xs ? 'q-px-xl q-mx-xl ' : 'q-mx-sm'} q-mt-lg`">
      <q-card
        v-for="(bank,i) in listBank"
        :key="i"
        class="q-my-md">
        <div class="row q-pa-md items-center q-gutter-sm">
          <div class="col-md-8 col-xs-9 column q-ml-md">
            <span class="text-weight-bold text-h6">{{ bank.nama_bank }}</span>
            <span>Bantuan Permodalan KUR</span>
          </div>
          <q-space/>
          <div :class="`col-auto ${!this.$q.screen.xs ? '' : 'q-py-md'}`">
            <q-btn :to="{ name: 'persyaratanBank', params: {idBank: bank.id} }" label="Lihat Persyaratan" no-caps rounded class="bg-green-15 text-white"/>
          </div>
        </div>
      </q-card>
    </div>
    <div class="flex flex-center absolute-bottom" style="background-color:#024830; color: white">
      <span>Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      listBank: []
    }
  },
  created () {
    this.getBank()
  },
  methods: {
    getBank () {
      this.$showLoading()
      this.$axios.get('master/bank', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listBank = res.data.result.map(r => {
              return { ...r, opened: false }
            })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
