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
  </q-page>
</template>

<script>
// import { parseProfile } from '../../../../../boot/Profile'
// const profile = parseProfile()
export default {
  name: 'profilUsahaPage',
  data () {
    return {
      data: []
    }
  },
  methods: {
    getProfilUsaha () {
      this.$showLoading()
      this.$axios.get(`sijelabat/kios/list-relasi/detail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
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
