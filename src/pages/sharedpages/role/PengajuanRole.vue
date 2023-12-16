<template>
  <q-page padding>
    <q-table
      :title="`Data Pengajuan Role ${this.namaDinas}`"
      :rows="rows"
      :columns="columns"
      flat
      row-key="id"
      :filter="filter"
      :loading="loading"
      v-model:selected="selected"
      selection="multiple"
    >
      <template v-slot:top-right >
        <q-input class="q-mr-sm" borderless dense debounce="300" v-model="filter" placeholder="Cari Nik">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="q-gutter-sm" v-if="this.selected.length > 0">
          <q-btn
            label="Terima yang dipilih"
            unelevated
            color="positive"
            @click="openDialogMany('1', this.selected)"
          />
          <q-btn
            label="Tolak yang dipilih"
            unelevated
            color="negative"
            @click="openDialogMany('2', this.selected)"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox dense v-model="props.selected"/>
          </q-td>
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="nama" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="nama_role" :props="props">
            {{ props.row.nama_role }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Tolak" @click="openDialog('2', props.row)" unelevated color="negative"/>
              <q-btn label="Terima" @click="openDialog('1', props.row)" color="positive" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  props: {
    namaDinas: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: [],
      rows: [],
      filter: '',
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama Member', field: 'nama' },
        { name: 'nama_role', align: 'left', label: 'Nama Role', field: 'nama_role' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false
    }
  },
  async created () {
    console.log(this.namaDinas)
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(`users/get-all-role-member-by-dinas/${this.dinas}`)
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (acc, data) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.put(`users/update-status-role-member/${data.id}`, {
          status: acc
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    openDialogMany (acc, data) {
      // console.log(data)
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.put('users/update-status-role-all-member', {
          data: data,
          status: acc
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            this.selected = []
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
