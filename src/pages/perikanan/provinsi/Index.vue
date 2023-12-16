<template>
  <q-page>
    <dashboard-dinas
      :kab="false"
    />
  </q-page>
</template>
<script>
import dashboardDinas from 'src/pages/sharedpages/ealokasi/Dashboard'
export default {
  components: {
    dashboardDinas
  },
  data () {
    return {
    }
  }
}
</script>
