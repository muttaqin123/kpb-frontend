<template>
  <q-page style="background: #EFF6F1">
    <div style="background: #32573F; height: 80px"></div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} absolute-top`" style="margin-top: 55px">
      <div class="bg-white q-pa-sm ">
        <q-btn class="q-mx-sm" rounded icon="mdi-arrow-left" @click="this.$router.go(-1)" dense flat/>
        <span class="text-bold">Riwayat Pengajuan Rekomendasi</span>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '}  q-mt-xl q-mb-sm`">
      <span class="text-h6 text-bold">Surat Rekomendasi Aktif</span>
    </div>
    <q-btn
      :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} text-bold`"
      label="Tambah Surat Rekomendasi"
      style="background: #FFBB16" />
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-my-sm`">
      <div class="row">
        <div class="col-auto" style="background: #32573F; width: 20px"></div>
        <div class="column col q-pa-sm" style="background: #FFFFFF">
          <span class="text-bold text-body1">Surat Rekomendasi</span>
          <span>Nama Pimpinan: </span>
          <span>Tanggal Pengajuan: </span>
          <span>Tanggal Berakhir: </span>
          <div class="col q-mt-sm q-gutter-sm">
            <q-btn no-caps outline label="Lihat Detail"></q-btn>
            <q-btn class="q-mx-sm" no-caps outline label="Unduh Surat"></q-btn>
            <q-btn no-caps outline label="Ajukan Perpanjangan"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} q-mt-sm q-mb-sm`">
      <span class="text-h6 text-bold">Riwayat Pengajuan</span>
    </div>
    <div :class="`${this.$q.screen.xs ? 'q-mx-sm' : 'q-mx-xl '} `">
      <q-table flat bordered
      class=""
      :rows="rows"
      :columns="columns"
      row-key="namapimpinan">

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'aksi',
          required: true,
          label: 'Aksi',
          align: 'Center',
          field: 'aksi',
          sortable: true
        },
        { name: 'status', required: true, label: 'Status', align: 'Center', field: 'status', sortable: true },
        { name: 'namapimpinan', required: true, label: 'Nama Pimpinan', align: 'Center', field: 'namapimpinan', sortable: true },
        { name: 'namaperusahaan', required: true, label: 'Nama Perusahaan', align: 'Center', field: 'namaperusahaan', sortable: true },
        { name: 'tglpengajuan', required: true, label: 'Tanggal Pengajuan', align: 'Center', field: 'tglpengajuan', sortable: true },
        { name: 'tglberakhir', required: true, label: 'Tanggal Berakhir', align: 'Center', field: 'tglberakhir', sortable: true }
      ]
    }
  }
}
</script>
<style scoped>
.q-table__top,
.q-table__bottom,
  thead tr:first-child th{
  background-color: #475D5B
  }

</style>
