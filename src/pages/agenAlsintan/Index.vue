<template>
  <q-page>
    <div class="text-blue-grey-14 justify-center row items-start q-gutter-md col-md-10 offset-md-4col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
      <div class="row q-col-gutter-sm ">
        <div  v-for="(a, i) in listImage" :key="i"  class="col-md-3 col-sm-12 col-xs-12">
          <q-card square flat style="height: 100%">
            <q-card-section class="text-white" align="center">
              <!--              <q-icon name="add_comment" color="teal" size="50px"></q-icon>-->
              <img :src="a.img" style="height: 70px;">
            </q-card-section>

            <q-card-actions vertical align="center">
              <div class="text-h6">{{ a.total }}</div>
              <div class="text-h6">{{ a.title }}</div>
              <div class="text-subtitle2 text-center q-pa-sm">{{ a.subTitle }}</div>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div class="q-pb-lg q-pl-md q-pr-md q-pt-sm">
      <q-table
        title="Monitoring Distribusi Barang Menuju Agen (Proses Transit)"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        flat
      >
        <template v-slot:top-right>
          <q-space style="padding-right: 10px" />
          <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
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
    </div>
  </q-page>
</template>

<script>
import { parseProfile } from '../../boot/Profile'
const profile = parseProfile()
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Dashboard',
  data () {
    return {
      rows: [],
      columns: [
        { name: 'nama', align: 'left', label: 'Nama Peminjam', field: 'nama' },
        { name: 'mm', align: 'left', label: 'Barang / SN', field: 'mm' },
        { name: 'permohonan_alamat', align: 'left', label: 'Lokasi Pengiriman', field: 'permohonan_alamat' },
        { name: 'permohonan_tgl_pinjam', align: 'left', label: 'Tanggal Peminjaman', field: 'permohonan_tgl_pinjam' },
        { name: 'permohonan_tgl_kembali', align: 'left', label: 'Tanggal Penngembalian', field: 'permohonan_tgl_kembali' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      filter: '',
      show_filter: false,
      listImage: [
        {
          img: 'alsintan/cargo.png',
          title: 'Distribusi Ke Agen',
          subTitle: 'Brigade Sedang Mengirim Barang Ke Agen Sebelum Didistribusi ke Peminjam',
          total: 0
        },
        {
          img: 'alsintan/flexible.png',
          title: 'Transit',
          subTitle: 'Barang Sedang Transit Di Agen Untuk Selanjutnya Didistribusi Ke Peminjam',
          total: 0
        },
        {
          img: 'alsintan/team.png',
          title: 'Pengembalian Ke Agen',
          subTitle: 'Peminjam Telah Mengembalikan Barang Ke Agen Untuk Dikembalikan Ke Brigade',
          total: 0
        },
        {
          img: 'alsintan/delivery.png',
          title: 'Pengembalian Ke Brigade',
          subTitle: 'Agen Telah Menyerahkan Barang yang Dipinjam Ke Brigade Provinsi',
          total: 0
        }
      ],
      slide: ref(1)
    }
  },
  props: {
    icon_position: {
      required: false,
      default: 'left'
    }
  },
  methods: {
    getSummary () {
      this.$axios.get(`alsintan/agen-summary/${profile.member.id_member}`, this.$createToken())
        .then(res => {
          // console.log(res)
          const data = res.data.result
          if (data !== undefined) {
            this.listImage[0].total = data.kirim_ke_agen
            this.listImage[1].total = data.transit
            this.listImage[2].total = data.kembali_ke_agen
            this.listImage[3].total = data.kembali_ke_brigade
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getDataOTW () {
      this.$showLoading()
      this.$axios.get(`alsintan/agen-datapeminjaman/${profile.member.id_member}/4`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          // console.log(res)
          this.rows = res.data.result
        }).catch(() => this.$commonErrorNotif())
    },
    toDetail (id) {
      const ids = btoa(id)
      this.$router.push({ name: 'detailAgenAlsintan', params: { id: ids } })
    }
  },
  created () {
    this.getDataOTW()
    this.getSummary()
  }
})
</script>
