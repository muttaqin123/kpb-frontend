<template>
  <q-page padding style="background: #F2F7F5">
    <q-btn icon="west" color="green-10" no-caps label="Kembali" @click="this.$router.go(-1)" outline rounded/>
    <div class="row items-center border-shadow q-pa-md q-mt-md" style="background: #00A3FF; color: white">
      <div class="col-1">
        <q-icon name="assignment" color="white" size="xl"/>
      </div>
      <div class="col column">
        <span class="text-h6">Surat Permohonan Penerbitan SC/HC</span>
        <span style="font-size: 12.2px">Unduh Template Permohonan</span>
        <div class="row q-gutter-sm">
          <div class="col-auto flex flex-center">
            <q-btn no-caps style="background: #FFBB16; color: #2B2B2B" :href="`${$baseURL}file-okkpd/permohonanHC.pdf`" target="_blank" label="(Unduh PDF)" />
            <!-- <a target="_blank" :href="`${$baseURL}file-okkpd/permohonanHC.pdf`" style="font-size: 12.2px"></a> -->
          </div>
          <div class="col-auto flex flex-center">
            <q-btn no-caps style="background: #FFBB16; color: #2B2B2B" :href="`${$baseURL}file-okkpd/permohonanHC.docx`" target="_blank" label="(Unduh Word)" />
            <!-- <a target="_blank" :href="`${$baseURL}file-okkpd/permohonanHC.docx`" style="font-size: 12.2px"></a> -->
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-lg q-pa-md border-shadow column bg-white">
      <div class="border-shadow bg-info q-my-sm">
        <div class="column q-pa-sm">
          <div class="row items-center">
            <q-icon name="info_outline" color="white" size="sm"/>
            <span class="q-ml-sm text-white" style="font-size: 18px">Pemberitahuan</span>
          </div>
          <span class="text-white q-pa-sm" style="font-size: 12px">
            Data yang sudah Diupload dapat diedit selama proses verifikasi berkas,apabila berkas sudah diverifikasi maka anda tidak dapat mengedit berkas kembali
          </span>
        </div>
      </div>
      <span class="text-h6 text-weight-bold">Formulir Persyaratan SC/HC</span>
      <span>Isi formulir pengajuan ini dengan data yang sesuai dan pastikan tidak ada data yang salah </span>

      <span class="text-body1 text-weight-medium q-mt-md">Berkas persyaratan SC/HC</span>
      <q-form @submit="onSubmit">
        <div class="q-gutter-sm q-mt-md">
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="schc"
              label="Surat permohonan penerbitan SC/HC"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="sppb"
              label="Upload SPPB"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="okratoksin"
              label="Upload File uji cemaran Okratoksin"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="aflatoksin"
              label="Upload File uji cemaran Aflatoksin"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
           <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="pestisida"
              label="Upload File Uji  Residu Pestisida"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
           </div>
          <div class="row items-center flex flex-center">
            <q-file
              class="col"
              v-model="organoleptik"
              label="Upload File Uji  Organoleptik & Proksimat"
              accept=".pdf, .png, .jpg, .jpeg, .doc, .docx"
              outlined
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <q-input
            label="Alamat Pembeli (Importir)"
            outlined
            type="textarea"
            v-model="alamat"
            :rules="[
              val => val !== null || 'Mohon Isi'
            ]"
            />
          <div class="column q-gutter-sm">
            <q-btn type="submit" label="Ubah File" color="green-10"/>
            <q-btn label="Batalkan" color="negative" @click="this.$router.go(-1)"/>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      schc: null,
      sppb: null,
      okratoksin: null,
      aflatoksin: null,
      organoleptik: null,
      pestisida: null,
      alamat: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      // console.log('panggil')
      this.$showLoading()
      this.$axios.get(`okkpd/getPengujianLab/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          const data = res.data.result
          this.schc = data.surat_sc_hc
          this.sppb = data.sppb
          this.okratoksin = data.okratoksin
          this.aflatoksin = data.aflatoksin
          this.organoleptik = data.organoleptik_proksimat
          this.pestisida = data.residu_pestisida
          this.alamat = data.alamat_pembeli
          this.isReadonly = true
        })
        .catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$showLoading()
      const formData = new FormData()
      formData.append('schc', this.schc)
      formData.append('sppb', this.sppb)
      formData.append('okratoksin', this.okratoksin)
      formData.append('aflatoksin', this.aflatoksin)
      formData.append('organoleptik', this.organoleptik)
      formData.append('pestisida', this.pestisida)
      formData.append('alamat', this.alamat)
      this.$axios.put(`okkpd/pengajuanRevisi/${this.$route.params.idDetail}/${this.$route.params.id}`, formData, this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          this.$notif(res.data.message, 'positive')
          this.$router.go(-1)
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
