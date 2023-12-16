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
          <q-card-section  v-for="barang in datakeranjang" :key="barang.material_master.mm_id" horizontal>
            <q-card-section :class="$q.screen.lt.md ? 'col-3 flex flex-center' : 'col-5 flex flex-center'">
              <q-img width="35%"
                     class="rounded-borders"
                     :src="`${$baseURL + 'file-sijelabat/' + barang.material_master.mm_img}`"
              />
            </q-card-section>
            <q-card-section :class="$q.screen.lt.md ? 'col-9' : 'col-7'">
              <div class="row">
                <div :class="$q.screen.lt.md ? 'col-6' : 'col-7'">
                  <div class="text-subtitle2 q-mt-sm"><b>{{barang.material_master.mm_nama}}</b></div>
                  <div class="text-subtitle2  q-mb-xs">KIOS: {{barang.profil_usaha.nama_usaha}}</div>
                  <div class="text-subtitle2  q-mb-xs">{{$convertRupiah(barang.harga.harga)}}</div>
                </div>
                <div :class="$q.screen.lt.md ? 'col-6' : 'col-5'">
                  <q-item>
                    <q-btn outline color="red" @click="hapusKeranjang(barang.keranjang_id)" size="sm" icon="delete" /> &nbsp;
                    <q-input color="blue" type="number"  min="1" @update:model-value="updateQuantity" outlined  v-model="barang.quantity"  required/>
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
            <div v-if="dataAlamat === undefined">
              <p>ALAMAT BELUM DILENGKAPI, MOHON LENGKAPI ALAMAT TERLEBIH DAHULU</p>
            </div>
            <div v-else-if="dataAlamat !== undefined && dataAlamat !== null">
              <p>{{ nama }}<br />{{ dataAlamat.kontak ? dataAlamat.kontak.toUpperCase() : '' }}</p>
              <p>
                {{ dataAlamat.alamat_lengkap ? dataAlamat.alamat_lengkap.toUpperCase() : '' }}
                KELURAHAN/ DESA {{ dataAlamat.reg_villages ? dataAlamat.reg_villages.name.toUpperCase() : '' }}
                KECAMATAN {{ dataAlamat.reg_districts ? dataAlamat.reg_districts.name.toUpperCase() : '' }}
                {{ dataAlamat.reg_regencies ? dataAlamat.reg_regencies.name.toUpperCase() : '' }}
                PROVINSI {{ dataAlamat.reg_provinces ? dataAlamat.reg_provinces.name.toUpperCase() : '' }}
              </p>
            </div>
            <q-btn color="primary" @click="setAlamat(false)" icon="edit"> Ubah Alamat</q-btn>
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
    <q-dialog v-model="modalAlamat">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Lengkapi Form Alamat</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="setAlamat(true)">
          <q-card-section>
            <div class="row">
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
                  <q-input type="textarea" outlined class="full-width" v-model="form.alamat_lengkap" label="Alamat Usaha"  :rules="[val => val !== null || 'Mohon Isi']"/>
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
              <q-btn flat  type="submit" label="Simpan Data Alamat" color="primary"/>
            </q-item>
          </q-card-actions>
        </q-form>
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
      modalAlamat: false,
      number: 0,
      datakeranjang: [],
      dataAlamat: [],
      dialogVisible: false,
      notes: null,
      nama: profile.nama,
      form: {
        member_id: Number(profile.member.id_member),
        layanan_id: Number(this.$route.params.idLayanan),
        prov_id: null,
        kab_id: null,
        kec_id: null,
        desa_id: null,
        alamat_lengkap: null,
        kontak: null
      },
      modeEditAlamat: false
    }
  },
  methods: {
    getAlamat () {
      this.$axios.get(`sijelabat/pembudi-daya/alamat/show/${btoa(profile.member.id_member)}/${btoa(this.$route.params.idLayanan)}`, this.$createToken())
        .then(res => {
          if (res.data.result.length > 0) {
            this.dataAlamat = res.data.result[0]
            this.modalAlamat = false
            this.modeEditAlamat = true
          } else {
            this.dataAlamat = res.data.result[0]
            this.modalAlamat = true
            this.modeEditAlamat = false
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getKeranjang () {
      this.$showLoading()
      this.$axios.get(`sijelabat/pembudi-daya/mm/rincian/${btoa(profile.member.id_member)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.datakeranjang = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    updateQuantity (val) {
      this.hitungTotalHarga()
    },
    setAlamat (status) {
      if (status) {
        this.form.prov_id = this.$store.state.area.provinsi.id
        this.form.kab_id = this.$store.state.area.kabupaten.id
        this.form.kec_id = this.$store.state.area.kecamatan.id
        this.form.desa_id = this.$store.state.area.desa.id

        if (this.modeEditAlamat) {
          this.$showLoading()
          this.$axios.put(`sijelabat/pembudi-daya/alamat/update/${btoa(this.dataAlamat.id_alamat)}`, this.form, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              // console.log(res)
              if (this.$parseResponse(res.data)) {
                this.modalAlamat = false
                this.getAlamat()
                this.getKeranjang()
              }
            })
            .catch(() => this.$commonErrorNotif())
        } else {
          this.$showLoading()
          this.$axios.post('sijelabat/pembudi-daya/alamat/insert/', this.form, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              // console.log(res)
              if (this.$parseResponse(res.data)) {
                this.modalAlamat = false
                this.getAlamat()
                this.getKeranjang()
              }
            })
            .catch(() => this.$commonErrorNotif())
        }
      } else {
        this.modalAlamat = true
      }
    },
    updateKeranjang () {
      this.$showLoading()
      this.$axios.post('sijelabat/pembudi-daya/keranjang/quantity/update', this.datakeranjang, this.$createToken())
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
          total + barang.harga.harga * barang.quantity,
        0
      )
      return this.totalHarga
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

        // Verifikasi apakah alamat telah diisi
        if (!this.dataAlamat) {
          this.$notif('Alamat pengiriman belum diisi. Mohon lengkapi alamat terlebih dahulu.', 'negative')
          return
        }

        const data = this.datakeranjang
        // Gunakan Array.prototype.every untuk memeriksa kondisi pada setiap elemen
        const isQuantityValid = data.every(item => {
          const quantity = Number(item.quantity)
          const availableStock = item.stok.stok

          // Periksa apakah jumlah yang dimasukkan melebihi stok yang tersedia
          if (quantity > availableStock) {
            // Munculkan pesan kesalahan atau dialog
            this.$notif(`Jumlah produk ${item.material_master.mm_nama} melebihi stok yang tersedia (${availableStock}).`, 'negative')

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
    groupDataByProfilUsaha (data) {
      return data.barang.reduce((acc, barang) => {
        const key = barang.profil_usaha_penyedia_id
        const existingGroup = acc.find((group) => group.profil_usaha_penyedia_id === key)

        if (existingGroup) {
          existingGroup.barang.push(barang)
        } else {
          const newGroup = {
            member_id_pembeli: data.member_id_pembeli,
            role_pembeli: data.role_pembeli,
            notes: data.notes,
            layanan_id_pembeli: data.layanan_id_pembeli,
            profil_usaha_penyedia_id: key,
            nomor_transaksi: 'TRNSPD-' + this.generateRandomNumber() + 'N' + Date.now(),
            barang: [barang]
          }
          acc.push(newGroup)
        }

        return acc
      }, [])
    },
    proceedToCheckout () {
      const form = {
        member_id_pembeli: profile.member.id_member,
        role_pembeli: this.$route.params.idRole,
        notes: this.notes,
        barang: this.datakeranjang,
        layanan_id_pembeli: this.$route.params.idLayanan
      }

      // Menyusun data untuk dielompokkan
      const dataToGroup = {
        member_id_pembeli: form.member_id_pembeli,
        role_pembeli: form.role_pembeli,
        notes: form.notes,
        layanan_id_pembeli: form.layanan_id_pembeli,
        barang: form.barang
      }

      const groupedData = this.groupDataByProfilUsaha(dataToGroup)

      // Menyusun form akhir dengan data yang sudah dikelompokkan
      const finalForm = groupedData.map((group) => ({
        ...group
      }))
      this.$showLoading()
      this.$axios.post('sijelabat/pembudi-daya/pembelian/save/', finalForm, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            this.$router.push({ name: 'sijelabatRiwayatPemesananPembudidaya' })
          }
        })
        .catch(() => this.$commonErrorNotif())
    },
    generateRandomNumber () {
      const randomNumber = Math.floor(Math.random() * 10) // Angka acak antara 0 dan 9
      return randomNumber.toString() // Mengonversi angka menjadi string
    }
  },
  created () {
    this.getAlamat()
    this.getKeranjang()
  }
}
</script>

<style scoped>

</style>
