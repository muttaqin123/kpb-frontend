<template>
  <q-page padding>
    <q-card flat>
      <q-form @submit="onSubmit">
        <q-card-section class="text-center bg-transparent">

          <img style="width: 25%" src="img/alsintan/biodata.webp">
          <div class="text-h6 text-center">Harap Lengkapi Data Penyedia</div>
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
                <q-select :options="OptionsPekerjaan" @update:model-value="(val) => { val === 'Lainnya' ? form.bpjs_jenis_pekerjaan = null : form.bpjs_jenis_pekerjaan = val }"  :rules="[val => val !== null || 'Mohon Isi']" class="full-width" v-model="pekerjaan" label="Jenis Pekerjaan"/>
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
            <q-item v-if="pekerjaan == 'Lainnya'" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input v-model="form.bpjs_jenis_pekerjaan"  label="Mohon Tulis Jenis Pekerjaan Anda" placeholder="Contoh: Pedagang/ Teknisi/ Ojek/ Marbot/ dll."/>
              </q-item-section>
            </q-item>

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

const model = () => {
  return {
    bpjs_nokartu: null,
    bpjs_status: 1,
    bpjs_jenis_peserta: null,
    bpjs_jenis_pekerjaan: null,
    bpjs_lokasi_pekerjaan: null,
    bpjs_penghasilan: null,
    bpjs_program: null,
    bpjs_tmt: null,
    periode_pendaftaran: null,
    id_role: null
  }
}
export default {
  data () {
    return {
      form: model(),
      pekerjaan: null,
      OptionsPekerjaan: ['Petani', 'Nelayan', 'Peternak', 'Tenaga Kerja Perkebunan', 'Lainnya'],
      OptionsProgram: ['3 Program (JKK, JKM, & JHT)', '2 Program (JKK & JKM)'],
      OptionsPeriode: ['1 Bulan', '2 Bulan', '3 Bulan', '6 Bulan', '12 Bulan']
    }
  },
  methods: {
    resetForm () {
      this.form = model()
    }
  }
}
</script>
