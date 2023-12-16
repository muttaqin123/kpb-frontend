<template>
  <q-page padding>

    <q-table
      title="Manajemen Kategori"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-btn  v-if="show_filter" outline  label="Tambah Kategori" @click="openDialog(false, null)" />
        <q-space style="padding-right: 10px" />
        <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>

        <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
      </template>
      <template v-slot:body-cell-gambar="props">
        <q-td :props="props">
          <img :src="props.row.gambar" style="width: 50px;">
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <img :src="props.row.status">
        </q-td>
      </template>
      <template v-slot:body-cell-aksi="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn outline color="blue" size="sm" @click="openDialog(true, props.row)" icon="receipt_long"> Ubah</q-btn>
            <q-btn outline color="red" size="sm" icon="delete_sweep"> Hapus</q-btn>
          </div>
        </q-td>
      </template>

    </q-table>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 750px">
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="text-h6">Form Kategori</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="form.kategori"
              label="Nama Kategori"
              :rules="[
                val => val !== null || 'Mohon Isi'
              ]"
            />
            <q-file class="full-width" accept=".jpg,image/*" color="grey-3"  label-color="primary"
             v-model="form.gambar"
             label="Icon/ Gambar (512x512)"
             :rules="[
                val => val !== null || 'Mohon Isi'
              ]">
              <template v-slot:append>
                <q-icon name="attachment" color="primary" />
              </template>
            </q-file>
            <q-select v-if="editMode" v-model="form.status" :options="optionsMaster"  label="Status Aktif"/>
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
const model = () => {
  return {
    kategori: null,
    gambar: null,
    status: null
  }
}
export default {
  // watch: {
  //   $route: {
  //     immediate: true,
  //     handler (to, from) {
  //       document.title = to.meta.title || 'Kategori Alsintan -  E-KPB'
  //     }
  //   }
  // },
  data () {
    return {
      rows: [
        {
          kategori: 'Traktor Roda 4',
          gambar: 'alsintan/traktor4.png',
          status: 'alsintan/check.png'
        }
      ],
      columns: [
        { name: 'kategori', align: 'left', label: 'Nama Kategori', field: 'kategori' },
        { name: 'gambar', align: 'center', label: 'Icon/ Gambar', field: 'gambar' },
        { name: 'status', align: 'center', label: 'Status Aktif', field: 'status' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      loading: false,
      dialog: false,
      form: model(),
      editMode: false,
      filter: '',
      show_filter: false,
      optionsMaster: [
        'Aktif', 'Tidak Aktif'
      ]
    }
  },
  methods: {
    openDialog (mode, data) {
      this.editMode = mode
      this.dialog = true
    }
  }
}
</script>
