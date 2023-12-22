<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm row items-center">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold col">Detail Artikel</span>
      </div>
    </div>

    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-pa-sm q-pt-md`">
    <h3>{{ form.judul }}</h3>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mb-md q-pa-sm q-pt-md`">
      <q-img
          :src="`${$baseURL}/file-klinik/${form.gambar}`"
          style="width: 100%; height: 500px; border-radius: 40px;"
        />
        </div>
        <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mb-md q-pa-sm q-pt-md`">
          <div class="row" style="justify-content: space-between;">
            <div>
              <div class="">Pembuat Artikel</div>
              <h5 class="q-my-sm">Universitas Lampung</h5>
            </div>
          <div>

              <h6 class="q-my-sm">{{ $parseDate(form.created_at).fullDate }}</h6>
          </div>
          </div>
</div>
<div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mb-md q-pa-sm q-pt-md`">
  <div v-html="form.narasi"></div>

</div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        judul: '',
        gambar: '',
        narasi: '',
        created_at: ''
      }
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true

      this.$axios.get(`klinik/artikel/${this.$route.params.id}`)
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.form = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
