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
            <div class="text-h5 q-mt-sm q-mb-xs"><q-badge outline color="primary" :label="datapemesanan.order_status_sijelabat?.nama_status" /></div>
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
            <span>
              <b>{{ dataAlamat.member ? dataAlamat.member.ktp.nama.toUpperCase() : dataAlamat.nama_usaha }}</b>
            </span><br />
            <span>{{ dataAlamat.kontak ? dataAlamat.kontak.toUpperCase() : '' }}</span><br />
            <span>
              {{ dataAlamat.alamat_lengkap ? dataAlamat.alamat_lengkap.toUpperCase() : '' }}
                KELURAHAN/ DESA {{ dataAlamat.reg_villages ? dataAlamat.reg_villages.name.toUpperCase() : '' }}
                KECAMATAN {{ dataAlamat.reg_districts ? dataAlamat.reg_districts.name.toUpperCase() : '' }}
                {{ dataAlamat.reg_regencies ? dataAlamat.reg_regencies.name.toUpperCase() : '' }}
                PROVINSI {{ dataAlamat.reg_provinces ? dataAlamat.reg_provinces.name.toUpperCase() : '' }}
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
      dataAlamat: []
    }
  },
  methods: {
    getProfilUsaha () {
      if (this.datapemesanan.layanan_id_pembeli === 28) {
        this.$axios.get(`sijelabat/pembudi-daya/alamat/show/${btoa(this.datapemesanan.member_id_pembeli)}/${btoa(this.datapemesanan.layanan_id_pembeli)}`, this.$createToken())
          .then(res => {
            this.dataAlamat = res.data.result[0]
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$axios.get(`sijelabat/profil-usaha/show/byidmember/${btoa(this.datapemesanan.member_id_pembeli)}/${btoa(this.datapemesanan.layanan_id_pembeli)}`, this.$createToken())
          .then(res => {
            this.dataAlamat = res.data.result[0]
          }).catch(() => this.$commonErrorNotif())
      }
    },
    getDetailRiwayat () {
      this.$showLoading()
      this.$axios.get(`sijelabat/admin-sijelabat/laporan/data-transaksi/detail/${this.$route.params.idtr}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
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
