<template>
  <q-page padding>
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
        <q-tab name="agen" label="Dikembalikan Ke Agen" />
        <q-tab name="selesai" label="Selesai/ Dikembalikan" />
        <q-tab name="reject" label="Ditolak" />
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
        <q-tab-panel name="agen">
          <q-table
            :rows="rows5"
            :columns="columns"
            row-key="name"
            :filter="filter5"
            flat
          >
            <template v-slot:top-right>
              <q-space style="padding-right: 10px" />
              <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter5" placeholder="Search">
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
        <q-tab-panel name="reject">
          <q-table
            :rows="rows0"
            :columns="columns"
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
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
export default {
  data () {
    return {
      tabhistory: 'now',
      rows3: [],
      rows4: [],
      rows5: [],
      rows0: [],
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
      filter5: '',
      filter0: '',
      show_filter: true
    }
  },
  methods: {
    getPengajuanBerlangsung () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/riwayat-pengajuan/${profile.member.id_member}/6`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows3 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanSelesai () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/riwayat-pengajuan/${profile.member.id_member}/8`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows4 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanKembaliAgen () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/riwayat-pengajuan/${profile.member.id_member}/7`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows5 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    getPengajuanDitolak () {
      this.$showLoading()
      this.$axios.get(`alsintan/transaksi/brigade/riwayat-pengajuan/${profile.member.id_member}/9`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows0 = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailPermohonan', params: { id: ids } })
    }
  },
  created () {
    this.getPengajuanSelesai()
    this.getPengajuanBerlangsung()
    this.getPengajuanDitolak()
    this.getPengajuanKembaliAgen()
  }
}
</script>

<style scoped>

</style>
