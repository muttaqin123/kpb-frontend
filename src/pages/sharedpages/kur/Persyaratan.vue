<template>
  <q-page>
    <div v-if="isRead" class="column">
      <div :class="`${!this.$q.screen.xs ? 'q-px-xl card-honey' : 'q-px-sm'} bg-yellow-15`">
        <div class="col column q-gutter-sm q-py-sm ">
          <div class="row">
            <q-btn
              @click="this.$router.go(-1)"
              icon="mdi-arrow-left"
              label="Kembali"
              rounded
              class="bg-white text-grey-9"
              no-caps/>
          </div>
          <span class="text-h5 green-15 tex text-weight-bold">{{ result?.nama_bank }}</span>
          <span class="text-body text-grey-8">Bantuan Permodalan KUR</span>
          <div class="row">
            <div class="col-auto q-pa-sm">
              <q-btn label="Download Template" no-caps class="bg-green-15 text-white"/>
            </div>
            <div class="col-auto q-pa-sm">
              <q-btn @click="isRead = !isRead" label="Ajukan Permohonan" no-caps class="bg-green-15 text-white"/>
            </div>
          </div>
        </div>
      </div>
      <div :class="`${!this.$q.screen.xs ? 'q-px-xl' : 'q-px-sm'} q-pa-sm`">
        <iframe :src="result?.url" frameborder="0" width="100%" height="500px"/>
      </div>
    </div>
    <div v-else class="column">
      <div :class="`${!this.$q.screen.xs ? 'q-px-xl card-honey' : 'q-px-sm'} bg-yellow-15`">
        <div class="col column q-gutter-sm q-py-md ">
          <div class="row">
            <q-btn
              @click="backToRead"
              icon="mdi-arrow-left"
              label="Kembali"
              rounded
              class="bg-white text-grey-9"
              no-caps/>
          </div>
          <span class="text-h5 green-15 tex text-weight-bold">Formulir Pengajuan KUR {{ result?.nama_bank }}</span>
          <span class="text-body text-grey-8">Silahkan isi formulir dengan sebenar-benarnya</span>
        </div>
      </div>
      <div :class="`${!this.$q.screen.xs ? 'q-px-xl' : 'q-px-sm'} `">
        <q-form @submit="onSubmit">
          <div class="row q-pa-lg q-mt-md q-mb-xl bg-white justify-between" style="border-radius: 5px">
            <div class="col-md-6 col-xs-12 q-gutter-sm">
              <q-input
                dense
                outlined
                v-model="form.nama_pasangan"
                label="Nama Pasangan"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                dense
                outlined
                v-model="form.pekerjaan"
                label="Pekerjaan"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-select
                dense
                outlined
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
                outlined
                v-model="form.status_rumah"
                label="Status Rumah"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-select
                :options="listSektorUsaha"
                dense
                outlined
                v-model="form.sektor_usaha"
                label="Sektor Usaha"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                dense
                outlined
                v-model="form.alamat_usaha"
                label="Alamat Usaha"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                label="Tanggal Mulai Usaha"
                outlined
                dense
                v-model="form.lama_usaha"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.lama_usaha" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-select
                :options="listStatusTempatUsaha"
                dense
                outlined
                v-model="form.status_tempat_usaha"
                label="Status Tempat Usaha"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
            </div>
            <div class="col-md-6 col-xs-12 q-gutter-sm">
              <q-input
                dense
                outlined
                v-model="form.jumlah_tenaga_kerja"
                label="Jumlah Tenaga Kerja (Orang)"
                type="number"
                :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
              dense
              outlined
              v-model="form.keperluan_kur"
              label="Keperluan KUR"
              :rules="[
                  val => val !== null || 'Mohon Isi'
                ]"
              />
              <q-input
                dense
                outlined
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
                outlined
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
                outlined
              >
                <template v-slot:append>
                  <q-icon name="attach_file"/>
                </template>
              </q-file>
              <q-file
                v-model="file_lainnya1"
                label="File KTP/KK/Foto Tempat Usaha/Foto Rumah"
                accept=".jpg, .pdf, image/*"
                :rules="[null]"
                dense
                outlined
              >
                <template v-slot:append>
                  <q-icon name="attach_file"/>
                </template>
              </q-file>
              <div class="column">
                <q-btn type="submit" label="Ajukan Permohonan" color="green-10" no-caps/>
              </div>
              <div class="column">
                <q-btn @click="backToRead" label="Batalkan Permohonan" color="red" no-caps/>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
    <div class="flex flex-center absolute-bottom" style="background-color:#024830; color: white">
      <span>Copyright © 2023 Kartu Petani Berjaya. All Right Reserved</span>
    </div>
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
      isRead: true,
      result: null,
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
    onSubmit () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apabila sudah upload data tidak bisa diubah. Pastikan data yang anda masukan benar.',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.$showLoading()
        this.form.id_bank = this.$route.params.idBank
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
              this.$router.go(-1)
            }
          })
          .catch(() => this.$commonErrorNotif())
      })
    },
    backToRead () {
      this.isRead = true
      this.form = model()
      this.file_rut = null
      this.file_lainnya1 = null
      this.dialog = false
      this.data = null
    },
    getBank () {
      this.$showLoading()
      this.$axios.get(`master/bank/${this.$route.params.idBank}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.result = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
