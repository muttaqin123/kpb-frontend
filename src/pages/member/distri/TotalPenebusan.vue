<template>
  <q-page padding>
    <q-card class="q-mb-md" flat>
      <q-card-section>
        Filter Data
        <div class="row q-col-gutter-x-md">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <q-select
              :options="listTahun"
              v-model="tahun"
              label="Tahun"
              @update:model-value="getData()"
            />
          </div>
          <!-- <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="listKomoditas"
              v-model="komoditas"
              label="Komoditas"
            />
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-select
              :options="[]"
              v-model="mt"
              label="Masa Tanam/Usia Tanam"
            />
          </div> -->
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Total Data Alokasi"
      flat
      :rows="rows"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tahun" :props="props">
            {{ tahun }}
          </q-td>
          <q-td key="urea" :props="props">
            {{ props.row.urea }} Kg
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.npk }} Kg
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.npkfk }} Kg
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      title="Total Tebus Alokasi"
      class="q-mt-md"
      flat
      :rows="sudahTebus"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tahun" :props="props">
            {{ tahun }}
          </q-td>
          <q-td key="urea" :props="props">
            {{ props.row.urea }} Kg
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.npk }} Kg
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.npkfk }} Kg
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      title="Sisa Data Alokasi"
      class="q-mt-md"
      flat
      :rows="sisaAlokasi"
      :loading="loading"
      :columns="columns"
      row-key="nama"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tahun" :props="props">
            {{ tahun }}
          </q-td>
          <q-td key="urea" :props="props">
            {{ props.row.urea }} Kg
          </q-td>
          <q-td key="npk" :props="props">
            {{ props.row.npk }} Kg
          </q-td>
          <q-td key="npkfk" :props="props">
            {{ props.row.npkfk }} Kg
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [],
      sisaAlokasi: [],
      sudahTebus: [],
      loading: true,
      columns: [
        { name: 'tahun', align: 'left', label: 'Tahun', field: 'tahun' },
        { name: 'urea', align: 'left', label: 'Urea', field: 'urea' },
        { name: 'npk', align: 'left', label: 'NPK', field: 'npk' },
        { name: 'npkfk', align: 'left', label: 'NPK FK', field: 'npkfk' }
      ],
      tahun: new Date().getFullYear(),
      listTahun: this.$generateYear()
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      const params = {
        tahun: this.tahun
      }
      this.$axios.get(`alokasi/jatah-distributor/${this.$getProfile().nik}`, this.$createToken(params))
        .finally(() => { this.loading = false })
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            const result = res.data.result
            this.rows = result.alokasi
            this.sisaAlokasi = result.sisaAlokasi
            this.sudahTebus = result.sudahDitebus
          }
        }).catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
