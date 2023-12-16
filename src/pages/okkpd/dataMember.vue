<template>
  <q-page padding style="background: #F2F7F5; color: #024830">
    <div class="q-pa-md column">
      <span class="text-h5 text-weight-bold">Data Anggota</span>
      <span>Data Anggota yang terdaftar sebagai eksportir</span>
      <div class="q-mt-md" style="width: 100%">
        <q-table
          flat bordered
          :rows="rows"
          :columns="columns"
          row-key="nik"
        >
          <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)">
              <q-td key="nik" :props="props">
                {{ props.row?.member?.nik }}
              </q-td>
              <q-td key="nama" :props="props">
                {{ props.row?.member?.ktp?.nama }}
              </q-td>
              <q-td key="area" :props="props">
                {{ props.row?.perusahaan?.alamat ?? '-'}}
              </q-td>
              <q-td key="perusahaan" :props="props">
                {{ props.row?.perusahaan?.nama_perusahaan ?? '-' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      rows: [
        {
          nik: '123123123',
          nama: 'asdasdasd',
          area: 'asdasdas',
          perusahaan: 'asdasdasd'
        }
      ],
      columns: [
        {
          name: 'nik',
          required: true,
          label: 'NIK',
          align: 'left',
          field: 'nik',
          sortable: true
        },
        { name: 'nama', label: 'Nama Anggota', field: 'nama', sortable: true },
        { name: 'area', label: 'Area', field: 'area' },
        { name: 'perusahaan', label: 'Perusahaan', field: 'perusahaan' }
      ]
    }
  },
  created () {
    this.getMember()
  },
  methods: {
    getMember () {
      this.$showLoading()
      this.$axios.get('okkpd/getMember', this.$createToken())
        .finally(() => this.$hide())
        .then((res) => {
          // console.log(res)
          this.rows = res.data.result
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
