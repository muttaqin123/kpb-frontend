<template>
  <q-page padding>
    <q-table
      title="Data Pengajuan KUR Bank Anda"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <!-- <template v-slot:top-right>
        <q-btn
          label="Tambah Fitur"
          unelevated
          color="primary"
          @click="openDialog(false, null)"
        />
      </template> -->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nama_lengkap" :props="props">
            {{ props.row.nama }}
          </q-td>
          <q-td key="keperluan_kur" :props="props">
            {{ props.row.keperluan_kur }}
          </q-td>
          <q-td key="jumlah" :props="props">
            {{ $formatPrice(props.row.jumlah) }}
          </q-td>
          <q-td key="jangka_waktu" :props="props">
            {{ props.row.jangka_waktu }} Bulan
          </q-td>
          <q-td key="status_pengajuan" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" color="dark" unelevated :to="{name: 'detailKURPenyuluh', params: {...$getParams($route), id: props.row.id}}"/>
              <q-btn label="Tolak" :disable="props.row.status_pengajuan >= 11" color="negative" unelevated @click="openDialog(props.row, 3)"/>
              <q-btn label="Konfirmasi" :disable="props.row.status_pengajuan >= 11" color="warning" unelevated @click="openDialog(props.row, 10)"/>
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
              v-model="activeStatus"
              label="Pilih Status"
              :rules="[
                val => val !== null || 'Mohon Pilih'
              ]"
              :options="listStatus"
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
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'keperluan_kur', align: 'left', label: 'Keperluan Kur', field: 'keperluan_kur' },
        { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah' },
        { name: 'jangka_waktu', align: 'left', label: 'Jangka Waktu', field: 'jangka_waktu' },
        { name: 'status_pengajuan', align: 'left', label: 'Status Pengajuan', field: 'status_pengajuan' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null,
      listStatus: [
        'Ditinjau Dinas Kabupaten Kota',
        'Ditinjau Admin KPB Center',
        'Diteruskan Ke Bank',
        'Ditinjau Bank',
        'Diproses Bank',
        'Disetujui Bank',
        'Ditolak Bank',
        'Dicairkan',
        'Belum Lunas',
        'Lunas'
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get(`kur/pengajuan-wilayah-penyuluh/${this.$getProfile().member.id_kec}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      // this.$showLoading()
      // this.$axios.post('', this.form, this.$createToken())
      //   .finally(() => this.$hide())
      //   .then(res => {
      //     if (this.$parseResponse(res.data)) {
      //       this.getData()
      //       this.dialog = false
      //     }
      //   }).catch(() => this.$commonErrorNotif())
    },
    openDialog (data, status) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        prompt: {
          model: '',
          label: 'Tambahkan Keterangan',
          type: 'text' // optional
        },
        persistent: true
      }).onOk(ket => {
        const body = {
          id_status: status,
          keterangan: ket,
          id_user: this.$getProfile().member.users_login.id_users
        }
        this.$showLoading()
        this.$axios.put(`kur/acc/${data.id}`, body, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
