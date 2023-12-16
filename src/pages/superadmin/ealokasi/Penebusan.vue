<template>
  <q-page padding>
    <data-penebusan
      :detail-route="`detailPenebusanPuberAdmin`"
    />
  </q-page>
</template>
<script>
import dataPenebusan from 'src/pages/sharedpages/ealokasi/Penebusan'
export default {
  components: {
    dataPenebusan
  },
  data () {
    return {
    }
  }
}
</script>
