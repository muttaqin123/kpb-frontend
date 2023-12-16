<template>
  <q-page padding>
    <div class="row q-col-gutter-x-sm q-col-gutter-y-md">
      <div class="col-md-8 col-sm-12 col-xs-12">
        <q-table
          title="Role Anda Saat Ini"
          flat
          :rows="rows"
          :columns="columns"
          row-key="nama"
        >
        <template v-slot:top-right>
          <q-btn
            label="Kembali"
            color="primary"
            outline
            :to="{name: 'indexRoleMember'}"
            unelevated
          />
        </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="nama_role" :props="props">
                {{ props.row.role.nama_role }}
              </q-td>
              <q-td key="keterangan" :props="props">
                {{ props.row.role.keterangan }}
              </q-td>
              <q-td key="status" :props="props">
                <status-role
                  :status="props.row.status"
                />
              </q-td>
              <q-td key="aksi" :props="props">
                <div class="justify-center q-gutter-x-xs">
                  <q-btn label="Ajukan Ulang" @click="ajukanUlang(props.row.id)" :disabled="props.row.status !== '2'" outline color="primary" unelevated/>
                  <!-- <q-btn label="Hapus Role" unelevated color="negative"/> -->
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card flat>
          <q-card-section>
            <q-list padding>
              <q-item-label header>Tambah Role</q-item-label>

              <q-item tag="label" v-ripple v-for="(d, i) in listRole" :key="i">
                <q-item-section side top>
                  <q-checkbox v-model="d.selected" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ d.nama_role }}</q-item-label>
                  <q-item-label caption>
                    {{ d.keterangan }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-item>
              <q-btn
                label="Simpan"
                color="primary"
                unelevated
                @click="simpan()"
              />
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import statusRole from '../../components/badge/StatusRole.vue'
export default {
  components: {
    statusRole
  },
  data () {
    return {
      check1: false,
      listRole: [],
      columns: [
        { name: 'nama_role', align: 'left', label: 'Nama', field: 'nama_role' },
        { name: 'keterangan', align: 'left', label: 'Keterangan', field: 'keterangan' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      rows: [],
      idMember: this.$getProfile().member.id_member
    }
  },
  created () {
    this.$showLoading()
    this.$axios.get(`users/cek-verified-ktp/${this.$getProfile().nik}`, this.$createToken())
      .finally(() => { this.$hide() })
      .then(res => {
        if (this.$parseResponse(res.data, false)) {
          if (res.data.result.verified) {
            this.getMyRole()
            this.getRole()
          } else {
            this.$notif('NIK belum tervalidasi', 'negative')
            this.$router.back()
          }
        }
      }).catch(() => this.$commonErrorNotif())
  },
  methods: {
    getMyRole () {
      this.$axios.get(`users/role-member/${this.idMember}?status=all`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.rows = res.data.result
          }
        }).catch(() => this.$commonErrorNotif())
    },
    getRole () {
      this.$showLoading()
      this.$axios.get(`users/cek-role-member/${this.idMember}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.listRole = res.data.result.map(r => {
              return {
                ...r,
                selected: false
              }
            })
          } else {
            this.listRole = []
          }
        }).catch(() => this.$commonErrorNotif())
    },
    simpan () {
      const data = this.listRole.filter(r => {
        return r.selected
      }).map(r => {
        return {
          id_role: r.id_role,
          id_member: this.idMember,
          status: '0'
        }
      })
      if (data.length > 0) {
        this.$showLoading()
        this.$axios.post('users/create-role-member', data, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getRole()
              this.getMyRole()
            }
          }).catch(() => this.$commonErrorNotif())
      } else {
        this.$q.dialog({
          title: 'Peringatan',
          message: 'Mohon Pilih Role'
        })
      }
    },
    ajukanUlang (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah anda yakin?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$showLoading()
        this.$axios.put(`users/update-status-role-member/${id}`, { status: '0' }, this.$createToken())
          .finally(() => this.$hide())
          .then(res => {
            if (this.$parseResponse(res.data)) {
              this.getRole()
              this.getMyRole()
            }
          }).catch(() => this.$commonErrorNotif())
      })
    }
  }
}
</script>
