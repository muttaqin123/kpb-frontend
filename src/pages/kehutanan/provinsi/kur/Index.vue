<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURDinasKehutananProv"
      statusTolak="9"
      statusKonfirmasi="8"
      :endPoint="`kur/pengajuan-wilayah-dinas-prov/16`"
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
