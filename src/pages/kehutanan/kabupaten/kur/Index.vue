<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURDinasKehutananKab"
      statusTolak="6"
      statusKonfirmasi="5"
      :endPoint="`kur/pengajuan-wilayah-dinas-kab/${$getProfile().member.id_kab}/16`"
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
