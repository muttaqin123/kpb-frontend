<template>
  <q-page padding>
    <div v-if="isShow" class="border-shadow bg-white q-pa-md row">
      <q-space/>
      <q-btn
        label="Tambah Beasiswa"
        no-caps
        color="positive"
        icon="add"
        @click="dialog = !dialog" />
    </div>
    <div
      v-if="this.rows.length === 0" class="column flex flex-center q-my-xl">
      <q-img
        src="img/not_found.png"
        :ratio="1"
        style="height: 200px; width: 200px"/>
      <span class="text-weight-bold text-body1">Belum Ada Data Beasiswa Yang Tersedia</span>
    </div>
    <!-- Data Kosong Selesai -->
    <!-- list beasiswa mulai -->
    <div v-else class="q-mt-md">
      <q-table
        flat
        :rows="rows"
        :columns="columns"
        separator="none"
        :pagination="pagination"
        hide-header
        hide-pagination>
        <template v-slot:body="props" >
          <q-tr :props="props" no-hover >
            <q-td auto-width>
              <q-card
                style="padding: 24px 16px; width: 100%;">
                <div class="row justify-between items-center">
                  <div class="col-xl-8">
                    <q-badge rounded class="q-py-xs q-px-md q-mb-sm" :color="isOpen(props.row.tanggal_dimulai, props.row.tanggal_selesai) ? 'positive' : 'negative'" :label="isOpen(props.row.tanggal_dimulai, props.row.tanggal_selesai) ? 'Buka' : 'Tutup'" />
                    <div :class="`text-weight-bold ${this.$q.screen.xs ? 'text-h6' : 'text-h5'}`">{{ props.row.nama_beasiswa }}</div>
                    <div class="text-body text-weight-medium">{{ props.row.institusi_pendidikan.nama_institusi }}</div>
                    <div style="font-size: 11px" class="text-weight-light q-mt-sm">Tanggal Pendaftaran: {{ this.$parseDate(props.row.tanggal_dimulai).fullDate }} - {{ this.$parseDate(props.row.tanggal_selesai).fullDate }}</div>
                    <div style="font-size: 11px" class="text-weight-light">Kuota: {{ props.row.kuota_penerima }} Peserta</div>
                  </div>
                  <div class="col-auto items-end">
                    <q-btn
                      no-caps
                      rounded
                      class="text-body1"
                      :style="`background-color: #024830; ${this.$q.screen.xs ? 'margin-top: 16px' : ''}`"
                      :size="`${this.$q.screen.xl ? 'md' : this.$q.screen.lg ? 'md' : this.$q.screen.md ? 'md' : this.$q.screen.sm ? 'sm' : this.$q.screen.xs ? 'md' : ''}`"
                      text-color="white"
                      label="Lihat Detail"
                      :to="{ name: 'detailbeasiswaAdmin', params: { id: props.row.id } }"
                    />
                  </div>
                </div>
              </q-card>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="row justify-center q-mt-md ">
        <q-pagination
          class="q-mb-xl"
          v-model="pagination.page"
          direction-links
          color="grey"
          active-color="green-10"
          :max="pagesNumber"
          size="md"
        />
      </div>
    </div>
    <q-dialog
      v-model="dialog"
      full-height
      full-width
      persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Form Pengisian</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" class="q-gutter-sm">
            <q-input
              outlined
              v-model="form.nama_beasiswa"
              label="Nama Beasiswa"
              :rules="[val => !!val || 'Isi Nama Beasiswa']"/>
            <q-select
              outlined
              v-model="form.id_institusi"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              label="Nama Universitas"
              :options="option"
              @filter="filterFn"
              option-value="id"
              option-label="nama_institusi"
              option-disable="inactive"
              emit-value
              map-options
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input
              outlined
              v-model="form.penanggung_jawab"
              label="Nama Penanggung Jawab"
              :rules="[val => !!val || 'Isi Nama Penanggung Jawab']"/>
            <q-input
              outlined
              type="number"
              v-model="form.kuota_penerima"
              label="Kuota Penerima"
              :rules="[val => !!val || 'Isi Kuota Penerima']"/>
            <div class="row justify-between">
              <q-input outlined style="width: 49%" v-model="form.tanggal_dimulai" label="Tanggal Mulai">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date landscape v-model="form.tanggal_dimulai" mask="dddd, D MMM YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input outlined style="width: 49%" v-model="form.tanggal_selesai" label="Tanggal Akhir">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date landscape v-model="form.tanggal_selesai" mask="dddd, D MMM YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-input
              outlined
              type="textarea"
              v-model="form.keterangan"
              label="Keterangan"/>
            <q-input
              outlined
              v-model="form.url_persyaratan"
              label="Url Persyaratan"/>
            <q-input
              outlined
              v-model="form.url_pendaftaran"
              label="Url Pendaftaran"/>
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
export default {
  data () {
    return {
      isShow: false,
      dialog: false,
      model: '',
      form: {
        id_institusi: null,
        nama_beasiswa: '',
        penanggung_jawab: '',
        kuota_penerima: 0,
        tanggal_dimulai: '',
        tanggal_selesai: '',
        keterangan: '',
        url_persyaratan: '',
        url_pendaftaran: '',
        status: 1
      },
      option: [],
      columns: [],
      rows: [],
      stringOptions: [],
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
    this.getUniv()
  },
  methods: {
    getData () {
      this.$showLoading()
      this.$axios.get('beasiswa/getall', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    },
    getUniv () {
      this.$showLoading()
      this.$axios.get('beasiswa/getAllUniv', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.stringOptions = res.data.result
          this.option = this.stringOptions
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      this.$axios.post('beasiswa/create', this.form)
        .finally(() => this.$hide())
        .then(res => {
          if (res.status) {
            this.dialog = !this.dialog
            this.$notif(res.data.message, 'positive')
            this.getData()
          } else {
            this.$notif(res.data.message, 'negative')
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.option = this.stringOptions.filter(v => v.nama_institusi.toLowerCase().indexOf(needle) > -1)
      })
    },
    isOpen (masuk, selesai) {
      const tanggalMasuk = Date.parse(masuk)
      const tanggalSelesai = Date.parse(selesai) // Konversi created_at menjadi nilai timestamp
      const tangalIni = Date.now() // Waktu saat ini

      const selisihMasuk = Math.floor((tangalIni - tanggalMasuk) / (1000 * 60 * 60 * 24))
      const selisihSelesai = Math.floor((tangalIni - tanggalSelesai) / (1000 * 60 * 60 * 24))

      return selisihMasuk >= 0 && selisihSelesai <= 0
    }
  },
  computed: {
    pagesNumber () {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage)
    }
  }
}
</script>
