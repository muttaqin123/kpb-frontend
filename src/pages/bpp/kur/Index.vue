<template>
  <q-page padding>
    <kur-page
      detailRoute="detailKURTPHProv"
      statusTolak="9"
      statusKonfirmasi="8"
      :endPoint="`kur/pengajuan-wilayah-dinas-prov/1`"
      :statusOn="1"
    />
  </q-page>
</template>
<script>
import kurPage from '../../sharedpages/kur/Index.vue'
export default {
  components: {
    kurPage
  }
}
</script>
