<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="card q-pa-md col-6">
            <q-img src="img/card.png">
              <div class="absolute-bottom bg-transparent q-ml-xl row">
                <div class="col-3"></div>
                <div class="col column q-mb-md q-ml-sm">
                  <span class="q-ml-lg text-h4 text-weight-bold text-red">{{ nik }}</span>
                  <span class="q-ml-xl text-red text-h6">Rudi Hartawan</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      nik: '1234567890123456'
    }
  },
  created () {
    this.formatValue()
  },
  methods: {
    formatValue () {
      const value = this.nik.replace(/\D/g, '').substring(0, 16)
      const parts = []
      for (let i = 0; i < 16; i += 4) {
        parts.push(value.substring(i, i + 4))
      }
      this.nik = parts.join(' ')
    }
  }
}
</script>
