<template>
  <q-select
    :class="type"
    v-model="kecamatan"
    :outlined="outline"
    :options="listKec.items"
    option-label="name"
    option-value="id"
    label="Pilih Kecamatan"
    @update:model-value="getDesa"
    use-input
    @filter="filterKec"
    :rules="[(val) => val || 'Mohon Isi']"
    clearable
  />
</template>
<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { LocalStorage } from 'quasar'
export default {
  setup () {
    const $store = useStore()
    const kecamatan = computed({
      get: () => $store.state.area.kecamatan,
      set: (val) => {
        $store.commit('area/updateKecamatan', val)
      }
    })

    const listKec = reactive({
      items: $store.state.area.listKecamatan
    })

    const filterKec = (val, update) => {
      update(() => {
        const needle = val.toLowerCase()
        listKec.items = $store.state.area.listKecamatan.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    }

    return {
      kecamatan,
      listKec,
      filterKec
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
    loadDesa: {
      type: Boolean,
      default: false
    },
    desa: {
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
        .get('/areas/kecamatan/' + LocalStorage.getItem('datauser').member.reg_regencies.id)
        .finally(() => this.$hide())
        .then((res) => {
          if (this.$parseResponse(res.data, false)) {
            this.$store.commit('area/updateListDesa', res.data.result)
            this.$store.commit('area/updateDesa', null)
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
    if (this.loadDesa) {
      this.getDesa(this.desa)
    }
  },
  methods: {
    getDesa (val) {
      if (val) {
        this.$showLoading()
        this.$axios
          .get(`/areas/desa/${val.id}`)
          .finally(() => this.$hide())
          .then((res) => {
            if (this.$parseResponse(res.data, false)) {
              this.$store.commit('area/updateListDesa', res.data.result)
              this.$store.commit('area/updateDesa', null)
            }
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        this.$resetKec(false)
      }
      if (this.withAction) this.action()
    }
  }
}
</script>
