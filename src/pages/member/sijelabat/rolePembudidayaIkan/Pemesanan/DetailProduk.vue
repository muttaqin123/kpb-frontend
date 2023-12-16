<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Detail Produk</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section horizontal>
        <q-img
          :style="$q.screen.lt.md ? {'width': '55%'} : {'width': '50%'}"
          :src="$baseURL+'file-sijelabat/'+detailProduk.material_master?.mm_img"
        />
        <q-card-section>
          <span>PRODUK:</span>
          <div class="text-h5 q-mt-sm q-mb-xs">{{detailProduk.material_master?.mm_nama}}</div>
          <span style="color: blue">Merk: {{detailProduk.material_master?.mm_merk}}</span><br /><br />
          <span style="font-size: 20px"> {{$convertRupiah(detailProduk.material_master?.harga_jelabat[0].harga)}}</span><br />
          <p style="padding-top: 20px">
            Nama Toko/ Perusahaan: {{detailProduk.profil_usaha?.nama_usaha}}<br />
            Alamat: {{detailProduk.profil_usaha?.alamat_usaha}}<br />
            Kontak: {{detailProduk.profil_usaha?.kontak}}</p><br />
          <p style="padding-top: 25px">
            <q-btn color="primary" @click="saveKeranjang" icon="add_shopping_cart" label="Pesan Sekarang" />
          </p>
        </q-card-section>
      </q-card-section>
    </q-card><br />
    <q-card flat>
      <q-card-section>
        <span style="font-size: 20px">Deskripsi Produk: </span>
        <p>
          Deskripsi Dari Penjual: <br />
          {{detailProduk.keterangan}}
        </p>

        <p>
          Deskripsi Dari Produsen: <br />
          {{detailProduk.material_master?.mm_deskripsi}}
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'DetailProduk',
  data () {
    return {
      detailProduk: []
    }
  },
  methods: {
    getDetailProduk () {
      this.$showLoading()
      this.$axios.get(`sijelabat/pembudi-daya/list-produk/detail/${this.$route.params.idmm}/${this.$route.params.idprofilusaha}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.detailProduk = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    saveKeranjang () {
      this.$showLoading()
      this.$axios.post('sijelabat/pembudi-daya/keranjang/input/', {
        mm_id: this.detailProduk.mm_id,
        profil_usaha_penyedia_id: this.detailProduk.profil_usaha.profil_usaha_id,
        member_id_pembeli: profile.member.id_member
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.$router.push({ name: 'sijelabatCheckoutListProdukPembudidaya' })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getDetailProduk()
  }
}
</script>

<style scoped>

</style>
