<template>
  <q-banner inline-actions :class="`q-mt-md text-white bg-${type}`">
    {{ msg }}
  </q-banner>
</template>
<script>
export default {
  props: {
    msg: String,
    type: String
  }
}
</script>
