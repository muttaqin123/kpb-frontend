<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        <q-form @submit="getData()">
          Filter Data
          <div class="row q-col-gutter-x-md">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-input
                v-model="tahun"
                label="Tahun"
                disable
              />
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-select
                :options="listSubsektor"
                v-model="subsektor"
                label="Subsektor"
                option-label="sektor"
                option-value="id"
                @update:model-value="getKomoditas();resetRows()"
                :rules="$defaultValidation"
              />
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-select
                :options="listKomoditas"
                v-model="komoditas"
                label="Komoditas"
                option-label="komoditas"
                option-value="id"
                :rules="$defaultValidation"
                @update:model-value="resetRows()"
              />
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-select
                :options="[1, 2, 3]"
                v-model="mt"
                label="Masa Tanam/Usia Tanam"
                :rules="$defaultValidation"
                @update:model-value="resetRows()"
              />
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-btn type="submit" label="Tampilkan Data" class="q-mt-md" unelevated color="primary"/>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md" v-if="this.rows_stok.length > 0" flat>
      <q-table
        title="Total Stok di Kios"
        flat
        :rows="rows_stok"
        :columns="columns_stok"
        row-key="nama"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="UREA" :props="props">
              {{ props.row.UREA }} Kg
            </q-td>
            <q-td key="NPK" :props="props">
              {{ props.row.NPK }} Kg
            </q-td>
            <q-td key="NPKFK" :props="props">
              {{ props.row.NPKFK }} Kg
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-form ref="myForm">
      <q-table
        title="Data E-Alokasi Poktan Anda"
        flat
        :rows="rows"
        :loading="loading"
        :columns="columns"
        row-key="nik_petani"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-btn
            v-if="selected.length > 0"
            label="Hapus Yang Ditandai"
            unelevated
            color="red-10"
            @click="deleteAlokasi"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td>
              <q-checkbox dense v-model="props.selected"/>
            </q-td> -->
            <q-td key="penyuluh" :props="props">
              {{ props.row.nama_penyuluh }}
            </q-td>
            <q-td key="nik" :props="props">
              {{ props.row.nik_petani }}
            </q-td>
            <q-td key="nama_lengkap" :props="props">
              {{ props.row.nama_petani }}
            </q-td>
            <q-td key="komoditas" :props="props">
              {{ props.row.komoditas }}
            </q-td>
            <q-td key="mt" :props="props">
              {{ props.row.masatanam }}
            </q-td>
            <q-td key="tahun" :props="props">
              {{ props.row.tahun }}
            </q-td>
            <q-td key="luasLahan" :props="props">
              {{ props.row.luaslahan }}
            </q-td>
            <q-td key="kios" :props="props">
              {{ props.row.nama_kios }}
            </q-td>
            <q-td key="urea" :props="props">
              <!-- {{ props.row.urea }} -->
              <q-input
                label="Jumlah Tebus"
                v-model="props.row.urea"
                type="number"
                style="width: 100px"
                :disable="props.row.jatahUrea <= 0"
                :rules="[
                  val => val >= 0 || 'Masukan Jumlah Yang Benar',
                  val => Number(val) <= Number(props.row.jatahUrea) || `Batas (${props.row.jatahUrea} Kg)`
                ]"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="() => {props.row.urea = 0}" class="cursor-pointer" />
                </template>
              </q-input>
            </q-td>
            <q-td key="npk" :props="props">
              <!-- {{ props.row.npk }} -->
              <q-input
                label="Jumlah Tebus"
                v-model="props.row.npk"
                type="number"
                style="width: 100px"
                :disable="props.row.jatahBeliNPK <= 0"
                :rules="[
                  val => val >= 0 || 'Masukan Jumlah Yang Benar',
                  val => Number(val) <= Number(props.row.jatahBeliNPK) || `Batas (${props.row.jatahBeliNPK} Kg)`
                ]"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="() => {props.row.npk = 0}" class="cursor-pointer" />
                </template>
              </q-input>
            </q-td>
            <q-td key="npkfk" :props="props">
              <q-input
                label="Jumlah Tebus"
                v-model="props.row.npkfk"
                type="number"
                style="width: 100px"
                :disable="props.row.jatahBeliNPKFK <= 0"
                :rules="[
                  val => val >= 0 || 'Masukan Jumlah Yang Benar',
                  val => Number(val) <= Number(props.row.jatahBeliNPKFK) || `Batas (${props.row.jatahBeliNPKFK} Kg)`
                ]"
              >
                <template v-slot:append>
                  <q-icon name="close" @click="() => {props.row.npkfk = 0}" class="cursor-pointer" />
                </template>
              </q-input>
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn icon="delete" @click="() => {props.row.urea = 0;props.row.npk = 0;props.row.npkfk = 0;}" outline color="negative" unelevated/>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-form>
    <q-card flat class="q-mt-md">
      <q-card-section>
        <div>Rincian Penebusan</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-y-md">
          <div class="col-md-3 col-xs-12 col-sm-6">
            <div>Total Urea</div>
            <div class="text-bold">{{ $formatNumber(hitungTotal().totalUrea) }} Kg - {{ $formatPrice(hitungTotal().subUrea) }}</div>
          </div>
          <div class="col-md-3 col-xs-12 col-sm-6">
            <div>Total NPK</div>
            <div class="text-bold">{{ $formatNumber(hitungTotal().totalNpk) }} Kg - {{ $formatPrice(hitungTotal().subNPK) }}</div>
          </div>
          <div class="col-md-3 col-xs-12 col-sm-6">
            <div>Total NPK FK</div>
            <div class="text-bold">{{ $formatNumber(hitungTotal().totalNpkFk) }} Kg - {{ $formatPrice(hitungTotal().subNPKFK) }}</div>
          </div>
          <div class="col-md-3 col-xs-12 col-sm-6">
            <div>Total Transaksi</div>
            <div class="text-bold">{{ $formatPrice(hitungTotal().totaltransaksi) }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn :disabled="(rows.length <= 0) || (mt === 1)" @click="doRealokasi()" label="Realokasi Dari MT Sebelumnya" outline color="primary" class="q-mr-sm"/>
        <q-btn label="Tebus" @click="onSubmit()" :disabled="hitungTotal().totaltransaksi <= 0" unelevated color="primary"/>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Rincian Data Transaksi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Transaksi berhasil, silahkan transfer ke rekening kios dan berikut nominal transaksinya.
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered separator>
            <q-item clickable @click="copyText(totalFromServer)">
              <q-item-section avatar>
                <q-icon name="receipt_long" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption lines="2">Nominal</q-item-label>
                <q-item-label>{{ $formatPrice(totalFromServer) }}</q-item-label>
              </q-item-section>
              <q-item-section side>Salin Nominal Transaksi</q-item-section>
            </q-item>
            <q-item clickable @click="copyText(rekKios)">
              <q-item-section avatar>
                <q-icon name="add_card" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption lines="2">Rek. Kios Bank BNI</q-item-label>
                <q-item-label>{{ rekKios }}</q-item-label>
              </q-item-section>
              <q-item-section side>Salin No Rek</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <!-- <q-file
            outlined
            v-model="fileImport"
            label="Import File Excel"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file> -->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" @click="resetPage()" label="Ok"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import * as helper from '../../../helper/service/SubsektorKomoditas'
import { copyToClipboard } from 'quasar'
export default {
  data () {
    return {
      rows_stok: [],
      columns_stok: [
        { name: 'UREA', align: 'left', label: 'Urea', field: 'UREA' },
        { name: 'NPK', align: 'left', label: 'NPK', field: 'NPK' },
        { name: 'NPKFK', align: 'left', label: 'NPK FK', field: 'NPKFK' }
      ],
      selected: [],
      rows: [],
      columns: [
        { name: 'penyuluh', align: 'left', label: 'Penyuluh', field: 'penyuluh' },
        { name: 'nik', align: 'left', label: 'NIK', field: 'nik' },
        { name: 'nama_lengkap', align: 'left', label: 'Nama Lengkap', field: 'nama_lengkap' },
        { name: 'komoditas', align: 'left', label: 'Komoditas', field: 'komoditas' },
        { name: 'mt', align: 'left', label: 'Masa Tanam', field: 'mt' },
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'luasLahan', align: 'left', label: 'Luas Lahan (Ha)', field: 'luasLahan' },
        { name: 'kios', align: 'left', label: 'Kios', field: 'kios' },
        { name: 'urea', align: 'left', label: 'Urea (Kg)', field: 'urea' },
        { name: 'npk', align: 'left', label: 'NPK (Kg)', field: 'npk' },
        { name: 'npkfk', align: 'left', label: 'NPKFK (Kg)', field: 'npkfk' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      activeData: null,
      activeStatus: null,
      fileImport: null,
      filter: '',
      listSubsektor: [],
      subsektor: null,
      listKomoditas: [],
      komoditas: null,
      mt: null,
      tahun: 2023,
      totalFromServer: 0,
      rekKios: '-'
    }
  },
  created () {
    // this.getData()
    // console.log(this.$getProfile())
    this.getSubsektor()
  },
  methods: {
    getStok (kios) {
      this.loading = true
      this.$axios(`check/getStokKios/${kios}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          // console.log(res)
          if (this.$parseResponse(res.data, false)) {
            this.rows_stok = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    // deleteAlokasi () {
    //   this.$axios.post('alokasi/delete_alokasi', {
    //     data: this.selected
    //   }).then((res) => {
    //     console.log(res)
    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    copyText (text) {
      copyToClipboard(text.toString())
        .then(() => {
          this.$notif('Berhasil Disalin', 'primary')
        })
        .catch(() => {
          this.$notif('Gagal Disalin', 'negative')
        })
    },
    hitungTotal () {
      const data = {
        totaltransaksi: 0,
        totalUrea: 0,
        totalNpk: 0,
        totalNpkFk: 0,
        subUrea: 0,
        subNPK: 0,
        subNPKFK: 0
      }
      for (const d of this.rows) {
        const totalUrea = Number(d.urea)
        data.totalUrea += totalUrea

        const totalNPK = Number(d.npk)
        data.totalNpk += totalNPK

        const totalNPKFK = Number(d.npkfk)
        data.totalNpkFk += totalNPKFK

        const subUrea = totalUrea * d.harga_urea
        data.subUrea += subUrea

        const subNPK = totalNPK * d.harga_npk
        data.subNPK += subNPK

        const subNPKFK = totalNPKFK * d.harga_npk_fk
        data.subNPKFK += subNPKFK

        data.totaltransaksi += subUrea + subNPK + subNPKFK
      }

      return data
    },
    getData () {
      this.loading = true
      this.rows = []
      // this.$axios.get('alokasi/data-by-poktan/121212/16/1/2023', this.$createToken())
      this.$axios.get(`alokasi/data-by-poktan/${this.$getProfile().member.nik}/${this.komoditas.id}/${this.mt}/${this.tahun}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            if (res.data.result.length > 0) {
              this.getStok(res.data.result[0].kode_kios)
              this.rekKios = res.data.result[0].norek_kios
              this.rows = res.data.result.map(r => {
                return {
                  ...r,
                  jatahUrea: r.urea,
                  jatahBeliNPK: r.npk,
                  jatahBeliNPKFK: r.npkfk
                }
              })
            } else {
              this.rows = []
              this.$notif('Tidak Ada Data', 'negative')
            }
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          if (this.rows.length > 0) {
            this.transaksi()
          } else {
            alert('Data Transaksi Tidak Sah!')
          }
        }
      })
    },
    transaksi () {
      this.$q.dialog({
        title: 'Konfirmasi Penebusan',
        message: 'Transaksi puber tidak dapat dibatalkan dan anda harus menunggu untuk transaksi mt selanjutnya. Pastikan data benar.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        const data = this.hitungTotal()
        this.$axios.post('alokasi/transaksi-subsidi', {
          poktan_id: this.rows[0].poktan_id,
          tahun: 2023,
          masatanam: this.mt,
          komoditas: this.komoditas.id,
          totaltransaksi: data.totaltransaksi,
          kode_kios: this.rows[0].kode_kios,
          totalUrea: data.totalUrea,
          totalNpk: data.totalNpk,
          totalNpkFk: data.totalNpkFk,
          detail_transaksi: this.rows
            .filter(item =>
              (item.npk > 0 && item.npk <= Number(item.jatahBeliNPK)) ||
              (item.urea > 0 && item.urea <= Number(item.jatahUrea)) ||
              (item.npkfk > 0 && item.npkfk <= Number(item.jatahBeliNPKFK))
            ).map(r => {
              return {
                urea: Number(r.urea),
                dataAsliUrea: Number(r.jatahUrea),
                dataAsliNPK: Number(r.jatahBeliNPK),
                dataAsliNPKFK: Number(r.jatahBeliNPKFK),
                npk: Number(r.npk),
                npkfk: Number(r.npkfk),
                subtotal: Number((r.urea * r.harga_urea) + (r.npk * r.harga_npk) + (r.npkfk * r.harga_npk_fk)),
                nik: r.nik_petani
              }
            })
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.totalFromServer = res.data.totalTransaksi
              this.resetData()
              this.dialog = true
            }
          }).catch(() => this.$commonErrorNotif())
      })
    },
    resetData () {
      this.mt = null
      this.komoditas = null
      this.subsektor = null
      this.resetRows()
    },
    resetPage () {
      this.resetData()
      this.resetNominal()
      this.dialog = false
    },
    resetNominal () {
      this.totalFromServer = 0
    },
    openDialog () {
      this.$showLoading()
      // this.$axios.put(`kur/acc/${data.id}`, body, this.$createToken())
      //   .finally(() => this.$hide())
      //   .then(res => {
      //     if (this.$parseResponse(res.data)) {
      //       this.getData()
      //     }
      //   }).catch(() => this.$commonErrorNotif())
    },
    getKomoditas () {
      helper.getKomoditas(this.subsektor.id)
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKomoditas = res.data.result
          }
        })
    },
    getSubsektor () {
      helper.getSubsektor(this.$createToken())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listSubsektor = res.data.result
          }
        })
    },
    resetRows () {
      this.rows = []
    },
    doRealokasi () {
      this.$q.dialog({
        title: 'Konfirmasi Realokasi',
        message: 'Fungsi ini akan memindahkan sisa alokasi dari masa tanam sebelumnya, jika anda klik ok maka data akan berpindah dan tidak bisa kembali lagi.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
        this.$showLoading()
        this.$axios.put('alokasi/realokasi', {
          poktan_id: this.rows[0].poktan_id,
          tahun: 2023,
          masatanam: this.mt,
          komoditas: this.komoditas.id
        }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getData()
            }
          })
          .catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
