<template>
  <bpjs-view
    endPoint="master/bpjs"
    detailRoute="detailDataAsuransiBPJSSuperAdmin"
    :statusOn="11"
    statusKonfirmasi="11"
    statusTolak="12"
    :sektor="false"
  />
</template>
<script>
// master/bpjs
import bpjsView from '../../sharedpages/asuransi/bpjs/Index.vue'
export default {
  components: {
    bpjsView
  }
}
</script>
