<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Form Agen Alsintan</span>
      </q-card-section>
      <q-separator/>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                v-model="form.nik"
                label="NIK"
                stack-label
                color="primary"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
            </q-item-section>
          </q-item>

          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                v-model="form.nama"
                label="Nama"
                stack-label
                color="primary"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
            </q-item-section>
          </q-item>
          <q-item v-if="idparams === '00'" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <area-provinsi />
            </q-item-section>
          </q-item>
          <q-item v-if="idparams === '00'" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <area-kabupaten />
            </q-item-section>
          </q-item>
          <q-item v-if="idparams === '00'" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
             <area-kecamatan />
            </q-item-section>
          </q-item>
          <q-item v-if="idparams === '00'" class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <area-desa />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                v-model="form.alamat"
                label="Alamat"
                stack-label
                color="primary"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                v-model="form.kode_post"
                label="Kode Post"
                stack-label
                color="primary"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                v-model="form.no_hp"
                label="No Hp/No WA"
                stack-label
                color="primary"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
            <q-input
              v-model="form.email"
              label="E-Mail"
              stack-label
              color="primary"
              :rules="[null]"
            />
            </q-item-section>
          </q-item>
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
            <div class="text-left">Jenis Kelamin</div>
            <div class="q-gutter-sm text-left">
              <q-radio
                dense v-model="form.jenis_kelamin"
                val="Laki-Laki" label="Laki-Laki"
                :rules="[
                            val => val !== null || 'Wajib Diisi'
                          ]"
              />
              <q-radio dense v-model="form.jenis_kelamin" val="Perempuan" label="Perempuan" />
            </div>
            </q-item-section>
          </q-item>

        </div>
        <q-card-actions align="center">
          <q-item v-if="idparams === '00'"  class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-btn style="background-color: slategray" type="submit" icon="ios_share" class="text-capitalize  text-white"> &nbsp; Simpan Data Agen</q-btn>
            </q-item-section>
          </q-item>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
const model = () => {
  return {
    nik: null,
    nama: null,
    id_prov: null,
    id_kab: null,
    id_kec: null,
    id_desa: null,
    alamat: null,
    jenis_kelamin: 'Laki-Laki',
    no_hp: null,
    email: null,
    kode_post: null
  }
}
export default {
  data () {
    return {
      isPwd: true,
      form: model(),
      idparams: atob(this.$route.params.nik)
    }
  },
  created () {
    this.$resetArea()
    if (this.idparams !== '00') {
      this.getDetailAgen()
    }
  },
  methods: {
    onSubmit () {
      if (this.idparams === '00') {
        this.form.id_prov = this.$store.state.area.provinsi.id
        this.form.id_kab = this.$store.state.area.kabupaten.id
        this.form.id_kec = this.$store.state.area.kecamatan.id
        this.form.id_desa = this.$store.state.area.desa.id

        this.$showLoading()
        this.$axios.post('alsintan/agen-save', this.form, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res.data)
            if (this.$parseResponse(res.data)) {
              this.form = model()
              this.$resetArea()
              this.$notif(res.data.message)
            }
          }).catch(() => this.$commonErrorNotif())
      }
    },
    getDetailAgen () {
      this.$showLoading()
      this.$axios.get(`alsintan/agen-detail/${this.idparams}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.form = res.data.result[0]
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>

<style scoped>

</style>
