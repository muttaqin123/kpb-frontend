<template>
  <q-page padding>
    <q-card flat>
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
                      <br /></p>

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
    </q-card>
    <br />
    <q-card flat>
      <q-form @submit="simpanstok">
        <q-card-section>
          <div class="row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select  :options="optionsHarga"  outlined class="full-width" v-model="form.harga_id"  label="Pilih Master Harga"  option-value="id_harga" :option-label="opt => Object(opt) === opt && 'harga' in opt ? opt.harga +' / '+ opt.satuan_harga : '--'" />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-select  :options="OptionAgen"  outlined class="full-width" v-model="form.id_agen" label="Pilih Agen"   option-value="id_member"  option-label="nama"/>
              </q-item-section>
            </q-item>
          </div>
          <div class="row" v-for="(f, i) in formsn" :key="i">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input :rules="[val => val !== null || 'Mohon Isi']" outlined v-model="f.serial_number" label="Serial Number"/>
              </q-item-section>
              <q-item-section>
                <q-input :rules="[val => val !== null || 'Mohon Isi']" outlined v-model="f.keterangan" label="Keterangan"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-btn style="background-color: darkred" :disable="i === 0" @click="hapusForm(i)" icon="add_circle" class="text-capitalize  text-white">Hapus</q-btn>

            </q-item>
          </div>
          <div>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

              <q-btn style="background-color: darkolivegreen" @click="tambahForm" icon="add_circle" class="text-capitalize  text-white">Tambah Stok</q-btn>

            </q-item>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-item-section>
              <q-btn style="background-color: slategray" type="submit" icon="save" class="text-capitalize  text-white">Simpan Stok Ke Gudang</q-btn>
            </q-item-section>
          </q-item>

        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
const model = () => {
  return {
    serial_number: '',
    keterangan: ''
  }
}
export default {
  data () {
    const idmm = atob(this.$route.params.id)
    const idgudang = atob(this.$route.params.idgudang)
    return {
      tab: 'detail',
      tabrinci: 'rincian',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      tabhistory: 'now',
      optionsHarga: [{
        id_harga: null,
        harga: null,
        satuan_harga: null
      }],
      formsn: [
        model()
      ],
      form: {
        id_member: profile.member.id_member,
        id_mm: parseInt(idmm),
        id_gudang: parseInt(idgudang),
        stok_status: true,
        harga_id: 0,
        id_agen: null
      },
      data: [],
      OptionAgen: [{
        id_member: null,
        nama: null
      }]
    }
  },
  methods: {
    hapusForm (i) {
      this.formsn.splice(i, 1)
    },
    tambahForm () {
      this.formsn.push(model())
    },
    getMaterialMasterDetail () {
      this.$showLoading()
      this.$axios.get(`alsintan/material-master/detail/${atob(this.$route.params.id)}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.data = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getOptionsAgen () {
      this.$axios.get('alsintan/agen', this.$createToken())
        .then(res => {
          this.OptionAgen = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    simpanstok () {
      // console.log(this.form)
      try {
        const formData = new FormData()
        formData.append('Stok', this.form)

        for (const [i, v] of this.formsn.entries()) {
          formData.append(`formsn[${i}][sn]`, v)
        }
        this.$showLoading()
        this.$axios.post('alsintan/gudang-master/member/input-stok', [this.form, this.formsn], this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            // console.log(res)
            if (this.$parseResponse(res.data)) {
              // this.resetForm()
            }
          })
          .catch(() => this.$commonErrorNotif())
      } catch (e) {
        console.log(e)
      }
    },
    resetForm () {
      this.formsn = model()
    },
    getOptionHarga () {
      this.$axios.get('alsintan/master-harga/getAll', this.$createToken())
        .then(res => {
          this.optionsHarga = res.data.result
        }).catch(() => this.$commonErrorNotif())
    }
  },
  created () {
    this.getMaterialMasterDetail()
    this.getOptionsAgen()
    this.getOptionHarga()
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
