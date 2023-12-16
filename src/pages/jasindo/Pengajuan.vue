<template>
  <q-page padding>
    <q-table
      title="Data Pengajuan Asuransi Jasindo"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="jenis_asuransi" :props="props">
            {{ props.row.jenis_asuransi }}
          </q-td>
          <q-td key="nama_kelompok" :props="props">
            {{ props.row.nama_kelompok }}
          </q-td>
          <q-td key="nama_ketua_kelompok" :props="props">
            {{ props.row.nama_ketua_kelompok }}
          </q-td>
          <q-td key="jalur_distribusi" :props="props">
            {{ props.row.jalur_distribusi }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.musim_tanam ?? '-' }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.metode_tanam ?? '-' }}
          </q-td>
          <q-td key="musim_tanam" :props="props">
            {{ props.row.prakiraan_tanam ? $parseDate(props.row.prakiraan_tanam).fullDate : '-' }}
          </q-td>
          <q-td key="prakiraan_panen" :props="props">
            {{ props.row.prakiraan_panen ? $parseDate(props.row.prakiraan_panen).fullDate : '-' }}
          </q-td>
          <q-td key="status" :props="props">
            {{ props.row.statuspengajuan }}
          </q-td>
          <q-td key="anggota" :props="props">
            <q-btn
              type="a"
              target="_blank"
              :href="`${$baseURL}file-anggota/${props.row.file_anggota}`"
              label="Lihat File"
              unelevated
              outline
              color="dark"
            />
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" unelevated color="dark" :to="{ name: 'detailPengajuanAsuransiJasindo', params: {id: props.row.id}}"/>
              <q-btn label="Ubah Status" :disable="props.row.idstatus < 11" color="warning" unelevated @click="openDialog(props.row)"/>
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <q-dialog v-model="dialog" persistent v-if="dialog">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Ubah Status</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-select
              v-model="status"
              label="Pilih Status"
              option-label="status"
              option-value="id"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              :options="listStatus"
            />
            <q-input
              v-model="keterangan"
              type="textarea"
              label="Keterangan"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>

export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'jenis_asuransi', align: 'left', label: 'Jenis', field: 'jenis_asuransi' },
        { name: 'nama_kelompok', align: 'left', label: 'Nama Kelompok', field: 'nama_kelompok' },
        { name: 'nama_ketua_kelompok', align: 'left', label: 'Nama Ketua Kelompok', field: 'nama_ketua_kelompok' },
        { name: 'jalur_distribusi', align: 'left', label: 'Jalur Distribusi', field: 'jalur_distribusi' },
        { name: 'musim_tanam', align: 'left', label: 'musim_tanam', field: 'musim_tanam' },
        { name: 'metode_tanam', align: 'left', label: 'Metode Tanam', field: 'metode_tanam' },
        { name: 'prakiraan_tanam', align: 'left', label: 'Prakiraan Tanam', field: 'prakiraan_tanam' },
        { name: 'prakiraan_panen', align: 'left', label: 'Prakiraan Panen', field: 'prakiraan_panen' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'anggota', align: 'left', label: 'Data Anggota', field: 'anggota' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      editMode: false,
      image: null,
      filter: '',
      show_filter: false,
      activeData: null,
      status: null,
      listStatus: [],
      keterangan: null
    }
  },
  created () {
    this.getData()
    this.getStatus()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('master/asuransis', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      const body = {
        id_status: this.status.id,
        keterangan: this.keterangan,
        id_user: this.$getProfile().member.users_login.id_users
      }
      this.$showLoading()
      this.$axios.put(`asuransi/acc-jasindo/${this.activeData.id}`, body, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.getData()
            this.resetForm()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getStatus () {
      this.$axios.get('asuransi/jasindo-status', this.$createToken())
        .then(res => {
          this.listStatus = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (data) {
      this.activeData = data
      this.dialog = true
    },
    resetForm () {
      this.dialog = false
      this.activeData = null
      this.status = null
      this.keterangan = null
    }
  }
}
</script>
