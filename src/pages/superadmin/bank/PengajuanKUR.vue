<template>
  <q-page padding>
    <kur-page
      :endPoint="`kur/pengajuan-wilayah-dinas-kpb-center`"
      detailRoute="detailKURSuperAdmin"
      :statusOn="11"
      statusKonfirmasi="11"
      statusTolak="12"
      :sektor="false"
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
