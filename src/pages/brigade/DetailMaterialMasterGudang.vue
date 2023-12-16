<template>
  <q-page padding>
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="detail" label="Detail Produk" />
        <q-tab name="edit" label="Data Serial Number" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="detail">
          <q-card-section>

            <div class="row">
              <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                <div>
                  <q-carousel
                    arrows
                    animated
                    :autoplay="autoplay"
                    v-model="slide"
                    height="388px"
                    v-model:fullscreen="fullscreen"
                  >
                    <q-carousel-slide name="first" :img-src="data.mm_img != null ? $baseURL+'file-sarpras/'+data.mm_img : 'alsintan/barangsewa/tractorsampel.png'">
                      <div class="absolute-bottom custom-caption">
                        <div class="text-h2">{{ data.dtlk_nama }}</div>
                        <div class="text-subtitle1">{{ data.child_dtlk_nama }}</div>
                      </div>
                    </q-carousel-slide>
                    <template v-slot:control>
                      <q-carousel-control
                        position="bottom-right"
                        :offset="[18, 18]"
                      >
                        <q-btn
                          push round dense color="white" text-color="primary"
                          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                          @click="fullscreen = !fullscreen"
                        />
                      </q-carousel-control>
                    </template>
                  </q-carousel>
                </div>
              </div>

              <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                <q-scroll-area style="padding-left:10px; height: 388px;">
                  <div>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-h6">{{ data.mm_nama + '&nbsp;' + data.mm_merk }}</q-item-label>
                        <q-item-label caption>
                          {{ data.kategori_nama }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-h6">{{  data.dtlk_nama }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />

                    <q-tabs
                      v-model="tabrinci"
                      dense
                      class="text-grey"
                      active-color="primary"
                      indicator-color="primary"
                      align="justify"
                      narrow-indicator
                    >
                      <q-tab name="rincian" label="Detail" />
                      <q-tab name="info" label="Info Penting" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tabrinci" animated>
                      <q-tab-panel name="rincian">
                        <p style="color: gray">Kondisi: Baik
                          <br />Merk/ Seri: {{data.mm_merk}}
                          <br />Harga/ Satuan: {{harga}}</p>

                        <p class="text-bold">Deskripsi:</p>
                        <span v-html="data.mm_deskripsi">
                    </span>

                      </q-tab-panel>

                      <q-tab-panel name="info">
                        <div class="text-h6"> Kebijakan Retur / Pengembalian Barang</div>
                        <p>Syarat pengembalian barang:</p>
                        <ul>
                          <li>Barang yang kami kirim tidak sesuai pesanan.</li>
                          <li>Barang rusak (sobek / bolong) ketika sampai di tujuan.</li>
                        </ul>

                        <p>Apabila memenuhi salah satu syarat di atas, maka boleh mengembalikan barang ke kami dan ongkir kami tanggung.</p>

                        <p>KASUS KHUSUS JIKA:</p>
                        <ul>
                          <li>Barang yang sampai tidak sesuai dengan keinginan karena konsumen salah menyebutkan nama produk</li>

                          <li>Penyewa Menggelapkan Barang maupun menukar komponen dari barang yang disewa</li>
                        </ul>

                        <p>maka produk tetap boleh dikembalikan dengan syarat ongkir ditanggung oleh penyewa.</p>

                        <p>Ada masalah/keluhan?<br />
                          Hubungi kami langsung melalui pesan melalui Tokopedia.</p>

                        <p>Anda puas, kami senang!</p>

                        <p>Semoga terjalin hubungan yang baik dan berkelanjutan.<br />
                          Selamat berbelanja.</p>
                      </q-tab-panel>

                    </q-tab-panels>

                  </div>
                </q-scroll-area>
              </div>
            </div>
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="edit">
          <q-table
            :rows="datasn"
            :columns="kolomsn"
            row-key="serial_number"
            :filter="filtersn"
            flat
          >
            <template v-slot:top-right>
              <q-btn color="teal" v-if="show_filter" outline  label="Tambah SN" @click="openModalAdd(false)" />
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filtersn" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>
            <template v-slot:body-cell-status_dipinjam="props">
              <q-td :props="props">
                <img :src="props.row.status_dipinjam === true ? 'alsintan/out-of-stock.png' :  'alsintan/available.png'">
              </q-td>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="openModalEdit(true, props.row)" icon="receipt_long"> Ubah SN</q-btn>
                  <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>
                </div>
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <br />
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Riwayat Permohonan/ Transaksi</span>
      </q-card-section>
      <q-separator/>
      <q-tabs
        v-model="tabhistory"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="now" label="Sedang Berlangsung" />
        <q-tab name="selesai" label="Selesai/ Dikembalikan" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tabhistory" animated>
        <q-tab-panel name="now">
          <q-table
            :rows="rows3"
            :columns="columns"
            row-key="name"
            :filter="filter3"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter3" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-nama="props">
              <q-td :props="props">
                {{props.row.member_detail.nama}}<br />{{props.row.member_detail.kecamatan+' '+props.row.member_detail.kabupaten}}
              </q-td>
            </template>

            <template v-slot:body-cell-mm="props">
              <q-td :props="props">
                {{props.row.barang_detail.mm_nama +' - '+props.row.barang_detail.mm_merk}}
              </q-td>
            </template>

            <template v-slot:body-cell-permohonan_tgl_pinjam="props">
              <q-td :props="props">
                {{$parseDate(props.row.permohonan_tgl_pinjam).fullDate}}
              </q-td>
            </template>

            <template v-slot:body-cell-permohonan_tgl_kembali="props">
              <q-td :props="props">
                {{$parseDate(props.row.permohonan_tgl_kembali).fullDate}}
              </q-td>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>

        <q-tab-panel name="selesai">
          <q-table
            :rows="rows4"
            :columns="columns"
            row-key="name"
            :filter="filter4"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter4" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-nama="props">
              <q-td :props="props">
                {{props.row.member_detail.nama}}<br />{{props.row.member_detail.kecamatan+' '+props.row.member_detail.kabupaten}}
              </q-td>
            </template>

            <template v-slot:body-cell-mm="props">
              <q-td :props="props">
                {{props.row.barang_detail.mm_nama +' - '+props.row.barang_detail.mm_merk}}
              </q-td>
            </template>

            <template v-slot:body-cell-permohonan_tgl_pinjam="props">
              <q-td :props="props">
                {{$parseDate(props.row.permohonan_tgl_pinjam).fullDate}}
              </q-td>
            </template>

            <template v-slot:body-cell-permohonan_tgl_kembali="props">
              <q-td :props="props">
                {{$parseDate(props.row.permohonan_tgl_kembali).fullDate}}
              </q-td>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 750px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Form Serial Number</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.serial_number"
              label="Serial Number"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Simpan" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
export default {
  data () {
    return {
      tab: 'detail',
      tabrinci: 'rincian',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      tabhistory: 'now',
      dialog: false,
      modeedit: false,
      form: {
        id_sn: null,
        stok_id: null,
        serial_number: null
      },
      data: [],
      datasn: [],
      kolomsn: [
        { name: 'serial_number', align: 'left', label: 'Serial Number', field: 'serial_number' },
        { name: 'status_dipinjam', align: 'left', label: 'Dipinjam', field: 'status_dipinjam' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      rows3: [],
      rows4: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama Peminjam', field: 'nama' },
        { name: 'mm', align: 'left', label: 'Barang / SN', field: 'mm' },
        { name: 'permohonan_alamat', align: 'left', label: 'Lokasi Pengiriman', field: 'permohonan_alamat' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      filter3: '',
      filter4: '',
      filtersn: '',
      show_filter: true,
      harga: 0
    }
  },
  methods: {
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailPermohonan', params: { id: ids } })
    },
    getPengajuanBerlangsung () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/pengajuanmm/${profile.member.id_member}/${atob(this.$route.params.idgudang)}/${atob(this.$route.params.idmm)}/${atob(this.$route.params.idagen)}/6`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanSelesai () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/pengajuanmm/${profile.member.id_member}/${atob(this.$route.params.idgudang)}/${atob(this.$route.params.idmm)}/${atob(this.$route.params.idagen)}/8`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows4 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getMaterialMasterDetail () {
      this.$showLoading()
      this.$axios.get(`alsintan/material-master/detail/${atob(this.$route.params.idmm)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getSerialNumber () {
      // console.log(atob(this.$route.params.idagen))
      this.$showLoading()
      this.$axios.get(`alsintan/gudang-master/member/list-barang/serial-number/${profile.member.id_member}/${atob(this.$route.params.idmm)}/${atob(this.$route.params.idgudang)}/${atob(this.$route.params.idagen)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res.data.result[1])
          this.datasn = res.data.result[0]
          this.form.stok_id = res.data.result[0][0].stok_id
          this.harga = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(res.data.result[1].harga) + ' / ' + res.data.result[1].satuan_harga
        }).catch(() => this.$commonErrorNotif())
    },
    openModalEdit (mode, data) {
      this.dialog = true
      this.modeedit = mode
      this.form = data
    },
    openModalAdd (mode) {
      this.dialog = true
      this.modeedit = mode
    },
    onSubmit () {
      if (this.modeedit === true) {
        try {
          this.$showLoading()
          this.$axios.put(`alsintan/gudang-master/member/update-stok/${this.form.id_sn}`, { serial_number: this.form.serial_number }, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              // console.log(res)
              if (this.$parseResponse(res.data)) {
                this.form.id_sn = ''
                this.form.serial_number = ''
                this.modeedit = false
                this.dialog = false
                this.getSerialNumber()
              }
            })
            .catch(() => this.$commonErrorNotif())
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          this.$showLoading()
          this.$axios.post('alsintan/gudang-master/member/input-sn/', { stok_id: this.form.stok_id, serial_number: this.form.serial_number }, this.$createToken())
            .finally(() => this.$hide())
            .then(res => {
              // console.log(res)
              if (this.$parseResponse(res.data)) {
                this.form.id_sn = ''
                this.form.serial_number = ''
                this.modeedit = false
                this.dialog = false
                this.getSerialNumber()
              }
            })
            .catch(() => this.$commonErrorNotif())
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  created () {
    this.getMaterialMasterDetail()
    this.getSerialNumber()
    this.getPengajuanBerlangsung()
    this.getPengajuanSelesai()
  }
}
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
