<template>
  <div>{{ title }}</div>
  <div class="text-bold text-subtitle1">{{ subTitle }}</div>
</template>
<script>
export default {
  props: {
    title: String,
    subTitle: String
  }
}
</script>
