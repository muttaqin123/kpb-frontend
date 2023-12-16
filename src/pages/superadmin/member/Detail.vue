<template>
  <q-page padding>
    <q-card flat>
      <q-card-section class="text-bold text-h6">
        Detail Data Member
      </q-card-section>
      <q-card-section v-if="data">
        <div class="text-h6">Data Pribadi</div>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>NIK</div>
            <div class="text-bold">{{ data.nik }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Nama</div>
            <div class="text-bold">{{ data.nama }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Tempat dan Tanggal Lahir</div>
            <div class="text-bold">{{ data.tempat_lahir }}, {{ data.tanggal_lahir }}</div>
          </div>
          <!-- <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Area</div>
            <div class="text-bold">{{ getArea(data.member) }}</div>
          </div> -->
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Alamat Lengkap</div>
            <div class="text-bold">{{ data.alamat }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>E-Mail</div>
            <div class="text-bold">{{ data.member.email ?? '-' }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>No Hp</div>
            <div class="text-bold">{{ data.member.no_hp }}</div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div>Jenis Kelamin</div>
            <div class="text-bold">{{ data.jenis_kelamin }}</div>
          </div>
        </div>
        <div class="text-h6 q-mt-sm q-mb-xs">Data Role</div>
        <div class="row q-col-gutter-y-sm">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <q-list bordered padding>
              <div v-for="(d, i) in data.member.role_member" :key="i">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white">
                      {{ d.role.nama_role[0] }}
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ d.role.nama_role }}</q-item-label>
                    <q-item-label caption>
                      {{ d.role.keterangan }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset="" v-if="(i+1) != data.member.role_member.length"/>
              </div>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import getArea from '../../../helper/ParseArea'
export default {
  data () {
    return {
      data: null
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getArea,
    getDetail () {
      this.$showLoading()
      this.$axios.get(`users/member-aktif/${this.$route.params.id}`, this.$createToken())
        .finally(() => this.$hide())
        .then(res => {
          if (this.$parseResponse(res.data, false)) {
            this.data = res.data.result
          }
        })
        .catch(() => this.$commonErrorNotif())
    }
  }
}
</script>
