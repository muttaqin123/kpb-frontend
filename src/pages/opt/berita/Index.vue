<template>
  <q-page padding>
    <q-table
      title="Berita"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:top-right>
        <q-btn
          label="Tambah Berita"
          unelevated
          color="primary"
          :to="{name: 'inputBeritaOpt'}"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="opt_kategori_informasi" :props="props">
            {{ props.row.opt_kategori_informasi_opt_informasiToopt_kategori_informasi.isikategori }}
          </q-td>
          <q-td key="judulinformasi" :props="props">
            {{ props.row.judulinformasi }}
          </q-td>
          <q-td key="isiinformasi" class="ellipsis" :props="props">
            <div class="ellipsis" style="width: 200px;">
              {{ props.row.isiinformasi }}
            </div>
          </q-td>
          <q-td key="tanggalinformasi" :props="props">
            {{ $parseDate(props.row.tanggalinformasi).fullDate }}
          </q-td>
          <q-td key="gambar" :props="props">
            <q-btn label="Lihat Gambar" :disable="props.row.opt_berkas_informasi.length < 1" color="primary" outline @click="openDialog(props.row.opt_berkas_informasi)"/>
          </q-td>
          <q-td key="aksi" :props="props">
            <div class="justify-center q-gutter-x-xs">
              <!-- <q-btn label="Edit" @click="openDialog(true, props.row)" color="warning" unelevated/> -->
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="dialogBerkas"
      v-if="dialogBerkas"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Gambar</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-carousel
            arrows
            animated
            v-model="slide"
            height="400px"
          >
            <q-carousel-slide v-for="(f, i) in listFiles" :key="i" :name="f.id_opt_berkas_informasi" :img-src="`${$baseURL}/opt-informasi/${f.namafile}`"/>
          </q-carousel>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      columns: [
        { name: 'opt_kategori_informasi', align: 'left', label: 'Kategori Informasi', field: 'opt_kategori_informasi' },
        { name: 'judulinformasi', align: 'left', label: 'Judul Informasi', field: 'judulinformasi' },
        { name: 'isiinformasi', align: 'left', label: 'Isi Informasi', field: 'isiinformasi' },
        { name: 'tanggalinformasi', align: 'left', label: 'Tanggal Informasi', field: 'tanggalinformasi' },
        { name: 'gambar', align: 'left', label: 'Gambar', field: 'gambar' }
        // { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialogBerkas: false,
      listFiles: [],
      slide: null,
      filePDF: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.$axios.get('opt/informasi', this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (listFiles) {
      this.listFiles = listFiles
      this.slide = listFiles[0].id_opt_berkas_informasi
      this.dialogBerkas = true
    }
  }
}
</script>
