<template>
  <q-page padding>
    <q-table
      title="Data Realisasi KUR"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
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
          <q-td key="jangka_waktu" :props="props">
            {{ props.row.nama_bank }}
          </q-td>
          <q-td key="jangka_waktu" :props="props">
            {{ props.row.sektor_usaha }}
          </q-td>
          <q-td key="status_pengajuan" :props="props">
            {{ props.row.status }}
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <q-btn label="Detail" color="dark" unelevated :to="{name: 'detailKURSuperAdmin', params: { id: props.row.id }}"/>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        // { name: 'bank', align: 'left', label: 'Nama Bank', field: 'bank' },
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'keperluan_kur', align: 'left', label: 'Keperluan Kur', field: 'keperluan_kur' },
        { name: 'jumlah', align: 'left', label: 'Jumlah', field: 'jumlah' },
        { name: 'jangka_waktu', align: 'left', label: 'Jangka Waktu', field: 'jangka_waktu' },
        { name: 'bank', align: 'left', label: 'Bank', field: 'bank' },
        { name: 'sktor', align: 'left', label: 'Sektor Usaha', field: 'sektor' },
        { name: 'status_pengajuan', align: 'left', label: 'Status Pengajuan', field: 'status_pengajuan' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('kur/realisasi', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
