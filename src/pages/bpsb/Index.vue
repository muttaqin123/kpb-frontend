<template>
  <q-page style="background: #EFF6F1">
    <div class="" style="background: #32573F; height: 80px"></div>
    <div class="q-mx-xl absolute-top" style="margin-top: 50px">
      <div class="q-mb-md q-mx-sm q-pa-md bg-white rounded">
        <span class="text-h6 text-weight-medium">Dashboard Admin</span>
      </div>
      <div class="row q-mb-sm">
        <div
          v-for="(data, i) in listData"
          :key="i"
          class="col-3 q-pa-sm">
          <div class="bg-white rounded q-pa-sm column">
            <span class="text-h6">{{ data.label }}</span>
            <span class="text-h4 text-weight-bold">{{ data.jumlah }}</span>
            <span class="text-caption">Permohonan</span>
            <q-separator :class="`bg-${data.color} rounded q-mt-md`" style="height: 5px; width: 100%"/>
          </div>
        </div>
      </div>
      <div class="q-mx-sm">
        <q-table
          :loading="loading"
          flat bordered
          :rows="rows"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)">
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" no-caps color="green-10" :to="{ name: 'detailPengajuanBPSBAdmin', params: { id: props.row.id} }"/>
              </q-td>
              <q-td key="status" :props="props">
                <q-badge color="info">
                  {{ props.row.status }}
                </q-badge>
              </q-td>
              <q-td key="code" :props="props">
                  {{ props.row.code }}
              </q-td>
              <q-td key="tgl_permohonan" :props="props">
                  {{ props.row.tgl_permohonan }}
              </q-td>
              <q-td key="nama" :props="props">
                  {{ props.row.nama }}
              </q-td>
              <q-td key="komoditi" :props="props">
                  {{ props.row.komoditi }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      listData: [
        {
          label: 'Verifikasi Berkas',
          jumlah: 0,
          color: 'info'
        },
        {
          label: 'Pendahuluan',
          jumlah: 0,
          color: 'yellow-10'
        },
        {
          label: 'Penerbitan Sertifikat',
          jumlah: 0,
          color: 'yellow-10'
        },
        {
          label: 'Gagal',
          jumlah: 0,
          color: 'red'
        }
      ],
      rows: [
        {
          status: 2,
          code: 'SPP000001',
          tgl_permohonan: '2023-08-11 10:22:40.702',
          nama: 'Anggara',
          komoditi: 'Kelapa'
        }
      ],
      columns: [
        { name: 'aksi', label: 'Aksi', align: 'left', field: 'aksi' },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'code', label: 'Kode Pengajuan', align: 'left', field: 'code', sortable: true },
        { name: 'tgl_permohonan', label: 'Tgl. Permohonan', align: 'left', field: 'tgl_permohonan', sortable: true },
        { name: 'nama', label: 'Nama', align: 'left', field: 'nama', sortable: true },
        { name: 'komoditi', label: 'Komoditi', align: 'left', field: 'komoditi', sortable: true }
      ]
    }
  }
}
</script>
