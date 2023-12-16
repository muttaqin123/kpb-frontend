<template>
  <q-page padding>
    <q-card flat>
      <q-form @submit="onSubmit">
        <q-card-section class="text-center bg-transparent">

          <img style="width: 30%" src="img/asuransi/vc_form.png">
          <div class="text-h6 text-center">Mohon Diisi Dengan Benar</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input  v-model="form.bpjs_nokartu" :rules="[val => val !== null || 'Mohon Isi']" label="Nomor Kartu BPJS"/>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input  v-model="form.bpjs_jenis_peserta" :rules="[val => val !== null || 'Mohon Isi']" label="Jenis Peserta"/>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select :options="OptionsProgram"  :rules="[val => val !== null || 'Mohon Isi']" class="full-width" v-model="form.bpjs_program" label="Program yang Diikuti"/>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input @click="$refs.bpjs_tmt.show()"  v-model="form.bpjs_tmt" label="Terhitung Mulai Tanggal" mask="date" :rules="[val => val !== null || 'Mohon Isi'] || 'bpjs_tmt'">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover ref="bpjs_tmt" transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.bpjs_tmt" @update:model-value="$refs.bpjs_tmt.hide()"/>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select
                  :options="listSubsektor"
                  :rules="[val => val !== null || 'Mohon Isi']"
                  class="full-width"
                  v-model="sektor"
                  option-value="id"
                  option-label="desc"
                  option-disable="inactive"
                  emit-value
                  map-options
                  label="Jenis Subsektor" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input type="number" :rules="[val => val !== null || 'Mohon Isi']" v-model="form.bpjs_penghasilan"  label="Penghasilan (Rata-rata per Bulan)"/>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select :options="OptionsPeriode"  :rules="[val => val !== null || 'Mohon Isi']" class="full-width" v-model="form.periode_pendaftaran" label="Periode Pendaftaran Peserta"/>
              </q-item-section>
            </q-item>
            <!-- <q-item v-if="pekerjaan == 'Lainnya'" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="form.bpjs_jenis_pekerjaan"  label="Mohon Tulis Jenis Pekerjaan Anda" placeholder="Contoh: Pedagang/ Teknisi/ Ojek/ Marbot/ dll."/>
              </q-item-section>
            </q-item> -->

            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input rows="2" v-model="form.bpjs_lokasi_pekerjaan" :rules="[val => val !== null || 'Mohon Isi']" type="textarea"  label="Alamat/ Lokasi Pekerjaan"/>
              </q-item-section>
            </q-item>

          </div>
        </q-card-section>
        <q-card-actions align="center" class="text-primary">
          <q-btn color="primary" style="width: 75%" label="Simpan" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
import { parseProfile } from '../../../../boot/Profile'
const profile = parseProfile()
const model = () => {
  return {
    bpjs_nokartu: null,
    bpjs_status: 1,
    bpjs_jenis_peserta: null,
    bpjs_lokasi_pekerjaan: null,
    bpjs_penghasilan: null,
    bpjs_program: null,
    bpjs_tmt: null,
    periode_pendaftaran: null,
    member_id: profile.member.id_member,
    id_user: profile.member.users_login.id_users,
    id_role: null
  }
}
export default {
  data () {
    return {
      form: model(),
      sektor: null,
      listSubsektor: [
        {
          id: 1,
          desc: 'Pertanian'
        },
        {
          id: 2,
          desc: 'Perkebunan'
        },
        {
          id: 3,
          desc: 'Peternakan'
        },
        {
          id: 4,
          desc: 'Perikanan'
        },
        {
          id: 5,
          desc: 'Kehutanan'
        }
      ],
      OptionsPekerjaan: ['Petani', 'Nelayan', 'Peternak', 'Tenaga Kerja Perkebunan', 'Lainnya'],
      OptionsProgram: ['3 Program (JKK, JKM, & JHT)', '2 Program (JKK & JKM)'],
      OptionsPeriode: ['1 Bulan', '2 Bulan', '3 Bulan', '6 Bulan', '12 Bulan']
    }
  },
  methods: {
    onSubmit () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apabila sudah upload data tidak bisa diubah. Pastikan data yang anda masukan benar.',
        persistent: true,
        cancel: true
      }).onOk(() => {
        this.form.id_sektor = Number(this.sektor)
        this.form.id_role = Number(this.$route.params.idRole)
        this.$showLoading()
        this.$axios.post('master/bpjs', this.form, this.$createToken())
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
    }
  }
}
</script>
