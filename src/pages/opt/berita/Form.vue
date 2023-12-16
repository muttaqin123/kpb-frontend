<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">{{ editMode ? 'Edit ' : 'Input' }} Berita</div>
        <div class="text-regular">Mohon isi form berikut ini</div>
        <q-form @submit="onSubmit">
          <q-select
            v-model="kategori"
            :options="listKategori"
            label="Kategori Berita"
            option-label="isikategori"
            option-value="id_opt_kategori_informasi"
            :rules="$defaultValidation"
          />
          <q-input
            v-model="form.judulinformasi"
            label="Judul Informasi"
            :rules="$defaultValidation"
          />
          <!-- ganti jadi wysig -->
          <!-- <q-input
            v-model="form.isiinformasi"
            label="Isi Informasi"
            :rules="$defaultValidation"
            type="textarea"
          /> -->
          <q-editor
            v-model="form.isiinformasi"
            :dense="$q.screen.lt.md"
            placeholder="Isi Informasi"
            :rules="$defaultValidation"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: [
                    'p',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                    'code'
                  ]
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7'
                  ]
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana'
                  ]
                },
                'removeFormat'
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource']
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana'
            }"
          />
          <q-file
            v-model="files"
            class="q-mt-md"
            label="Pilih Gambar Header (Dapat memilih lebih dari 1 file)"
            accept=".jpg, image/*"
            :rules="$defaultValidation"
            multiple
            clearable
          />
          <q-file
            v-model="filePDF"
            class="q-mt-md"
            label="File Lampiran (PDF)"
            accept=".pdf"
            :rules="$defaultValidation"
            clearable
          />
          <q-btn type="submit" label="Simpan Berita" unelevated color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
const model = () => {
  return {
    opt_kategori_informasi: null,
    judulinformasi: null,
    isiinformasi: ''
  }
}
export default {
  props: {
    editMode: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      form: model(),
      listKategori: [],
      kategori: null,
      files: null,
      filePDF: null
    }
  },
  created () {
    this.getKategori()
  },
  methods: {
    getKategori () {
      this.$showLoading()
      this.$axios.get('opt/kategori-informasi', this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listKategori = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    onSubmit () {
      if (this.editMode) {
        alert('edit')
      } else {
        this.$showLoading()
        const formData = new FormData()
        this.form.opt_kategori_informasi = this.kategori.id_opt_kategori_informasi
        formData.append('data', JSON.stringify(this.form))
        for (const f of this.files) {
          formData.append('namafile', f)
        }
        formData.append('filePdf', this.filePDF)
        this.$axios.post('opt/informasi', formData, this.$createToken())
          .finally(() => this.$hide())
          .then((res) => {
            if (this.$parseResponse(res.data)) {
              this.form = model()
              this.files = null
              this.filePDF = null
              this.$router.push({ name: 'indexBeritaOpt' })
            }
          }).catch(() => this.$commonErrorNotif())
      }
    }
  }
}
</script>
