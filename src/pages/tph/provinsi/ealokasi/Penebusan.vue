<template>
  <q-page>
    <data-penebusan
      :kab="false"
      :detail-route="`detailPenebusanPuber${tphProv.name}`"
    />
  </q-page>
</template>
<script>
import dataPenebusan from 'src/pages/sharedpages/ealokasi/Penebusan'
import { tphProv } from 'src/helper/ListAkses'
export default {
  components: {
    dataPenebusan
  },
  data () {
    return {
      tphProv
    }
  }
}
</script>
