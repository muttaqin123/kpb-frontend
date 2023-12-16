<template>
  <q-select
    :class="type"
    v-model="desa"
    :outlined="outline"
    :options="listDesa.items"
    option-label="name"
    option-value="id"
    label="Pilih Kelurahan/Desa/Pekon"
    @filter="filterDesa"
    use-input
    :rules="[(val) => val || 'Mohon Isi']"
    @update:model-value="action"
    clearable
  />
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const $store = useStore()
    const desa = computed({
      get: () => $store.state.area.desa,
      set: (val) => {
        $store.commit('area/updateDesa', val)
      }
    })

    const listDesa = reactive({
      items: $store.state.area.listDesa
    })

    const filterDesa = (val, update) => {
      update(() => {
        const needle = val.toLowerCase()
        listDesa.items = $store.state.area.listDesa.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }

    return {
      desa,
      listDesa,
      filterDesa
    }
  },
  props: {
    action: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    }
  }
}
</script>
