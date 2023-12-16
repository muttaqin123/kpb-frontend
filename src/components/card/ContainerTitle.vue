<template>
  <div class=" q-mt-lg text-center column">
    <span :class="this.$q.screen.xs ? 'text-h6 text-weight-bold' : 'text-h4 text-weight-bold'">
      {{ title }}
    </span>
    <span class="text-subtittle1 q-mt-sm text-grey-8">
      {{ subtitle }}
    </span>
  </div>
  <div :class="`q-mt-md ${classType}`">
    <slot name="action"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: 'title',
      type: String
    },
    subtitle: {
      default: 'subtitle',
      type: String
    },
    classType: {
      default: '',
      type: String
    }
  }
}
</script>
