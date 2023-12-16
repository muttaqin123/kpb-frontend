<template>
  <q-page padding>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
      <div class="col-12" v-for="bank in listBank" :key="bank">
        <q-card flat>
          <q-card-section>
            <div class="text-h5 text-bold text-primary">{{ bank.nama_bank }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Tekan Tombol Detail Untuk Melihat Persyarat KUR.
          </q-card-section>
          <q-card-section class="q-pt-none row q-col-gutter-y-sm q-col-gutter-x-sm">
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-btn color="primary" outline class="full-width" unelevated @click="bank.opened = !bank.opened">
                <div class="text-button text-primary">{{ bank.opened ? 'Tutup Detail' : 'Lihat Persyaratan' }}</div>
              </q-btn>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
              <q-btn color="primary" class="full-width" unelevated @click="openDialog(bank)">
                <div class="text-button">Form Pengajuan</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <q-card flat v-if="bank.opened">
          <q-card-section>
            <iframe class="full-width" style="height: 800px;" :src="bank.url" frameborder="1"></iframe>
          </q-card-section>
        </q-card>
        <!-- <q-card flat>
          <q-card-section>
            <div class="text-h5 text-bold text-primary">{{ m.nama_bank }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ m.alamat }}
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-btn color="primary" unelevated @click="openDialog(m)">
              <div class="text-button">Ajukan Sekarang</div>
            </q-btn>
          </q-card-section>
        </q-card> -->
      </div>
    </div>
    <q-dialog v-model="dialog" persistent v-if="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Form Pengajuan KUR {{ data.nama_bank }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row q-col-gutter-x-md">
              <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6">
                <q-input
                  dense
                  v-model="form.nama_pasangan"
                  label="Nama Pasangan"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                  dense
                  v-model="form.pekerjaan"
                  label="Pekerjaan"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-select
                  dense
                  v-model="form.status_nasabah"
                  label="Status Nasabah"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                  :options="listStatusNasabah"
                />
                <q-select
                  :options="listStatusRumah"
                  dense
                  v-model="form.status_rumah"
                  label="Status Rumah"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-select
                  :options="listSektorUsaha"
                  dense
                  v-model="form.sektor_usaha"
                  label="Sektor Usaha"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                  dense
                  v-model="form.alamat_usaha"
                  label="Alamat Usaha"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                  dense
                  v-model="form.lama_usaha"
                  label="Tanggal Mulai Usaha"
                  type="date"
                  stack-label
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-select
                  :options="listStatusTempatUsaha"
                  dense
                  v-model="form.status_tempat_usaha"
                  label="Status Tempat Usaha"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12 col-lg-6">
                <q-input
                  dense
                  v-model="form.jumlah_tenaga_kerja"
                  label="Jumlah Tenaga Kerja (Orang)"
                  type="number"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                dense
                v-model="form.keperluan_kur"
                label="Keperluan KUR"
                :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-input
                  dense
                  v-model="form.jumlah"
                  label="Jumlah Pengajuan"
                  type="number"
                  :rules="[
                    val => val !== null || 'Mohon Isi',
                    val => val <= 100000000 || 'Jumlah maksimum Rp.100.000.000,00',
                  ]"
                  prefix="Rp."
                />
                <q-input
                  dense
                  v-model="form.jangka_waktu"
                  label="Jangka Waktu (Bulan)"
                  type="number"
                  :rules="[
                    val => val !== null || 'Mohon Isi'
                  ]"
                />
                <q-file
                  v-model="file_rut"
                  label="Unggah File Rencana Usaha"
                  accept=".jpg, .pdf, image/*"
                  :rules="[null]"
                  dense
                />
                <q-file
                  v-model="file_lainnya1"
                  label="File KTP/KK/Foto Tempat Usaha/Foto Rumah"
                  accept=".jpg, .pdf, image/*"
                  :rules="[null]"
                  dense
                />
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
const model = () => {
  return {
    nama_pasangan: null,
    pekerjaan: null,
    status_nasabah: null,
    status_rumah: null,
    sektor_usaha: null,
    alamat_usaha: null,
    lama_usaha: null,
    status_tempat_usaha: null,
    jumlah_tenaga_kerja: null,
    keperluan_kur: null,
    jumlah: null,
    jangka_waktu: null,
    id_member: null,
    id_bank: null,
    id_role: null,
    id_user: null
  }
}
export default {
  data () {
    return {
      listBank: [],
      data: null,
      dialog: false,
      form: model(),
      file_rut: null,
      file_lainnya1: null,
      listStatusNasabah: ['Baru', 'Lama'],
      listStatusRumah: ['Sewa', 'Kontrak', 'Milik Orang Tua', 'Milik Sendiri'],
      listSektorUsaha: ['Perdagangan', 'Pertanian', 'Perkebunan', 'Perikanan', 'Peternakan', 'Lainnya'],
      listStatusTempatUsaha: ['Sewa', 'Kontrak', 'Milik Orang Tua', 'Milik Sendiri']
    }
  },
  created () {
    this.getBank()
  },
  methods: {
    getBank () {
      this.$showLoading()
      this.$axios.get('master/bank', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listBank = res.data.result.map(r => {
              return { ...r, opened: false }
            })
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog (data) {
      this.data = data
      this.dialog = true
    },
    onSubmit () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apabila sudah upload data tidak bisa diubah. Pastikan data yang anda masukan benar.',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        this.form.id_bank = this.data.id
        this.form.id_member = this.$getProfile().member.id_member
        this.form.id_role = this.$route.params.idRole
        this.form.id_user = this.$getProfile().member.users_login.id_users

        const formData = new FormData()
        formData.append('data', JSON.stringify(this.form))
        if (this.file_rut) formData.append('file_rut', this.file_rut)
        if (this.file_lainnya1) formData.append('file_lainnya1', this.file_lainnya1)
        this.$axios.post('kur/pengajuan', formData, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.resetForm()
            }
          })
          .catch(() => this.$commonErrorNotif())
      })
    },
    resetForm () {
      this.form = model()
      this.file_rut = null
      this.file_lainnya1 = null
      this.dialog = false
      this.data = null
    }
  }
}
</script>
