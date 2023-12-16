<template>
  <q-select
    :class="type"
    v-model="kabupaten"
    :outlined="outline"
    :options="listKab.items"
    option-label="name"
    option-value="id"
    label="Pilih Kabupaten"
    @update:model-value="getKec"
    use-input
    @filter="filterKab"
    :rules="[(val) => val || 'Isi']"
    clearable
  />
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const $store = useStore()
    const kabupaten = computed({
      get: () => $store.state.area.kabupaten,
      set: (val) => {
        $store.commit('area/updateKabupaten', val)
      }
    })

    const listKab = reactive({
      items: $store.state.area.listKabupaten
    })

    const filterKab = (val, update) => {
      update(() => {
        const needle = val.toLowerCase()
        listKab.items = $store.state.area.listKabupaten.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }

    return {
      kabupaten,
      listKab,
      filterKab
    }
  },
  props: {
    withAction: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default: () => {}
    },
    'auto-load': {
      default: false,
      type: Boolean
    },
    loadKec: {
      type: Boolean,
      default: false
    },
    kec: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  created () {
    if (this.autoLoad) {
      this.$axios
        .get('/areas/kabupaten/18')
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data, false)) {
            this.$store.commit('area/updateListKabupaten', res.data.result)
            this.$store.commit('area/updateKabupaten', null)
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
    if (this.loadKec) {
      this.getKec(this.kec)
    }
  },
  methods: {
    getKec (val) {
      if (val) {
        this.$showLoading()
        this.$axios
          .get(`areas/kecamatan/${val.id}`)
          .finally(() => this.$hide())
          .then((res) => {
            if (this.$parseResponse(res.data, false)) {
              this.$store.commit('area/updateListKecamatan', res.data.result)
              this.$store.commit('area/updateKecamatan', null)
              this.$store.commit('area/updateListDesa', [])
              this.$store.commit('area/updateDesa', null)
            }
          })
      } else {
        this.$resetKab(false)
      }
      if (this.withAction) this.action()
    }
  }
}
</script>
