<template>
  <q-page padding>
    <q-btn label="Kembali" @click="this.$router.go(-1)" class="q-my-md" color="primary"/>
    <q-table
      class="my-sticky-header-column-table"
      :title="`Daftar Poktan di Kios ${this.$route.params.nama}`"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nik_poktan"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          label="Cari Poktan"
          borderless
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik_poktan" :props="props">
            {{ props.row.nik_poktan }}
          </q-td>
          <q-td key="nama_poktan" :props="props">
            {{ props.row.nama_poktan }}
          </q-td>
          <q-td key="area" :props="props">
            {{ `${props.row?.nama_kab} - ${props.row?.nama_kec} - ${props.row?.nama_desa}` }}
          </q-td>
          <q-td key="aksi" :props="props">
            -
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- <q-dialog v-model="dialogBayar" persistent v-if="dialogBayar">
      <q-card style="min-width: 450px">
        <q-form @submit="onSubmitPembayaran">
          <q-card-section>
            <div class="text-h6">Konfirmasi Sudah Bayar</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-file
              outlined
              bottom-slots
              accept=".jpg, image/*, .pdf"
              v-model="buktiBayar"
              label="Upload Bukti Bayar"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
              <template v-slot:hint>
                Upload File Bila Ada
              </template>
            </q-file>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Konfirmasikan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      filter: '',
      columns: [
        { name: 'nik_poktan', align: 'left', label: 'NIK', field: 'nik_poktan' },
        { name: 'nama_poktan', align: 'left', label: 'Nama', field: 'nama_poktan' },
        { name: 'area', align: 'left', label: 'Area', field: 'area' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      console.log(this.$route.params.nik)
      this.loading = true
      this.$axios.get(`master/data-poktan-kios/${this.$route.params.nik}`, this.$createToken())
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
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 500px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
