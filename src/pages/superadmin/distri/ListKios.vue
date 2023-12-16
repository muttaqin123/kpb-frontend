<template>
  <list-kios
    :nik="this.$route.params.nik"
    canAdd
  />
</template>
<script>
import listKios from 'src/pages/sharedpages/distri/ListKios.vue'
export default {
  components: {
    listKios
  }
}
</script>
