<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURDKPProv"
      statusTolak="6"
      statusKonfirmasi="8"
      :endPoint="`kur/pengajuan-wilayah-dinas-prov-dkp`"
      :statusOn="11"
    />
  </q-page>
</template>
<script>
import kurPage from '../../../sharedpages/kur/Index.vue'
export default {
  components: {
    kurPage
  }
}
</script>
