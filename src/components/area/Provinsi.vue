<template>
  <q-select
    :class="type"
    v-model="provinsi"
    :outlined="outline"
    :options="listProv"
    option-label="nama"
    option-value="id_prov"
    label="Pilih Provinsi"
    :rules="[(val) => val || 'Isi']"
    @update:model-value="getKab"
    use-input
    @filter="filterProv"
    clearable
  />
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
let listProv = []
export default {
  async created () {
    listProv = [{
      id: '18',
      nama: 'LAMPUNG'
    }]
    // await this.$axios
    //   .get('/area/prov')
    //   .then((res) => {
    //     if (this.$parseResponse(res.data)) listProv = res.data.data
    //   })
    //   .catch(() => this.$commonErrorNotif())
  },
  setup () {
    const $store = useStore()

    const provinsi = computed({
      get: () => $store.state.area.provinsi,
      set: (val) => {
        $store.commit('area/updateProvinsi', val)
      }
    })

    return {
      provinsi
    }
  },
  data () {
    return {
      listProv: listProv
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
    type: {
      type: String
    },
    outline: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getKab (val) {
      if (val) {
        this.$showLoading()
        this.$axios
          .get(`/areas/kabupaten/${val.id}`)
          .finally(() => this.$hide())
          .then((res) => {
            if (this.$parseResponse(res.data, false)) {
              this.$store.commit('area/updateListKabupaten', res.data.result)
              this.$store.commit('area/updateKabupaten', null)
            }
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        this.$resetArea()
      }
      if (this.withAction) this.action()
    },
    filterProv (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.listProv = listProv.filter(
          (v) => v.nama.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
