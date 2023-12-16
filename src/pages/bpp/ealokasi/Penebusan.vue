<template>
  <q-page>
    <data-penebusan
      :kab="true"
      :kec="true"
      :detail-route="`detailPenebusanPuber${bppKec.name}`"
    />
  </q-page>
</template>
<script>
import dataPenebusan from 'src/pages/sharedpages/ealokasi/Penebusan'
import { bppKec } from 'src/helper/ListAkses'
export default {
  components: {
    dataPenebusan
  },
  data () {
    return {
      bppKec
    }
  }
}
</script>
