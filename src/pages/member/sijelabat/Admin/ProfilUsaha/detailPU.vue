<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Detail Profil Usaha</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section>
        <div style="padding: 10px;text-align: center">
          <q-img style="width: 15%" src="https://cdn-icons-png.flaticon.com/128/3188/3188580.png">
            <div class="absolute-bottom text-subtitle1 text-center">
              Sijelabat
            </div>
          </q-img>
        </div>
        <table>
          <tbody>
          <tr>
            <td><b>Nama Usaha</b></td>
            <td>{{data.nama_usaha}}</td>
          </tr>
          <tr>
            <td><b>Status</b></td>
            <td><q-badge outline :color="data.status === true ? 'teal' : 'red'" :label="data.status === true ? 'Aktif' : 'Tidak Aktif'" /></td>
          </tr>
          <tr>
            <td><b>Verifikasi Admin</b></td>
            <td><span>{{data.verifikasi_admin === true ? 'Terverifikasi' : 'Belum Terverifikasi'}}</span></td>
          </tr>
          <tr>
            <td><b>Provinsi</b></td>
            <td>{{data.reg_provinces?.name}}</td>
          </tr>
          <tr>
            <td><b>Kabupaten/ Kota</b></td>
            <td>{{data.reg_regencies?.name}}</td>
          </tr>
          <tr>
            <td><b>Kecamatan</b></td>
            <td>{{data.reg_districts?.name}}</td>
          </tr>
          <tr>
            <td><b>Desa/ Kelurahan</b></td>
            <td>{{data.reg_villages?.name}}</td>
          </tr>
          <tr>
            <td><b>Alamat Usaha </b></td>
            <td>{{data.alamat_usaha}}</td>
          </tr>
          <tr>
            <td><b>Kontak/ HP/ WA</b></td>
            <td>{{data.kontak}}</td>
          </tr>
          <tr>
            <td><b>Akun Dibuat</b></td>
            <td>{{data.created_at === undefined ? '' : $dateTimeManual(data.created_at)}}</td>
          </tr>
          <tr>
            <td><b>Terakhir Diubah</b></td>
            <td>{{data.update_at === undefined ? '' : $dateTimeManual(data.update_at)}}</td>
          </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
    <br />
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h6 q-mt-sm q-mb-xs">Data Perbankan</div>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <table>
          <tbody>
          <tr>
            <td style="width: 30%"><b>Nama Bank</b></td>
            <td>{{data.rekening_bank_usaha && data.rekening_bank_usaha.length > 0 ? data.rekening_bank_usaha[0].master_bank.nama_bank : 'Data tidak tersedia'}}</td>
          </tr>
          <tr>
            <td><b>Atas Nama</b></td>
            <td>{{data.rekening_bank_usaha && data.rekening_bank_usaha.length > 0 ? data.rekening_bank_usaha[0].atas_nama : 'Data tidak tersedia'}}</td>
          </tr>
          <tr>
            <td><b>Nomor Rekening</b></td>
            <td>{{data.rekening_bank_usaha && data.rekening_bank_usaha.length > 0 ? data.rekening_bank_usaha[0].nomor_rekening : 'Data tidak tersedia'}}</td>
          </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
    <br />
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-h6 q-mt-sm q-mb-xs">Data Member</div>
        </q-card-section>
      </q-card-section>
      <q-card-section>
        <table>
          <tbody>
          <tr>
            <td style="width: 30%"><b>Nama Member</b></td>
            <td>{{data.member?.ktp?.nama }}</td>
          </tr>
          <tr>
            <td><b>No. KTP</b></td>
            <td>{{data.member?.ktp?.nik }}</td>
          </tr>
          <tr>
            <td><b>Alamat</b></td>
            <td>{{data.member?.ktp?.alamat }}</td>
          </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
    <br />
    <q-card flat bordered>
      <q-card-section>
        <q-btn @click="openDialog"  outline style="color: goldenrod; width: 100%" label="Action Profil Usaha" />
      </q-card-section>
    </q-card>
    <q-dialog v-model="modalFormPerusahaan">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Action Profil Usaha</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="saveAction">
          <q-card-section>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item>
                  <div class="q-gutter-sm">
                    <q-radio v-model="form.verifikasi_admin" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Verikasi Profil Usaha" />
                    <q-radio v-model="form.verifikasi_admin" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="Tolak Verifikasi" />
                  </div>
                </q-item>
              </div>
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item>
                  <div class="q-gutter-sm">
                    <q-radio v-model="form.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="true" label="Profil Usaha (Aktif)" />
                    <q-radio v-model="form.status" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" :val="false" label="Profil Usaha (Non-Aktif)" />
                  </div>
                </q-item>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-item>
              <q-btn flat  type="submit" label="Simpan Data" color="primary"/>
            </q-item>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
// import { parseProfile } from '../../../../../boot/Profile'
// const profile = parseProfile()
export default {
  name: 'profilUsahaPage',
  data () {
    return {
      data: [],
      modalFormPerusahaan: false,
      form: {
        verifikasi_admin: false,
        status: false
      }
    }
  },
  methods: {
    getProfilUsaha () {
      this.$showLoading()
      this.$axios.get(`sijelabat/admin-sijelabat/profil-usaha/detail/${this.$route.params.idpu}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog () {
      this.form.status = this.data.status
      this.form.verifikasi_admin = this.data.verifikasi_admin
      this.modalFormPerusahaan = true
    },
    saveAction () {
      this.$showLoading()
      this.$axios.put(`sijelabat/admin-sijelabat/profil-usaha/action/${this.$route.params.idpu}`, this.form, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data)) {
            this.modalFormPerusahaan = false
            this.getProfilUsaha()
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getProfilUsaha()
  }
}
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #F5F3F3;
}
</style>
