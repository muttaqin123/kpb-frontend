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
        <q-tab name="edit" label="Ubah Detail Produk" />
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
                    <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
                      <div class="absolute-bottom custom-caption">
                        <div class="text-h2">First stop</div>
                        <div class="text-subtitle1">Mountains</div>
                      </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
                      <div class="absolute-bottom custom-caption">
                        <div class="text-h2">Second stop</div>
                        <div class="text-subtitle1">Famous City</div>
                      </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
                      <div class="absolute-bottom custom-caption">
                        <div class="text-h2">Third stop</div>
                        <div class="text-subtitle1">Famous Bridge</div>
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
                        <q-item-label class="text-h6">Traktor Quick G1000 Siap Pakai Diesel Kubota RD DI 85 1S Bajak Sawah</q-item-label>
                        <q-item-label caption>
                          Kabupaten Lampung Selatan
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-h6">RP. 1000.000</q-item-label>
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
                        <p style="color: gray">Kondisi: Baru
                          <br />Berat Satuan: 328 Kg
                          <br />Kategori: Traktor Roda 2
                          <br />UPJA: Konco Tani</p>

                        <p class="text-bold">Deskripsi:</p>

                       <p> Spesifikasi:
                         <br />- Model:GT-100
                         <br />- Daya Maks. HP(Kw)rpm: 8HP/3600 rpm
                         <br /> - Lebar Bajak: 800-1200 mm
                         <br />- Kedalaman Bajak: 150-300 mm
                         <br />- Transmisi: -1,0,2,1
                         <br />- Model Pengedaraan: Gear
                         <br />- Model Mesin: GT-220 TURBO
                         <br /> - Bahan bakar: Bensin
                         <br />- Berat unit: 84 Kg
                         <br />- Berat aksesoris: 9 Kg</p>

                       <p> 1.Stok Ready, Harap hubungi kami terlebih dahulu untuk mengetahui biaya pengiriman
                         yang MURAH &AMAN untuk mesin yang hendak di beli dikarenakan berat mesin yang kami jual sangat berat.
                         Agar para customer kami tidak terbebani dengan ONGKIR yang sangat mahal.</p>

                        <p>2.Harga yang tertera belum termasuk ONGKIR</p>

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
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <br />
    <q-card flat>
      <q-card-section class="text-center">
        <span class="text-h6">Riwayat Pemesanan/ Transaksi</span>
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
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="selesai">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      tab: 'detail',
      tabrinci: 'rincian',
      tabhistory: 'now',
      slide: 'first',
      autoplay: true,
      fullscreen: false,
      listImage: [
        {
          img: 'barangsewa/traktor2.png',
          subTitle: 'Traktor Roda 2',
          api: 'SMA Xaverius Pahoman'
        },
        {
          img: 'barangsewa/traktor4.png',
          subTitle: 'Traktor Roda 4',
          api: 'SMA Yos Sudarso Metro'
        },
        {
          img: 'barangsewa/pompa.png',
          subTitle: 'Pompa',
          api: 'SMP Yos Sudarso Metro'
        },
        {
          img: 'barangsewa/transplanter.png',
          subTitle: 'Transplanter',
          api: 'SMA Yos Sudarso Metro'
        },
        {
          img: 'barangsewa/bibitpadi.png',
          subTitle: 'Bibit Padi',
          api: 'SMP Yos Sudarso Metro'
        },
        {
          img: 'barangsewa/benihpadi.png',
          subTitle: 'Benih Padi',
          api: 'SMP Yos Sudarso Metro'
        },
        {
          img: 'barangsewa/benihpadi.png',
          subTitle: 'Bibit Padi',
          api: 'Rice Milling Unit'
        },
        {
          img: 'gambar/yos.png',
          subTitle: 'Benih Padi',
          api: 'Reparasi'
        },
        {
          img: 'gambar/yos.png',
          subTitle: 'Bibit Padi',
          api: 'Pelatihan'
        },
        {
          img: 'gambar/yos.png',
          subTitle: 'Benih Padi',
          api: 'Suku Cadang'
        }
      ]
    }
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
