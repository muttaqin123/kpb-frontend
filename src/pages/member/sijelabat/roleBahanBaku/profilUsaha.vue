<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Lengkapi Profil Usaha Dengan Benar</strong>
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
            <td><b>Role</b></td>
            <td><q-badge outline color="blue" label="Role Bahan Baku" /></td>
          </tr>
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
    </q-card><br />

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
    </q-card><br />

    <q-card flat bordered>
      <q-card-section>
        <q-btn @click="openDialog"  outline style="color: goldenrod; width: 100%" label="Ubah/ Lengkapi Nama Perusahaan" />
      </q-card-section>
    </q-card>
    <q-dialog v-model="modalFormPerusahaan">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Lengkapi Form Profil Usaha</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="savePerusahaan">
          <q-card-section>
            <div class="row">
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="form.nama_usaha" label="Nama Usaha"  :rules="[val => val !== null || 'Mohon Isi']"/>
                </q-item>
              </div>
              <q-item  class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-provinsi />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-kabupaten />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-kecamatan />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <area-desa />
                </q-item-section>
              </q-item>
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item>
                  <q-input type="textarea" outlined class="full-width" v-model="form.alamat_usaha" label="Alamat Usaha"  :rules="[val => val !== null || 'Mohon Isi']"/>
                </q-item>
              </div>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-select outlined class="full-width"  v-model="formrekening.master_bank_id" use-input
                          option-value="id" option-label="nama_bank"
                          input-debounce="0" label="Pilih Bank"
                          :rules="[(val) => val || 'Isi']"
                          :options="optionsBank" @filter="filterBank" behavior="menu" >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No results
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item>

              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="formrekening.nomor_rekening" label="Nomor Rekening"  :rules="[val => val !== null || 'Mohon Isi']"/>
                </q-item>
              </div>

              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item>
                  <q-input type="text" outlined class="full-width" v-model="formrekening.atas_nama" label="Atas Nama"  :rules="[val => val !== null || 'Mohon Isi']"/>
                </q-item>
              </div>

              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item>
                  <q-input type="number" outlined class="full-width" v-model="form.kontak" label="Nomor HP/WA/Telp."  :rules="[val => val !== null || 'Mohon Isi']"/>
                </q-item>
              </div>

            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-item>
              <q-btn flat  type="submit" label="Simpan Data Usaha" color="primary"/>
            </q-item>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../boot/Profile'
const profile = parseProfile()
let listBank = []
export default {
  name: 'profilUsahaPage',
  data () {
    return {
      modalFormPerusahaan: false,
      modeEdit: false,
      optionsBank: listBank,
      data: [],
      form: {
        member_id: Number(profile.member.id_member),
        layanan_id: Number(this.$route.params.idLayanan),
        kode_usaha: 'PUBB-' + Date.now(),
        nama_usaha: null,
        status: true,
        profil_usaha_provinsi: null,
        profil_usaha_kabupaten: null,
        profil_usaha_kecamatan: null,
        profil_usaha_desa: null,
        alamat_usaha: null,
        verifikasi_admin: false,
        kontak: null
      },
      formrekening: {
        master_bank_id: null,
        nomor_rekening: null,
        utama: true,
        atas_nama: null
      }
    }
  },
  methods: {
    getProfilUsaha () {
      this.$showLoading()
      this.$axios.get(`sijelabat/profil-usaha/show/byidmember/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.result.length < 1) {
            this.modeEdit = false
            this.modalFormPerusahaan = true
          } else {
            this.modeEdit = true
            const result = res.data.result[0]
            this.data = result
            this.form = result
            this.form.profil_usaha_provinsi = result.reg_provinces
            this.form.profil_usaha_kabupaten = result.reg_regencies
            this.form.profil_usaha_kecamatan = result.reg_districts
            this.form.profil_usaha_desa = result.reg_villages
            this.formrekening.nomor_rekening = result.rekening_bank_usaha[0].nomor_rekening
            this.formrekening.master_bank_id = result.rekening_bank_usaha[0].master_bank
          }
        }).catch(() => this.$commonErrorNotif())
    },
    openDialog () {
      this.modalFormPerusahaan = true
    },
    loadBank () {
      this.$axios.get('sijelabat/profil-usaha/master-bank/show/', this.$createToken())
        .then(res => {
          // console.log(res)
          listBank = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    filterBank (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsBank = listBank.filter(v => v.nama_bank.toLowerCase().indexOf(needle) > -1)
      })
    },
    savePerusahaan () {
      this.form.profil_usaha_provinsi = this.$store.state.area.provinsi.id
      this.form.profil_usaha_kabupaten = this.$store.state.area.kabupaten.id
      this.form.profil_usaha_kecamatan = this.$store.state.area.kecamatan.id
      this.form.profil_usaha_desa = this.$store.state.area.desa.id
      this.formrekening.master_bank_id = Number(this.formrekening.master_bank_id.id)
      if (this.modeEdit) {
        this.$showLoading()
        this.$axios.put(`sijelabat/profil-usaha/update/${btoa(this.form.profil_usaha_id)}`, [this.form, this.formrekening], this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              this.modalFormPerusahaan = false
              this.getProfilUsaha()
            }
          })
          .catch(() => this.$commonErrorNotif())
      } else {
        this.$showLoading()
        this.$axios.post('sijelabat/profil-usaha/insert/', [this.form, this.formrekening], this.$createToken())
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
    }
  },
  created () {
    this.getProfilUsaha()
    this.loadBank()
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
