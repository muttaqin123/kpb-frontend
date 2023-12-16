<template>
  <q-page padding>
    <q-banner inline-actions rounded style="background-color: #050D33; color: #FFFFFF">
      <strong>Detail Transaksi</strong>
    </q-banner>
    <br />
    <q-card flat>
      <q-card-section>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>ID TRANSAKSI</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ datapemesanan.nomor_transaksi }}</div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>STATUS</div>
            <div class="text-h5 q-mt-sm q-mb-xs"><q-badge outline color="primary" :label="datapemesanan.order_status_sijelabat?.nama_status" /><br />
              <q-btn outline color="red" v-if="datapemesanan.kode_order_status === 1"  @click="openKonfirmasiDialog"> Verifikasi Pemesanan</q-btn>
              <q-btn outline color="red" v-if="datapemesanan.kode_order_status === 4"  @click="verifPembayaran(datapemesanan)"> Verifikasi Pembayaran</q-btn>
              <q-btn outline color="red" v-if="datapemesanan.kode_order_status === 6"  @click="nextStatus(7)"> Konfirmasi Pengiriman</q-btn>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div>TANGGAL</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{$parseDate(datapemesanan.created_at).fullDate}}</div>
          </div>
        </div>
      </q-card-section>
    </q-card><br />
    <div class="row">
      <div style="padding-right: 10px" class="col-lg-8 col-md-8 col-sm-12 col-xs-12" >
        <q-card flat>
          <q-card-section>
            <q-item-label>Produk: </q-item-label>
          </q-card-section>
          <!--          <q-separator />-->
          <q-card-section>
            <table>
              <tbody>
              <tr v-for="barang in datapemesanan.order_mm_jelabat" :key="barang.mm_id">
                <td><b>{{barang.material_master.mm_nama}}</b> <br /> {{$convertRupiah(barang.harga_riwayat_jelabat.harga) +' x '+ barang.quantity}}</td>
                <td>{{$convertRupiah(calculateSubtotal(barang.harga_riwayat_jelabat.harga, barang.quantity))}}</td>
              </tr>
              <tr style="background-color: #D9D9D9">
                <td><b>Total</b></td>
                <td><b>{{$convertRupiah(calculateTotal())}}</b></td>
              </tr>
              </tbody>
            </table>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <div class="q-px-lg q-pb-md">
              <q-timeline color="secondary">
                <div class="text-center">
                  <H5>Log Status Pemesanan</H5>
                </div>
                <q-timeline-entry v-for="(a, i) in datapemesanan.order_status_riwayat_sijelabat" :key="i" :title="a.order_status_sijelabat.nama_status"
                                  :subtitle="$parseDate(a.created_at).fullDate">
                  <div>
                    {{a.order_status_sijelabat.deskripsi}}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" >
        <q-card flat>
          <q-card-section>
            <q-item-label>Catatan/ Notes Pembeli: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{ datapemesanan.notes ?? '-' }}</b></span>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <q-item-label>Feedback/ Keterangan Dari Penyedia/ Penjual: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{ datapemesanan.feedback_penjual ?? '-' }}</b></span>
          </q-card-section>
        </q-card><br />
        <q-card flat>
          <q-card-section>
            <q-item-label>Alamat Pengiriman: </q-item-label>
          </q-card-section>
          <q-card-section>
            <span><b>{{dataprofilUsaha.nama_usaha}}</b></span><br />
            <span>{{dataprofilUsaha.kontak}}</span><br />
            <span>
                   {{ dataprofilUsaha?.alamat_usaha?.toUpperCase() }}
                    KELURAHAN/ DESA {{ dataprofilUsaha?.reg_villages?.name?.toUpperCase() }}
                    KECAMATAN {{ dataprofilUsaha?.reg_districts?.name?.toUpperCase() }}
                    {{ dataprofilUsaha?.reg_regencies?.name?.toUpperCase() }}
                    PROVINSI {{ dataprofilUsaha?.reg_provinces?.name?.toUpperCase() }}
                </span>
          </q-card-section>
          <q-card-section>
            <!--            <q-btn outline color="primary" > Cetak Nota Transaksi</q-btn>-->
          </q-card-section>
        </q-card><br />
        <q-card flat v-if="datapemesanan.kode_order_status > 4 && datapemesanan.kode_order_status < 9 ">
          <q-card-section>
            <q-list bordered class="rounded-borders">
              <q-expansion-item
                switch-toggle-side
                expand-separator
                label="Lihat Bukti Pembayaran"
              >
                <div class="row">
                  <div class="col-lg-12" style="padding-top: 10px">
                    <q-img :src="`${$baseURL + 'file-sijelabat-buktibayar/' + datapemesanan.bukti_bayar}`" />
                  </div>
                  <div style="padding-top: 20px" class="col-12">
                    <table>
                      <tbody>
                      <tr>
                        <td>Nominal Bayar</td>
                        <td>{{$convertRupiah(datapemesanan.nominal_bayar)}}</td>
                      </tr>
                      <tr>
                        <td>Metode Pembayaran</td>
                        <td>{{datapemesanan.metode_pembayaran}}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </q-expansion-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="dialogKonfirmasiPemesanan">
      <q-card>
        <q-card-section>
          <q-card-title class="text-h6">Konfirmasi Pesanan</q-card-title>
        </q-card-section>

        <q-card-section>
          <!-- Pesan konfirmasi -->
          <p>
            Harap konfirmasi kesesuaian pemesanan berdasarkan jumlah stok, lokasi pengiriman, atau hal lainnya.
            Jika Anda setuju, silahkan klik tombol "Setujui Pemesanan". Jika Anda ingin menolak pemesanan, klik tombol "Tolak Pemesanan".
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <!-- Tombol Setujui Pemesanan -->
          <q-btn label="Setujui Pemesanan" color="positive" @click="konfirmasiPemesanan(3)" />
          <!-- Tombol Tolak Pemesanan -->
          <q-btn label="Tolak Pemesanan" color="negative" @click="openRejectArea('pmsn')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Dialog Alasan Tolak -->
    <q-dialog v-model="dialogAlasanTolak">
      <q-card style="width: 400px; max-width: 95%">
        <q-card-section>
          <q-card-title class="text-h6">Alasan Tolak Pesanan</q-card-title>
        </q-card-section>

        <q-card-section>
          <!-- Area Keterangan Alasan Tolak -->
          <q-input type="textarea" v-model="alasanTolak" label="Alasan Tolak" placeholder="Berikan alasan Anda untuk menolak pesanan" dense />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Tombol Submit Alasan Tolak -->
          <q-btn label="Kirim Alasan Tolak" color="negative" @click="konfirmasiPemesanan(9)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogTolakPembayaran">
      <q-card style="width: 400px; max-width: 95%">
        <q-card-section>
          <q-card-title class="text-h6">Alasan Tolak Pembayaran</q-card-title>
        </q-card-section>

        <q-card-section>
          <!-- Area Keterangan Alasan Tolak -->
          <q-input type="textarea" v-model="alasanTolak" label="Alasan Tolak" placeholder="Berikan alasan Anda untuk menolak pembayaran" dense />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Tombol Submit Alasan Tolak -->
          <q-btn label="Kirim Alasan Tolak" color="negative" @click="konfirmasiPembayaran(3)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogBuktiBayar">
      <q-card style="width: 600px; max-width: 95%">
        <q-card-section>
          <q-card-title class="text-h6">Verifikasi Pembayaran</q-card-title>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col-lg-12">
              <q-img :src="`${$baseURL + 'file-sijelabat-buktibayar/' + form.bukti_bayar}`" />
            </div>
            <div style="padding-top: 20px" class="col-12">
              <table>
                <tbody>
                <tr>
                  <td>Nominal Bayar</td>
                  <td>{{$convertRupiah(form.nominal_bayar)}}</td>
                </tr>
                <tr>
                  <td>Metode Pembayaran</td>
                  <td>{{form.metode_pembayaran}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn  label="Setujui Pembayaran" color="positive" @click="konfirmasiPembayaran(6)" />
          <q-btn label="Tolak & Minta Upload Ulang" color="orange" @click="openRejectArea('pmbyr')" />
          <q-btn  label="Batalkan Pemesanan" color="negative" @click="openRejectArea" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
// import { parseProfile } from '../../../../../boot/Profile'
// const profile = parseProfile()
export default {
  name: 'listKatalogLayout',
  data () {
    return {
      datapemesanan: [],
      dataprofilUsaha: [],
      dialogKonfirmasiPemesanan: false,
      dialogAlasanTolak: false,
      dialogTolakPembayaran: false,
      alasanTolak: null,
      dialogBuktiBayar: false,
      form: {
        metode_pembayaran: null,
        bukti_bayar: null,
        nominal_bayar: null
      }
    }
  },
  methods: {
    getProfilUsaha () {
      this.$axios.get(`sijelabat/profil-usaha/show/byidmember/${btoa(this.datapemesanan.member_id_pembeli)}/${btoa(this.datapemesanan.layanan_id_pembeli)}`, this.$createToken())
        .then(res => {
          this.dataprofilUsaha = res.data.result[0]
        }).catch(() => this.$commonErrorNotif())
    },
    getDetailRiwayat () {
      this.$showLoading()
      this.$axios.get(`sijelabat/distributor/list-transaksi/detail/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.datapemesanan = res.data.result
            this.getProfilUsaha()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    calculateSubtotal (harga, quantity) {
      return harga * quantity
    },
    calculateTotal () {
      if (this.datapemesanan && this.datapemesanan.order_mm_jelabat) {
        return this.datapemesanan.order_mm_jelabat.reduce((total, barang) => {
          return total + this.calculateSubtotal(barang.harga_riwayat_jelabat.harga, barang.quantity)
        }, 0)
      } else {
        return 0 // atau nilai default lainnya
      }
    },
    openKonfirmasiDialog () {
      // Fungsi ini dipanggil untuk membuka dialog konfirmasi pemesanan
      this.dialogKonfirmasiPemesanan = true
    },
    openRejectArea (type) {
      // Fungsi ini dipanggil ketika tombol tolak ditekan untuk menampilkan area keterangan alasan
      this.dialogKonfirmasiPemesanan = false
      this.dialogBuktiBayar = false
      if (type === 'pmbyr') {
        this.dialogTolakPembayaran = true
      } else {
        this.dialogAlasanTolak = true
      }
    },
    konfirmasiPemesanan (status) {
      this.$showLoading()
      this.$axios.put(`sijelabat/distributor/list-transaksi/konfirmasi-pemesanan/${this.$route.params.id}`,
        {
          kode_order_status: status,
          feedback_penjual: this.alasanTolak
        }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            this.feedback_penjual = null
            this.dialogKonfirmasiPemesanan = false
            this.dialogAlasanTolak = false
            this.getDetailRiwayat()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    konfirmasiPembayaran (status) {
      this.$showLoading()
      this.$axios.put(`sijelabat/distributor/list-transaksi/konfirmasi-pembayaran/${this.$route.params.id}`,
        {
          kode_order_status: status,
          feedback_penjual: this.alasanTolak,
          profil_usaha_id: this.datapemesanan.profil_usaha.profil_usaha_id,
          order_mm_jelabat: this.datapemesanan.order_mm_jelabat
        }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            this.dialogBuktiBayar = false
            this.dialogTolakPembayaran = false
            this.feedback_penjual = null
            this.getDetailRiwayat()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    nextStatus (status) {
      this.$showLoading()
      this.$axios.put(`sijelabat/universal/detail-transaksi/next-status/${this.$route.params.id}`,
        {
          kode_order_status: status
        }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, true)) {
            this.getDetailRiwayat()
          }
        }).catch(() => this.$commonErrorNotif())
    },
    verifPembayaran (data) {
      this.form = data
      this.dialogBuktiBayar = true
    }
  },
  created () {
    this.getDetailRiwayat()
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
  background-color: #ffffff;
}
</style>
