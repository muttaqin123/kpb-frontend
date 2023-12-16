<template>
<q-page padding>
  <q-card flat>
    <q-card-section class="text-center">
      <span class="text-h6">Riwayat Peminjaman/ Transaksi</span>
    </q-card-section>
    <q-separator/>
    <q-splitter
      v-model="splitterModel"
    >
    <template v-slot:before>
      <q-tabs
        v-model="tabhistory"
        vertical
        class="text-teal"
      >
              <q-tab name="review"   label="Sedang Ditinjau" />
              <q-tab name="accept"   label="Disetujui" />
              <q-tab name="keluarbarang"   label="Pengeluaran Barang" />
              <q-tab name="distkeagen"   label="Distribusi Ke Agen" />
              <q-tab name="send"   label="Proses Pengiriman" />
              <q-tab name="now"   label="Sedang Berlangsung" />
              <q-tab name="selesai"   label="Selesai/ Dikembalikan" />
              <q-tab name="reject"   label="Ditolak" />
              <q-tab name="cancel"   label="Dibatalkan" />
      </q-tabs>
    </template>
    <template v-slot:after>
      <q-tab-panels
        v-model="tabhistory"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="review">
          <div class="text-h4 q-mb-md">Ditinjau</div>
          <q-table
            :rows="rows1"
            :columns="columns1"
            row-key="name"
            :filter="filter1"
            flat
          >
                      <template v-slot:top-right>
                        <q-space style="padding-right: 10px" />
                        <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter1" placeholder="Search">
                          <template v-slot:append>
                            <q-icon name="search"/>
                          </template>
                        </q-input>
                        <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
                      </template>

                      <template v-slot:body-cell-aksi="props">
                        <q-td :props="props">
                          <div class="q-gutter-sm">
                            <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                          </div>
                        </q-td>
                      </template>

                      <template v-slot:body-cell-status="props">
                        <q-td :props="props">
                          <q-badge outline :color="props.row.permohonan_status_pinjam === 1 ? 'primary' : 'purple'" :label="props.row.permohonan_status_pinjam === 1 ? 'Sedang Ditinjau' : 'Dalam Proses Pengiriman'" />
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

                      <template v-slot:body-cell-gudang_lokasi="props">
                        <q-td :props="props">
                          {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
                        </q-td>
                      </template>

                      <template v-slot:body-cell-gudang_nama="props">
                        <q-td :props="props">
                          {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
                        </q-td>
                      </template>

                    </q-table>
        </q-tab-panel>
        <q-tab-panel name="accept">
          <div class="text-h4 q-mb-md">Disetujui</div>
          <q-table
            :rows="rows2a"
            :columns="columns3"
            row-key="name"
            :filter="filter2a"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter2a" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
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

            <template v-slot:body-cell-gudang_lokasi="props">
              <q-td :props="props">
                {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
              </q-td>
            </template>

            <template v-slot:body-cell-gudang_nama="props">
              <q-td :props="props">
                {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>
        <q-tab-panel name="keluarbarang">
          <div class="text-h4 q-mb-md">Pengeluaran Barang</div>
          <q-table
            :rows="rows3a"
            :columns="columns3"
            row-key="name"
            :filter="filter3a"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter3a" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
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

            <template v-slot:body-cell-gudang_lokasi="props">
              <q-td :props="props">
                {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
              </q-td>
            </template>

            <template v-slot:body-cell-gudang_nama="props">
              <q-td :props="props">
                {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>
        <q-tab-panel name="distkeagen">
          <div class="text-h4 q-mb-md">Distribusi Provinsi Ke Agen</div>
          <q-table
            :rows="rows4a"
            :columns="columns3"
            row-key="name"
            :filter="filter4a"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter4a" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>
              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
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

            <template v-slot:body-cell-gudang_lokasi="props">
              <q-td :props="props">
                {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
              </q-td>
            </template>

            <template v-slot:body-cell-gudang_nama="props">
              <q-td :props="props">
                {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
              </q-td>
            </template>

          </q-table>
        </q-tab-panel>
        <q-tab-panel name="send">
          <div class="text-h4 q-mb-md">Dikirim Oleh Agen</div>
                  <q-table
                    :rows="rows2"
                    :columns="columns1"
                    row-key="name"
                    :filter="filter2"
                    flat
                  >
                    <template v-slot:top-right>
                      <q-space style="padding-right: 10px" />
                      <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter2" placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search"/>
                        </template>
                      </q-input>

                      <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
                    </template>

                    <template v-slot:body-cell-aksi="props">
                      <q-td :props="props">
                        <div class="q-gutter-sm">
                          <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                        </div>
                      </q-td>
                    </template>

                    <template v-slot:body-cell-status="props">
                      <q-td :props="props">
                        <q-badge outline :color="props.row.permohonan_status_pinjam === 1 ? 'primary' : 'purple'" :label="props.row.permohonan_status_pinjam === 1 ? 'Sedang Ditinjau' : 'Dalam Proses Pengiriman'" />
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

                    <template v-slot:body-cell-gudang_lokasi="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
                      </q-td>
                    </template>

                    <template v-slot:body-cell-gudang_nama="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
                      </q-td>
                    </template>

                  </q-table>
        </q-tab-panel>
        <q-tab-panel name="now">
          <div class="text-h4 q-mb-md">Berlangsung</div>
                  <q-table
                    :rows="rows3"
                    :columns="columns3"
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

                    <template v-slot:body-cell-aksi="props">
                      <q-td :props="props">
                        <div class="q-gutter-sm">
                          <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                        </div>
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

                    <template v-slot:body-cell-gudang_lokasi="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
                      </q-td>
                    </template>

                    <template v-slot:body-cell-gudang_nama="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
                      </q-td>
                    </template>

                  </q-table>
        </q-tab-panel>
        <q-tab-panel name="selesai">
          <div class="text-h4 q-mb-md">Selesai</div>
                  <q-table
                    :rows="rows4"
                    :columns="columns1"
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

                    <template v-slot:body-cell-aksi="props">
                      <q-td :props="props">
                        <div class="q-gutter-sm">
                          <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                        </div>
                      </q-td>
                    </template>

                    <template v-slot:body-cell-status="props">
                      <q-td :props="props">
                        <q-badge outline :color="props.row.permohonan_status_pinjam === 0 ? 'red' : 'teal'" :label="props.row.permohonan_status_pinjam === 1 ? 'Ditolak' : 'Selesai'" />
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

                    <template v-slot:body-cell-gudang_lokasi="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
                      </q-td>
                    </template>

                    <template v-slot:body-cell-gudang_nama="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
                      </q-td>
                    </template>
                  </q-table>
        </q-tab-panel>
        <q-tab-panel name="reject">
          <div class="text-h4 q-mb-md">Ditolak</div>
                  <q-table
                    :rows="rows0"
                    :columns="columns3"
                    row-key="name"
                    :filter="filter0"
                    flat
                  >
                    <template v-slot:top-right>
                      <q-space style="padding-right: 10px" />
                      <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter0" placeholder="Search">
                        <template v-slot:append>
                          <q-icon name="search"/>
                        </template>
                      </q-input>

                      <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
                    </template>

                    <template v-slot:body-cell-aksi="props">
                      <q-td :props="props">
                        <div class="q-gutter-sm">
                          <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                        </div>
                      </q-td>
                    </template>

                    <template v-slot:body-cell-status="props">
                      <q-td :props="props">
                        <q-badge outline :color="props.row.permohonan_status_pinjam === 0 ? 'red' : 'teal'" :label="props.row.permohonan_status_pinjam === 1 ? 'Ditolak' : 'Selesai'" />
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

                    <template v-slot:body-cell-gudang_lokasi="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
                      </q-td>
                    </template>

                    <template v-slot:body-cell-gudang_nama="props">
                      <q-td :props="props">
                        {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
                      </q-td>
                    </template>
                  </q-table>
        </q-tab-panel>
        <q-tab-panel name="cancel">
          <div class="text-h4 q-mb-md">Dibatalkan</div>
          <q-table
            :rows="rows10"
            :columns="columns3"
            row-key="name"
            :filter="filter10"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter10" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
            </template>

            <template v-slot:body-cell-aksi="props">
              <q-td :props="props">
                <div class="q-gutter-sm">
                  <q-btn outline color="blue" size="sm" @click="toDetail(props.row.permohonan_id)" icon="receipt_long"> Detail</q-btn>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-badge outline :color="props.row.permohonan_status_pinjam === 0 ? 'red' : 'teal'" :label="props.row.permohonan_status_pinjam === 1 ? 'Ditolak' : 'Selesai'" />
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

            <template v-slot:body-cell-gudang_lokasi="props">
              <q-td :props="props">
                {{props.row.mm_detail.gudang_nama+ ' - ' +props.row.mm_detail.gudang_lokasi}}
              </q-td>
            </template>

            <template v-slot:body-cell-gudang_nama="props">
              <q-td :props="props">
                {{props.row.mm_detail.mm_nama+ ' - ' +props.row.mm_detail.mm_merk}}
              </q-td>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </template>
    </q-splitter>
    <br />
  </q-card>
</q-page>
</template>

<script>
import { parseProfile } from '../../../boot/Profile'
const profile = parseProfile()
export default {
  data () {
    return {
      tabhistory: 'review',
      splitterModel: 20,
      rows0: [],
      rows1: [],
      rows2: [],
      rows3: [],
      rows4: [],
      rows2a: [],
      rows3a: [],
      rows4a: [],
      rows10: [],
      columns1: [
        { name: 'gudang_nama', align: 'left', label: 'Barang', field: 'gudang_nama' },
        { name: 'gudang_lokasi', align: 'left', label: 'Penyedia - Lokasi Gudang', field: 'gudang_lokasi' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'status', align: 'center', label: 'Status Permohonan', field: 'status' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      columns3: [
        { name: 'gudang_nama', align: 'left', label: 'Barang', field: 'gudang_nama' },
        { name: 'gudang_lokasi', align: 'left', label: 'Penyedia - Lokasi Gudang', field: 'gudang_lokasi' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      filter0: '',
      filter1: '',
      filter2: '',
      filter3: '',
      filter4: '',
      filter2a: '',
      filter3a: '',
      filter4a: '',
      filter10: '',
      show_filter: true
    }
  },
  methods: {
    getPengajuanBaru () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/1`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows1 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDisetujui () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/2`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows2a = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanKeluar () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/3`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3a = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDistAgen () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/4`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows4a = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDikirim () {
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/5`, this.$createToken())
        .then(res => {
          // console.log(res)
          this.rows2 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanBerlangsung () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/6`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanSelesai () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/7`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows4 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDitolak () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/9`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows0 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDibatalkan () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/member/riwayat/${profile.member.id_member}/10`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows10 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailRiwayatPeminjaman', params: { id: ids } })
    }
  },
  created () {
    this.getPengajuanBaru()
    this.getPengajuanDikirim()
    this.getPengajuanSelesai()
    this.getPengajuanBerlangsung()
    this.getPengajuanDitolak()
    this.getPengajuanDisetujui()
    this.getPengajuanKeluar()
    this.getPengajuanDistAgen()
    this.getPengajuanDibatalkan()
  }
}
</script>

<style scoped>

</style>
