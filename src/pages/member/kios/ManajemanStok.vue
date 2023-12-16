<template>
  <q-page padding>
    <q-table
      title="Total Data Alokasi"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:top-right>
        <div class="q-gutter-sm">
          <q-btn
            label="Tambah Stok"
            unelevated
            color="primary"
            @click="dialog = true"
          />
          <q-btn
            v-if="this.$getProfile().nik === 'RT0000202301' || this.$getProfile().nik === '121212'"
            label="Reset Stok"
            unelevated
            color="primary"
            @click="resetStok"
          />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="urea" :props="props">
            {{ props.row.UREA }} Kg
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.NPK }} Kg
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.NPKFK }} Kg
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="dialog" full-width persistent v-if="dialog">
      <q-card >
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Update Stok</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              outlined
              v-model="urea"
              label="Stok Urea"
              :rules="[
                val => val >= 0 || 'Mohon Input Angka Yang Benar'
              ]"
            />
            <q-input
              outlined
              v-model="npk"
              label="Stok NPK"
              :rules="[
                val => val >= 0 || 'Mohon Input Angka Yang Benar'
              ]"
            />
            <q-input
              outlined
              v-model="npkfk"
              label="Stok NPK FK"
              :rules="[
                val => val >= 0 || 'Mohon Input Angka Yang Benar'
              ]"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Batal" v-close-popup />
            <q-btn color="primary" label="Update Data" type="submit"/>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      loading: true,
      columns: [
        { name: 'urea', align: 'left', label: 'Urea', field: 'urea' },
        { name: 'npk', align: 'left', label: 'NPK', field: 'npk' },
        { name: 'npkfk', align: 'left', label: 'NPK FK', field: 'npkfk' }
      ],
      tahun: new Date().getFullYear(),
      listTahun: this.$generateYear(),
      urea: 0,
      npk: 0,
      npkfk: 0,
      dialog: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    resetStok () {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        // console.log(this.$getProfile())
        this.$axios.get(`check/resetStokDummy/${this.$getProfile().nik}`, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            // console.log(res)
            if (res.data.status) {
              this.$notif(res.data.message, 'positive')
              this.getData()
            }
          })
          .catch(() => this.$commonErrorNotif())
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    getData () {
      this.loading = true
      this.$axios(`master/stok-kios/${this.$getProfile().nik}`, this.$createToken())
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.urea <= 0 & this.npk <= 0 & this.npkfk <= 0) {
        this.$q.dialog({
          title: 'Error',
          message: 'Data Tidak Valid'
        })
      } else {
        this.$q.dialog({
          title: 'Peringatan!',
          message: 'Hati-hati dalam merubah stok! Data tidak dapat diubah lagi!',
          persistent: true,
          cancel: true
        }).onOk(() => this.updateStok())
      }
    },
    updateStok () {
      this.$showLoading()
      this.$axios.post(`master/stok-kios/${this.$getProfile().nik}`, {
        UREA: this.urea,
        NPK: this.npk,
        NPKFK: this.npkfk
      }, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data)) {
            this.dialog = false
            this.urea = 0
            this.npk = 0
            this.npkfk = 0
            this.getData()
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
