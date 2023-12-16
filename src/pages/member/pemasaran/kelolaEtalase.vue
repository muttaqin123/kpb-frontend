<template>
  <q-page>
    <div class="q-gutter-sm q-pa-sm row bg-white items-center">
      <q-btn @click="this.$router.go(-1)" icon="arrow_back" flat dense class="q-mr-sm"/>
      <span class="text-h6 text-weight-medium">Kelola Etalase</span>
      <q-space/>
      <q-btn label="Tambah Etalase" @click="showPopup(false, null)" no-caps style="background: #FFBB16; color: black"/>
    </div>
    <div class="q-pa-md">
      <q-table
        flat bordered
        :rows="rows"
        :columns="columns"
        row-key="nama_etalase"
        v-model:pagination="pagination"
        :loading="loading"
        :filter="search"
        @request="onRequest"
        style="border-radius: 10px"
      >
        <template v-slot:top>
          <div class="col-12">
            <div class="row justify-between">
              <div class="col-md-2 col-xs-12">
                <span class="text-h5">Etalase</span>
              </div>
              <div class="col-md-4 col-xs-12">
                <div class="">
                  <q-input class="" dense outlined v-model="search" placeholder="Cari Etalase">
                    <template v-slot:append>
                      <q-btn flat dense icon="search"/>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-xs">
                <q-btn label="Ubah" @click="showPopup(true, props.row)" no-caps style="background: #FFBB16; color: black"/>
                <!-- <q-btn label="Hapus" @click="deleteItem(props.row.etalase_id)" no-caps style="background: #F44336; color: white"/> -->
                <q-btn label="Hapus" @click="deleteItem(props.row)" no-caps style="background: #F44336; color: white"/>
              </div>
            </q-td>
            <q-td key="nama_etalase" :props="props">
                {{ props.row.nama_etalase }}
            </q-td>
            <q-td key="keterangan" :props="props">
                {{ props.row.keterangan }}
            </q-td>
            <q-td key="total_produk" :props="props">
                {{ props.row.total_produk }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <!-- <div class="row justify-center q-mt-md">
        <q-pagination
          @click="@c"
          v-model="pagination.page"
          color="grey-8"
          :max="totalPages"
          size="sm"
        />
      </div> -->
    </div>
    <q-dialog v-model="dialogForm" full-width>
      <q-card>
        <q-card-section>
          <div class="row justify-between">
            <span class="text-h6">{{ this.editable ? 'Edit Etalase' :'Tambah Etalase' }}</span>
            <q-btn icon="close" flat dense v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSave" v-if="!this.editable" class="q-gutter-sm">
            <q-input outlined v-model="formCreateEtalase.nama_etalase" label="Nama Etalase"/>
            <q-input outlined v-model="formCreateEtalase.keterangan" label="Keterangan"/>
            <q-btn flat type="submit" label="Tambah Etalase" style="background: #FFBB16; color: black"/>
          </q-form>
          <q-form @submit="onEdit" v-else class="q-gutter-sm">
            <q-input outlined v-model="editForm.nama_etalase" label="Nama Etalase"/>
            <q-input outlined v-model="editForm.keterangan" label="Keterangan"/>
            <q-btn flat type="submit" label="Edit Etalase" style="background: #FFBB16; color: black"/>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      editable: false,
      dialogForm: false,
      editForm: {},
      search: '',
      loading: false,
      dataToko: null,
      formCreateEtalase: {
        toko_id: 0,
        nama_etalase: '',
        keterangan: ''
      },
      columns: [
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi', sortable: true },
        { name: 'nama_etalase', align: 'left', label: 'Nama Etalase', field: 'nama_etalase', sortable: true },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan', sortable: true },
        { name: 'total_produk', align: 'left', label: 'Jumlah Produk', field: 'total_produk', sortable: true }
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
      totalPages: 0,
      pagination: {
        page: 1,
        rowsPerPage: 1
        // rowsNumber: 0
        // rowsNumber: xx if getting data from a server
      }
    }
  },
  created () {
    this.dataToko = this.$q.localStorage.getItem('toko_pemasaran')
    this.formCreateEtalase.toko_id = this.dataToko.toko.toko_id
    this.getData()
  },
  methods: {
    showPopup (isEdit, dataEtalase) {
      this.editable = isEdit
      if (isEdit) {
        this.editForm = dataEtalase
      }
      this.dialogForm = !this.dialogForm
    },
    getData () {
      this.onRequest({
        tokoId: this.dataToko.toko.toko_id,
        pagination: this.pagination
      })
    },
    onRequest (props) {
      // console.log(props)
      this.loading = true
      this.$api.get('produk/etalase/get-pagination', {
        params: {
          tokoId: this.dataToko.toko.toko_id,
          page: Number(props.pagination.page),
          size: Number(props.pagination.rowsPerPage)
        }
      })
        .finally(() => { this.loading = false })
        .then((res) => {
          // console.log(res)
          this.rows = res.data.content
          this.totalPages = res.data.totalPages
          this.pagination.page = res.data.number
          this.pagination.rowsPerPage = res.data.size
          this.pagination.rowsNumber = res.data.totalElements
          // console.log(this.pagination)
        }).catch(() => this.$commonErrorNotif())
    },
    getEtalases () {
      this.$showLoading()
      // console.log(this.dataToko.toko.toko_id)
      this.$api.get('produk/etalase/get-pagination', {
        params: {
          tokoId: this.dataToko.toko.toko_id,
          page: this.pagination.page,
          size: this.pagination.rowsPerPage
        }
      }).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.rows = res.data.content
          this.pagination.rowsPerPage = res.data.numberOfElements
          this.pagination.rowsNumber = res.data.totalPages
          // console.log(this.pagination)
        }).catch(() => this.$commonErrorNotif())
    },
    deleteItem (data) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: `Apakah anda yakin ingin menghapus ${data.nama_etalase} ?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$api.delete(`https://api.e-kpb.shop/produk/api/v1/etalase/${data.etalase_id}`, this.$createTokenPemasaran())
          .finally(() => this.$hide())
          .then((res) => {
            // console.log(res)
            if (res.status === 204) {
              this.$notif('Berhasil Menghapus', 'positive')
              this.getEtalases()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    onSave () {
      this.$showLoading()
      this.$api.post('https://api.e-kpb.shop/produk/api/v1/etalase', this.formCreateEtalase, this.$createTokenPemasaran())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          if (res.status === 201) {
            this.dialogForm = !this.dialogForm
            this.$notif('Berhasil Menambahkan', 'positive')
            this.getEtalases()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onEdit () {
      this.$showLoading()
      // console.log(this.editForm)
      this.$api.put(`https://api.e-kpb.shop/produk/api/v1/etalase/${this.editForm.etalase_id}`, {
        nama_etalase: this.editForm.nama_etalase,
        keterangan: this.editForm.keterangan
      }, this.$createTokenPemasaran()).finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.getEtalases()
          this.$notif('Berhasil Menambahkan', 'positive')
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
