<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURDKPKab"
      statusTolak="6"
      statusKonfirmasi="5"
      :endPoint="`kur/pengajuan-wilayah-dinas-kab-dkp/${$getProfile().member.id_kab}`"
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
