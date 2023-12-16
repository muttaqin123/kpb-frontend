<template>
  <jasindo-view
    detailRoute="detailDataAsuransiJasindoSuperAdmin"
    endPoint="master/asuransis"
    :statusOn="11"
    statusKonfirmasi="11"
    statusTolak="12"
  />
</template>
<script>
import jasindoView from '../../sharedpages/asuransi/jasindo/Index.vue'
export default {
  components: {
    jasindoView
  }
}
</script>
