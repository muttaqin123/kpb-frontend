<template>
  <q-page>
    <data-penebusan
      :kab="true"
      :detail-route="`detailPenebusanPuber${tphKab.name}`"
    />
  </q-page>
</template>
<script>
import dataPenebusan from 'src/pages/sharedpages/ealokasi/Penebusan'
import { tphKab } from 'src/helper/ListAkses'
export default {
  components: {
    dataPenebusan
  },
  data () {
    return {
      tphKab
    }
  }
}
</script>
