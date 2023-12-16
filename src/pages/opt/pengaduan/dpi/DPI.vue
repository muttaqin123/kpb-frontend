<template>
  <q-page padding>
    <q-table
      title="Data Pengaduan DPI"
      :rows="rows"
      :columns="columns"
      flat
      :loading="loading"
      row-key="nama"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nik" :props="props">
            {{ props.row.nik }}
          </q-td>
          <q-td key="alamatlahan" :props="props">
            {{ props.row.alamatlahan }}
          </q-td>
          <q-td key="jenisdpi" :props="props">
            {{ props.row.jenisdpi }}
          </q-td>
          <q-td key="kategori" :props="props">
            {{ props.row.kategoridpi }}
          </q-td>
          <q-td key="jeniskomoditi" :props="props">
            {{ props.row.master_komoditas.komoditas }}
          </q-td>
          <q-td key="keteranganserangan" :props="props">
            {{ props.row.keterangandpi }}
          </q-td>
          <q-td key="luaslahan" :props="props">
            {{ props.row.luaslahan }} Ha
          </q-td>
          <q-td key="namapemiliklahan" :props="props">
            {{ props.row.namapemiliklahan }}
          </q-td>
          <q-td key="tlppemiliklahan" :props="props">
            {{ props.row.tlppemiliklahan }}
          </q-td>
          <q-td key="umurtanaman" :props="props">
            {{ props.row.umurtanaman }} {{ props.row.satuanumurtanaman }}
          </q-td>
          <q-td key="tanggalpengaduan" :props="props">
            {{ $parseDate(props.row.tanggalpengaduan).fullDate }}
          </q-td>
          <q-td key="lokasi" :props="props">
            <q-btn label="Lihat Lokasi" @click="openDialogLokasi(props.row)" outline/>
          </q-td>
          <q-td key="berkas" :props="props">
            <q-btn @click="openDialogBerkas(props.row.opt_berkas_pengaduan_dpi)" label="Lihat Berkas" outline/>
          </q-td>
          <q-td key="jawaban" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <!-- <q-btn label="Jawab" @click="jawab(props.row)" color="primary" outline/> -->
              <q-btn label="Jawab"  :disable="props.row.opt_jawaban_dpi.length > 0" @click="jawab(props.row)" color="primary" outline/>
              <q-btn label="Edit/Lihat Jawaban" :disable="props.row.opt_jawaban_dpi.length < 1" @click="jawab(props.row, true)" color="primary" outline/>
              <!-- <q-btn :disable="props.row.opt_jawaban.length < 1" label="Lihat Jawaban" @click="lihatJawaban(props.row)" color="primary" outline/> -->
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="dialogLokasi"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Lokasi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <GoogleMap :api-key="$mapsApiKey" style="height: 50vh" :center="$map.center" :zoom="$map.zoom">
            <Marker :options="{ position: markers }" />
          </GoogleMap>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogBerkas"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Berkas</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered separator>
            <q-item v-for="(f, i) in listFiles" :key="i" clickable v-ripple :href="`${$baseURL}opt-pengaduan-dpi/${f.namafile}`" tag="a" target="_blank">
              <q-item-section>Lihat File</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogJawaban"
      v-if="jawaban"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Jawaban</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-y-sm">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <custom-list
                title="Dokter"
                :subTitle="jawaban.opt_dokter_opt_dokterToopt_jawaban_id_opt_dokter.ktp.nama"
              />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <custom-list
                title="Laboran"
                :subTitle="jawaban.opt_dokter_opt_dokterToopt_jawaban_id_opt_tenagalab.ktp.nama"
              />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <custom-list
                title="Hasil Diagnosis"
                :subTitle="jawaban.hasildiagnosapenyebab"
              />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <custom-list
                title="Penanganan Keluhan"
                :subTitle="jawaban.penanganankeluhan"
              />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <custom-list
                title="Tindak Lanjut"
                :subTitle="jawaban.tindaklanjut"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="jawabDialog"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Jawab Pengaduan</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="onSubmit" ref="formJawaban">
            <q-select
              v-model="dokter"
              :options="listDokter"
              label="Pilih Dokter"
              outlined
              :option-label="r => r.ktp.nama"
              option-value="nik"
              :rules="$defaultValidation"
            />
            <q-select
              v-model="tenagaLab"
              :options="listTenagaLab"
              label="Pilih Tenaga Lab"
              :option-label="r => r.ktp.nama"
              option-value="nik"
              outlined
              :rules="$defaultValidation"
            />
            <q-input
              v-model="form.hasildiagnosapenyebab"
              label="Hasil Identifikasi"
              outlined
              type="textarea"
              :rules="$defaultValidation"
            />
            <q-input
              v-model="form.penanganankeluhan"
              label="Rekomendasi"
              outlined
              type="textarea"
              :rules="$defaultValidation"
            />
            <!-- <q-input
              v-model="form.tindaklanjut"
              label="Tindak Lanjut"
              type="textarea"
              outlined
              :rules="$defaultValidation"
            /> -->
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat color="primary" label="Batal" v-close-popup />
          <q-btn flat color="primary" @click="$refs.formJawaban.submit()" label="Simpan"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { GoogleMap, Marker } from 'vue3-google-map'
import customList from 'src/components/CustomList.vue'
const model = () => {
  return {
    id_dpi_pengaduan: null
  }
}
export default {
  components: {
    GoogleMap,
    Marker,
    customList
  },
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'alamatlahan', align: 'left', label: 'Alamat Lahan', field: 'alamatlahan' },
        { name: 'jenisdpi', align: 'left', label: 'Jenis', field: 'jenisdpi' },
        { name: 'kategori', align: 'left', label: 'Kategori', field: 'kategori' },
        { name: 'jeniskomoditi', align: 'left', label: 'Jenis Komoditi', field: 'jeniskomoditi' },
        { name: 'keteranganserangan', align: 'left', label: 'Keterangan', field: 'keteranganserangan' },
        { name: 'luaslahan', align: 'left', label: 'Luas Lahan', field: 'luaslahan' },
        { name: 'namapemiliklahan', align: 'left', label: 'Nama Pemiliklahan', field: 'namapemiliklahan' },
        { name: 'tlppemiliklahan', align: 'left', label: 'Telp Pemiliklahan', field: 'tlppemiliklahan' },
        { name: 'umurtanaman', align: 'left', label: 'Umur Tanaman', field: 'umurtanaman' },
        { name: 'tanggalpengaduan', align: 'left', label: 'Tanggal Pengaduan', field: 'tanggalpengaduan' },
        { name: 'lokasi', align: 'left', label: 'Lokasi', field: 'lokasi' },
        { name: 'berkas', align: 'left', label: 'Berkas', field: 'berkas' },
        { name: 'jawaban', align: 'left', label: 'Jawaban', field: 'jawaban' }
      ],
      loading: false,
      form: model(),
      dialogLokasi: false,
      lat: 0,
      lng: 0,
      markers: null,
      dialogBerkas: null,
      listFiles: [],
      dialogJawaban: false,
      jawaban: null,
      jawabDialog: false,
      dokter: null,
      listDokter: [],
      tenagaLab: null,
      listTenagaLab: [],
      editMode: false
    }
  },
  created () {
    this.getData()
    this.getDokter()
    this.getTenagaLab()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('opt/pengaduan-dpi', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getDokter () {
      this.$axios.get('opt/dokter-laboran/Dokter', this.$createToken())
        .then(res => {
          this.listDokter = res.data.result
        })
    },
    getTenagaLab () {
      this.$axios.get('opt/dokter-laboran/Laboran', this.$createToken())
        .then(res => {
          this.listTenagaLab = res.data.result
        })
    },
    openDialogLokasi (row) {
      const { lat, long } = row
      this.markers = { lat, lng: long }
      this.$map.center = { lat: lat, lng: long }
      this.dialogLokasi = true
    },
    openDialogBerkas (files) {
      this.listFiles = files
      this.dialogBerkas = true
    },
    lihatJawaban (data) {
      this.jawaban = data.opt_jawaban_dpi[0]
      this.dialogJawaban = true
    },
    jawab (data, editMode) {
      this.resetForm()
      this.editMode = editMode
      this.form.id_dpi_pengaduan = data.id_dpi_pengaduan
      if (editMode) {
        const jawaban = data.opt_jawaban_dpi[0]
        this.form = jawaban
        this.dokter = jawaban.opt_dokter_opt_dokterToopt_jawaban_dpi_id_opt_dokter
        this.tenagaLab = jawaban.opt_dokter_opt_dokterToopt_jawaban_dpi_id_opt_tenagalab
      }
      this.jawabDialog = true
    },
    resetForm () {
      this.form = model()
      this.dokter = null
      this.tenagaLab = null
    },
    onSubmit () {
      this.form.id_opt_dokter = this.dokter.id_opt_dokter
      this.form.id_opt_tenagalab = this.tenagaLab.id_opt_dokter

      if (this.editMode) {
        this.$showLoading()
        this.$axios.put(`opt/jawaban-dpi/${this.form.id_dpi_pengaduan}`, this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.jawabDialog = false
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        this.$axios.post('opt/jawaban-dpi', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.jawabDialog = false
              this.getData()
            }
          }).catch(() => this.$commonErrorNotif())
      }
    }
  }
}
</script>
