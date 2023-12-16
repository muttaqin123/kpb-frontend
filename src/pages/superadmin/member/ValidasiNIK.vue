<template>
  <q-page padding>
    <q-table
      title="Menu Validasi NIK"
      :rows="rows"
      :columns="columns"
      flat
      row-key="nik"
      :filter="filter"
      :loading="loading"
      v-model:selected="selected"
      selection="multiple"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Role"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
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
            @click="openDialogMany()"
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
          <q-td key="jenis_kelamin" :props="props">
            {{ props.row.jenis_kelamin }}
          </q-td>
          <q-td key="area" :props="props">
            {{ parseArea(props.row) }}
          </q-td>
          <q-td key="alamat" :props="props">
            {{ props.row.alamat }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Tolak" @click="openDialog(false, props.row)" unelevated color="negative"/>
              <q-btn label="Terima" @click="openDialog(true, props.row)" color="primary" unelevated/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
import parseArea from '../../../helper/ParseArea'
export default {
  data () {
    return {
      rows: [],
      selected: [],
      filter: '',
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama', align: 'left', label: 'Nama Member', field: 'nama' },
        { name: 'jenis_kelamin', align: 'left', label: 'Jenis Kelamin', field: 'jenis_kelamin' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'alamat', align: 'left', label: 'Alamat', field: 'alamat' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    parseArea,
    getData () {
      this.loading = true
      this.$axios.get('users/ktp-belum-aktif', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          } else {
            this.rows = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (acc, data) {
      if (acc) {
        this.$q.dialog({
          title: 'Konfirmasi',
          message: 'Apakah anda yakin?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.changeStatus(acc, data)
        })
      } else {
        this.$q.dialog({
          title: 'Konfirmasi',
          message: 'Alasan Penolakan?',
          prompt: {
            model: '',
            type: 'text' // optional,
          },
          cancel: true,
          persistent: true
        }).onOk(alasan => {
          if (alasan) {
            this.changeStatus(acc, data, alasan)
          } else {
            alert('Mohon isi alasan')
            this.openDialog(acc, data)
          }
        })
      }
    },
    changeStatus (acc, data, alasan = null) {
      this.$showLoading()
      this.$axios.put(`users/verifikasi-ktp/${data.nik}`, {
        status: acc,
        alasan_penolakan: alasan
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getData()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialogMany () {
      // console.log(data)
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.put('users/verifikasi-all-ktp', {
          data: this.selected,
          status: true
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
