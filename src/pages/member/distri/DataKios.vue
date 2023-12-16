<template>
  <list-kios
    :nik="$getProfile().nik"
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
