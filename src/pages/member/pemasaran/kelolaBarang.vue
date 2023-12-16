<template>
  <q-page>
    <div class="q-gutter-sm q-pa-sm row bg-white items-center">
      <q-btn icon="arrow_back" flat dense class="q-mr-sm" @click="this.$router.go(-1)"/>
      <span class="text-h6 text-weight-medium">Kelola Barang</span>
      <q-space/>
      <q-btn label="Tambah Barang" :to="{ name: 'tambahProduk' }" no-caps style="background: #FFBB16; color: black"/>
    </div>
    <div class="q-pa-md">
      <q-table
        flat bordered
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="search"
        :pagination="initialPagination"
        style="border-radius: 10px"
      >
        <template v-slot:top>
          <div class="col-12">
            <div class="row justify-between">
              <div class="col-md-2 col-xs-12">
                <span class="text-h5">Data Barang</span>
              </div>
              <div class="col-md-4 col-xs-12">
                <div class="row justify-end">
                  <q-input class="col-md-7 col-sm-6 col-xs-12 q-pa-sm" dense outlined v-model="search" placeholder="Cari Produk">
                    <template v-slot:append>
                      <q-btn flat dense icon="search"/>
                    </template>
                  </q-input>
                  <!-- <q-select
                    class="col-md-5 col-sm-6 col-xs-6 q-pa-sm"
                    dense
                    outlined
                    v-model="etalase"
                    option-value="keterangan"
                    option-label="nama_etalase"
                    option-disable="inactive"
                    :options="data.etalase"
                    emit-value
                    map-options
                    label="Etalase" /> -->
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <q-btn label="Lihat Detail" :to="{ name: 'detailProdukPemasaran', params: {produk_id: props.row.produk_id} }"  no-caps style="background: #FFBB16; color: black"/>
            </q-td>
            <q-td key="nama_produk" :props="props">
                {{ props.row.nama_produk }}
            </q-td>
            <q-td key="etalase" :props="props">
                {{ props.row.nama_etalase }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      dataToko: this.$q.localStorage.getItem('toko_pemasaran'),
      search: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000000
      },
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi', sortable: true },
        { name: 'nama_produk', align: 'left', label: 'Nama Produk', field: 'nama_produk', sortable: true },
        { name: 'etalase', align: 'left', label: 'Etalase', field: 'etalase', sortable: true }
      ],
      rows: [
        {
          nama_produk: 'nama_produk',
          etalase: 'etalase'
        }
      ],
      etalase: '',
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      data: {
        etalase: []
      }
    }
  },
  created () {
    this.getBarang()
  },
  methods: {
    getBarang () {
      this.$showLoading()
      this.$api.get('produk/toko', {
        params: {
          page: this.initialPagination.page,
          size: this.initialPagination.rowsPerPage,
          status: true,
          statusAdmin: true,
          type: 'pemasaran',
          tokoId: this.dataToko.toko.toko_id
        }
      }).finally(() => {
        this.$hide()
      }).then((res) => {
        // console.log(res)
        this.rows = res.data.content
        this.initialPagination.page = res.data.numberOfElements
        this.initialPagination.rowsPerPage = res.data.size
        this.initialPagination.rowsNumber = res.data.totalPages
      }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
