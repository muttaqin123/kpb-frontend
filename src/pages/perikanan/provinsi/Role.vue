<template>
  <q-page>
    <pengajuan-role
      :nama-dinas="dinas"
      />
  </q-page>
</template>
<script>
import pengajuanRole from 'src/pages/sharedpages/role/PengajuanRole'
export default {
  components: {
    pengajuanRole
  },
  data () {
    return {
      dinas: 'Peternakan'
    }
  }
}
</script>
