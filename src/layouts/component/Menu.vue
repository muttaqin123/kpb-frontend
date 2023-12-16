<template>
  <q-expansion-item
    class="q-ma-sm"
    :icon="icon"
    :label="label"
    :content-inset-level="1"
    v-if="hasChild"
    active-class="itemActive"
    >
    <q-item :to="{ name: s.to }" clickable class="GPL__drawer-item" active-class="menu-active" v-for="(s, i) in subMenu" :key="i">
      <q-item-section avatar>
        <q-icon :name="s.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ s.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>
  <q-item v-else clickable class="GPL__drawer-item" active-class="menu-active" :to="{name: to}">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'dashboard'
    },
    label: {
      type: String,
      default: '-'
    },
    to: {
      type: String,
      default: ''
    },
    hasChild: {
      default: false,
      type: Boolean
    },
    subMenu: {
      type: Array,
      default: () => []
    }
  }
}
</script>
