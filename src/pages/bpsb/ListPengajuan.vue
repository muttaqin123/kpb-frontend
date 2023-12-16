<template>
  <q-page style="background: #EFF6F1">
    <div class="" style="background: #32573F; height: 80px"></div>
    <div class="q-mx-xl absolute-top" style="margin-top: 50px">
      <div class="q-mb-md q-mx-sm q-pa-md bg-white rounded">
        <span class="text-h6 text-weight-medium">Pengajuan Sertifikasi Benih</span>
      </div>
      <div class="q-mx-sm">
        <q-table
          style="background: #EFF6F1"
          :loading="loading"
          flat
          :rows="rows"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:top>
            <div class="column bg-white rounded q-pa-md" style="width: 100%">
              <q-input placeholder="Cari Pengajuan" v-model="search" outlined class="q-mb-sm">
                <template v-slot:append>
                  <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
                  <q-icon name="search" />
                </template>
              </q-input>
              <div class="row items-center">
                <div class="col-xs-12 col-md-auto q-pa-sm">
                  <span>Status</span>
                </div>
                <div class="col-xs-12 col-md-auto q-pa-sm">
                  <q-tabs
                    v-model="tab"
                    dense
                    inline-label
                    mobile-arrows
                    class="text-grey-8"
                    active-class="text-green-10 border"
                    indicator-color="transparent"
                    no-caps
                    @update:model-value="filter"
                  >
                    <q-tab
                      v-for="(tab, i) in listTab"
                      :key="i"
                      :name="tab.value"
                      :label="tab.label" />
                  </q-tabs>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="bg-white text-grey-8"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props" class="bg-white">
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
      search: '',
      tab: 0,
      listTab: [
        {
          label: 'Semua',
          value: 0,
          data: 'semua'
        },
        {
          label: 'Verifikasi Berkas',
          value: 1,
          data: [0]
        },
        {
          label: 'Kunjungan Lapangan',
          value: 2,
          data: [1]
        },
        {
          label: 'Laporan Pengujian',
          value: 3,
          data: [2]
        },
        {
          label: 'Sertifikat',
          value: 4,
          data: [3]
        },
        {
          label: 'Gagal',
          value: 5,
          data: [4]
        }
      ],
      rows: [
        {
          id: 1,
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
      ],
      loading: true
    }
  },
  methods: {
    filter (val) {
      const data = this.listTab[val]
      console.log(data)
    }
  }
}
</script>
