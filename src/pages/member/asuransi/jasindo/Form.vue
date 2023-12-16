<template>
  <q-page padding>
    <q-card flat>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">Form Asuransi Jasindo</div>
          <div class="row q-col-gutter-x-md">
            <div class="col-md-6 col-xs-12">
              <q-select
                v-model="form.jenis_asuransi"
                :options="jenisAsuransi"
                label="Jenis Asuransi"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                v-model="form.nama_kelompok"
                label="Nama Kelompok"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                v-model="form.nama_ketua_kelompok"
                label="Nama Ketua Kelompok"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <area-provinsi />
              <area-kabupaten />
              <area-kecamatan />
              <area-desa />
              <q-input
                v-model="form.alamat"
                label="Alamat Lengkap"
                type="textarea"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
            </div>
            <div class="col-md-6 col-xs-12">
              <q-input
                v-model="form.lintang"
                label="Lintang"
                type="number"
                :rules="[null]"
              />
              <q-input
                v-model="form.bujur"
                label="Bujur"
                type="number"
                :rules="[null]"
              />
              <div v-if="form.jenis_asuransi === 'AUTP'">
                <q-select
                  v-model="form.musim_tanam"
                  :options="listMusimTanam"
                  label="Musim Tanam"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-select
                  v-model="form.metode_tanam"
                  :options="metodeTanam"
                  label="Metode Tanam"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input @click="$refs.prakiraan_tanam.show()"  v-model="form.prakiraan_tanam" label="Prakiraan Tanam" mask="date" :rules="[val => val !== null || 'Mohon Isi']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover ref="prakiraan_tanam" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.prakiraan_tanam" @update:model-value="$refs.prakiraan_tanam.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                <q-input @click="$refs.prakiraan_panen.show()"  v-model="form.prakiraan_panen" label="Prakiraan Panen" mask="date" :rules="[val => val !== null || 'Mohon Isi']">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover ref="prakiraan_panen" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.prakiraan_panen" @update:model-value="$refs.prakiraan_panen.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-input
                  v-model="form.jalur_distribusi"
                  label="Jalur Distribusi"
                  :rules="[null]"
                />
              <q-file
                v-model="file"
                label="Unggah File Anggota"
                accept=".xlsx"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-btn :disable="form.jenis_asuransi === null" label="Download Template" :href="`${form.jenis_asuransi === 'AUTP' ? `${$baseURL}files/template_autp.xlsx` : `${$baseURL}files/template_auts.xlsx`}`" type="a" target="_blank" outline color="dark" no-caps/>
              <q-btn
                label="Simpan"
                class="full-width q-mt-md"
                unelevated
                color="dark"
                type="submit"
              />
            </div>
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
import { parseProfile } from '../../../../boot/Profile'
const model = () => {
  return {
    jenis_asuransi: null,
    nama_kelompok: null,
    nama_ketua_kelompok: null,
    kab_id: null,
    kec_id: null,
    desa_id: null,
    alamat: null,
    lintang: null,
    bujur: null,
    musim_tanam: null,
    metode_tanam: null,
    prakiraan_tanam: null,
    prakiraan_panen: null,
    jalur_distribusi: null,
    created_by: parseProfile().member.id_member,
    id_user: parseProfile().member.users_login.id_users
  }
}
export default {
  data () {
    return {
      form: model(),
      file: null,
      jenisAsuransi: ['AUTP', 'AUTS'],
      listMusimTanam: ['1', '2', '3', '4', '5'],
      metodeTanam: ['Salibu', 'Semai', 'Tabela']
    }
  },
  created () {
    this.$resetArea()
  },
  methods: {
    onSubmit () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apabila sudah upload data tidak bisa diubah. Pastikan data yang anda masukan benar.',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        const formData = new FormData()
        this.form.kab_id = this.$store.state.area.kabupaten.id
        this.form.kec_id = this.$store.state.area.kecamatan.id
        this.form.desa_id = this.$store.state.area.desa.id
        formData.append('data', JSON.stringify(this.form))
        formData.append('file_anggota', this.file)
        this.$axios.post('master/asuransis', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.resetForm()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    resetForm () {
      this.$resetArea()
      this.form = model()
      this.file = null
    }
  }
}
</script>
