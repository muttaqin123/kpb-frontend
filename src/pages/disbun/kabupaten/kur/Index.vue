<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURDisbunKab"
      statusTolak="6"
      statusKonfirmasi="5"
      :endPoint="`kur/pengajuan-wilayah-dinas-kab/${$getProfile().member.id_kab}/6`"
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
