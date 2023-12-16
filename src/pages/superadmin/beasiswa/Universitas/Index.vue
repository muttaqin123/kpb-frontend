<template>
  <q-page padding>
    <div class="border-shadow bg-white q-pa-md row">
      <q-space/>
      <q-btn label="Tambah Universitas" no-caps color="positive" icon="add" @click="dialog = !dialog"/>
    </div>
    <div
      v-if="this.rows.length === 0" class="column flex flex-center q-my-xl">
      <q-img
        src="img/not_found.png"
        :ratio="1"
        style="height: 200px; width: 200px"/>
      <span class="text-weight-bold text-body1">Belum Ada Data Universitas Yang Tersedia</span>
    </div>
    <!-- Data Kosong Selesai -->
    <!-- list beasiswa mulai -->
    <div v-else class="q-mt-md">
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        :pagination="pagination">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="nik" :props="props">
              {{ props.row.member.nik }}
            </q-td>
            <q-td key="namauser" :props="props">
              {{ props.row.member.ktp.nama }}
            </q-td>
            <q-td key="nama" :props="props">
              {{ props.row.member.institusi_pendidikan[0] ? props.row.member.institusi_pendidikan[0].nama_institusi : 'Belum Diisi' }}
            </q-td>
            <q-td key="alamat" :props="props">
              {{ props.row.member.institusi_pendidikan[0]? props.row.member.institusi_pendidikan[0].alamat : 'Belum Diisi' }}
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
    <q-dialog
      v-model="dialog"
      persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Form Pembuatan Universitas</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-sm">
            <q-input
              outlined
              v-model="form.nama"
              label="Nama Universitas"
              :rules="[val => !!val || 'Isi Nama Universitas']"/>
            <q-input
              outlined
              v-model="form.nik"
              label="Username"
              :rules="[val => !!val || 'Isi Username']"/>
            <div class="row" align="right">
              <q-space/>
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn color="primary" type="submit" label="OK" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
const model = () => {
  return {
    nik: null,
    nama: null,
    id_prov: '18',
    id_kab: '1871',
    id_kec: '187101',
    id_desa: '1871011003',
    id: null,
    access: 'institusi'
  }
}
export default {
  data () {
    return {
      form: model(),
      dialog: false,
      columns: [
        { name: 'nik', align: 'left', label: 'Username', field: 'nik' },
        { name: 'namauser', align: 'left', label: 'Nama', field: 'namauser' },
        { name: 'nama', align: 'left', label: 'Nama Universitas', field: 'nama' },
        { name: 'alamat', align: 'left', label: 'Alamat', field: 'alamat' }
      ],
      rows: [],
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10
      // rowsNumber: xx if getting data from a server
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('beasiswa/getAllUniv', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.post('auth/sign-up-dinas', this.form, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.status) {
            this.$showLoading()
            this.$axios.post('beasiswa/createUniv', this.form, this.$createToken())
              .finally(() => this.$hide())
              .then(res => {
                if (res.status) {
                  this.form = model()
                  this.dialog = !this.dialog
                  this.$notif(res.data.message, 'positive')
                  this.getData()
                } else {
                  this.$notif(res.data.message, 'negative')
                }
              })
              .catch(() => this.$commonErrorNotif())
          } else {
            this.$notif(res.data.message, 'negative')
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage)
    }
  }
}
</script>
