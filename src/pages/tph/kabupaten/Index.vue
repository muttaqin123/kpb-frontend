<template>
  <q-page>
    <dashboard-dinas
      :kab="true"
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
