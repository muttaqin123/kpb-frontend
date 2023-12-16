<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Checkout Pemesanan</strong>
    </q-banner>
    <br />
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat>
          <q-card-section class="text-center text-h6 text-black ">
            <q-icon name="shopping_cart" class="q-mr-sm"/>
            Order Summary
          </q-card-section>
          <q-card-section  v-for="barang in datakeranjang" :key="barang.mm_id" horizontal>
            <q-card-section :class="$q.screen.lt.md ? 'col-3 flex flex-center' : 'col-5 flex flex-center'">
              <q-img width="35%"
                     class="rounded-borders"
                     :src="`${$baseURL + 'file-sijelabat/' + barang.mm_img}`"
              />
            </q-card-section>
            <q-card-section :class="$q.screen.lt.md ? 'col-9' : 'col-7'">
              <div class="row">
                <div :class="$q.screen.lt.md ? 'col-6' : 'col-7'">
                  <div class="text-subtitle2 q-mt-sm">{{barang.mm_nama}}</div>
                  <div class="text-subtitle2  q-mb-xs">{{$convertRupiah(barang.harga_jelabat[0].harga)}}</div>
                </div>
                <div :class="$q.screen.lt.md ? 'col-6' : 'col-5'">
                  <q-item>
                    <q-btn outline color="red" @click="hapusKeranjang(barang.keranjang_sijelabat[0].keranjang_id)" size="sm" icon="delete" /> &nbsp;
                    <q-input color="blue" type="number"  min="1" @update:model-value="updateQuantity" outlined  v-model="barang.keranjang_sijelabat[0].quantity"  required/>
                  </q-item>
                </div>
              </div>
            </q-card-section>
          </q-card-section>
          <q-card-section class="text-right">
            <div class="text-right">
              <q-btn outline color="teal" label="Simpan Dalam Keranjang" @click="updateKeranjang" size="sm" icon="shopping_cart_checkout" /> &nbsp;
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <span style="font-size: 20px"><b>Alamat Pengiriman:</b></span>
            <p>{{ dataprofilUsaha?.nama_usaha.toUpperCase() }}<br />{{ dataprofilUsaha?.kontak.toUpperCase() }}</p>
            <p>
              {{ dataprofilUsaha?.alamat_usaha.toUpperCase() }}
              KELURAHAN/ DESA {{ dataprofilUsaha?.reg_villages.name.toUpperCase() }}
              KECAMATAN {{ dataprofilUsaha?.reg_districts.name.toUpperCase() }}
              {{ dataprofilUsaha?.reg_regencies.name.toUpperCase() }}
              PROVINSI {{ dataprofilUsaha?.reg_provinces.name.toUpperCase() }}
            </p>
            <q-btn color="primary" @click="toProfilUsaha" icon="edit"> Ubah Alamat</q-btn>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat>
          <q-card-section class="text-center text-h6 text-black ">
            <q-icon name="payments" class="q-mr-sm"/>
            Total Pembayaran
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <div class="row">
              <div class="col-lg-6">
                <span style="font-size: 15px">Subtotal</span><br />
                <span style="font-size: 15px">Biaya Layanan</span>
              </div>
              <div class="col-lg-6">
                <span style="font-size: 15px"><b>{{ $convertRupiah(hitungTotalHarga()) }}</b></span><br />
                <span style="font-size: 15px"><b>Rp. 0</b></span>
              </div>
            </div>
            <br /><q-separator/>
            <div class="row">
              <div class="col-lg-6">
                <span style="font-size: 18px">Total</span><br />
              </div>
              <div class="col-lg-6">
                <span style="font-size: 18px"><b>{{ $convertRupiah(hitungTotalHarga()) }}</b></span>
              </div>
              <div class="col-lg-12" style="padding-top: 30px">
                <q-list bordered class="rounded-borders full-width">
                  <q-expansion-item
                    expand-separator
                    icon="mode_comment"
                    label="Ingin Menambahkan Catatan Untuk Penjual?"
                  >
                    <q-card>
                      <q-card-section>
                        <div class="text-center">
                          <q-input type="textarea" outlined class="full-width" v-model="notes" label="Tambah Catatan/ Keterangan" />
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list> <br />
                <q-btn style="width: 100%;"  :disabled="hitungTotalHarga() === 0" color="primary" @click="toCheckout(false)" icon="payments"> &nbsp;Checkout Pemesanan</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- Dialog Konfirmasi -->
    <q-dialog v-model="dialogVisible" persistent>
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Konfirmasi Pesanan</q-card-title>
        </q-card-section>

        <q-card-section>
          <!-- Pesan konfirmasi -->
          <p>
            Sebelum Anda melanjutkan untuk menyelesaikan pesanan, kami ingin memastikan bahwa Anda telah memeriksa pesanan Anda dengan teliti. Pastikan jumlah produk yang Anda pesan sesuai dengan keinginan Anda.
          </p>
          <p>
            Apakah Anda yakin ingin melanjutkan ke proses checkout sekarang? Ini akan mengonfirmasi pesanan Anda dan mengirimkannya untuk diproses. Jika Anda masih perlu melakukan perubahan atau memeriksa kembali pesanan Anda, silakan lakukan sekarang.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <!-- Tombol OK untuk melanjutkan checkout -->
          <q-btn label="Lanjutkan" color="primary" @click="toCheckout(true)" />
          <!-- Tombol Batal untuk menutup dialog -->
          <q-btn label="Batal" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../../../../boot/Profile'
const profile = parseProfile()
export default {
  name: 'Checkout',
  data () {
    return {
      number: 0,
      datakeranjang: [],
      dataprofilUsaha: null,
      dialogVisible: false,
      notes: null
    }
  },
  methods: {
    getProfilUsaha () {
      this.$axios.get(`sijelabat/profil-usaha/show/byidmember/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .then(res => {
          this.dataprofilUsaha = res.data.result[0]
        }).catch(() => this.$commonErrorNotif())
    },
    getKeranjang () {
      this.$showLoading()
      this.$axios.put(`sijelabat/checkout/mm/rincian/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`,
        { member_id_pembeli: profile.member.id_member, profil_usaha_penyedia_id: this.$route.params.id }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (res.data.code === 507) {
            this.$notif(res.data.message, 'negative')
            this.toProfilUsaha()
          } else {
            if (this.$parseResponse(res.data, false)) {
              // console.log(res)
              this.datakeranjang = res.data.result
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateQuantity (val) {
      this.hitungTotalHarga()
    },
    updateKeranjang () {
      this.$showLoading()
      this.$axios.post('sijelabat/checkout/keranjang/quantity/update', this.datakeranjang, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            // console.log(res)
            this.getKeranjang()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    hitungTotalHarga () {
      // Hitung total harga dari seluruh barang dalam datakeranjang
      this.totalHarga = this.datakeranjang.reduce(
        (total, barang) =>
          total + barang.harga_jelabat[0].harga * barang.keranjang_sijelabat[0].quantity,
        0
      )
      return this.totalHarga
    },
    toProfilUsaha () {
      this.$router.push({ name: 'sijelabatProfilUsahakios' })
    },
    hapusKeranjang (id) {
      this.$showLoading()
      this.$axios.delete(`sijelabat/checkout/keranjang/hapus/${btoa(id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.getKeranjang()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    toCheckout (status) {
      if (status) {
        this.dialogVisible = false
        const data = this.datakeranjang
        // Gunakan Array.prototype.every untuk memeriksa kondisi pada setiap elemen
        const isQuantityValid = data.every(item => {
          const quantity = Number(item.keranjang_sijelabat[0].quantity)
          const availableStock = item.stok_pakan[0].stok

          // Periksa apakah jumlah yang dimasukkan melebihi stok yang tersedia
          if (quantity > availableStock) {
            // Munculkan pesan kesalahan atau dialog
            this.$notif(`Jumlah produk ${item.mm_nama} melebihi stok yang tersedia (${availableStock}).`, 'negative')

            return false // Setiap elemen harus valid
          }
          return true
        })

        if (isQuantityValid) {
          this.proceedToCheckout()
        }
      } else {
        this.dialogVisible = true
      }
    },
    proceedToCheckout () {
      const form = {
        member_id_pembeli: profile.member.id_member,
        role_pembeli: this.$route.params.idRole,
        profil_usaha_penyedia_id: atob(this.$route.params.id),
        nomor_transaksi: 'TRNSDR-' + Date.now(),
        notes: this.notes,
        barang: this.datakeranjang,
        layanan_id_pembeli: this.$route.params.idLayanan
      }

      this.$showLoading()
      this.$axios.post('sijelabat/checkout/pembelian/save/', form, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            const ids = btoa(res.data.result)
            this.$router.push({ name: 'sijelabatDetailPemesanankios', params: { id: ids } })
          }
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getKeranjang()
    this.getProfilUsaha()
  }
}
</script>

<style scoped>

</style>
