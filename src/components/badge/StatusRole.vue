<template>
  <q-badge
    rounded
    :color="getColor(status)"
    :label="getLabel(status)"
    class="q-pa-sm"
  />
</template>
<script>
export default {
  props: {
    status: String
  },
  methods: {
    getLabel (status) {
      if (status === '0') {
        return 'Menunggu Aktivasi'
      } else if (status === '1') {
        return 'Aktif'
      } else {
        return 'Ditolak'
      }
    },
    getColor (status) {
      if (status === '0') {
        return 'warning'
      } else if (status === '1') {
        return 'positive'
      } else {
        return 'negative'
      }
    }
  }
}
</script>
