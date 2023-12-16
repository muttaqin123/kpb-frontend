<template>
  <div flat class="card-menu" style="height: 100%">
    <img :src="image" v-if="withImage" style="width: 100%; border-radius: 10px 10px 0px 0px"/>
    <div class="column q-pa-md">
      <span>
        <div class="text-h5 text-bold text-primary">{{title}}</div>
      </span>
      <span class="q-pt-none">
        {{deskripsi}}
      </span>
    </div>
    <q-card-section class="q-pt-none">
      <q-btn color="primary" v-if="withButton" unelevated :to="withParam ? routeWithParam : {name: routeName}">
        <div class="text-button">{{ labelBtn }}</div>
      </q-btn>
      <q-btn color="primary" v-if="withBtnRedirect" unelevated type="a" :href="url" target="_blank">
        <div class="text-button">Buka Aplikasi</div>
      </q-btn>
    </q-card-section>
  </div>
</template>
<script>
export default {
  props: {
    withBtnRedirect: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    },
    withButton: {
      default: true,
      type: Boolean
    },
    title: String,
    deskripsi: String,
    routeName: String,
    labelBtn: {
      type: String,
      default: 'Lihat Menu'
    },
    withParam: {
      default: false,
      type: Boolean
    },
    routeWithParam: {
      default: () => {
        return {}
      },
      type: Object
    },
    withImage: {
      type: Boolean,
      default: false
    },
    image: String
  }
}
</script>
