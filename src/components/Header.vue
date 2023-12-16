<template>
  <q-header style="background: #FFFFFF; box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.15);">
      <q-toolbar class="">
        <slot name="btn"></slot>

        <q-toolbar-title class="text-weight-medium text-blue-grey-14">
          <span class="text-weight-bold text-blue-grey-14 q-mr-md ">KPB<span class="text-secondary" style="font-size: 1.5rem">.</span></span>
        </q-toolbar-title>
        <q-btn-dropdown
          color="primary"
          label="Akun"
          no-caps
        >
          <div class="column q-pa-sm q-mx-sm" style="min-width: 200px;">
            <div class="column">
              <div class="row">
                <div style="width: 40px; height: 40px; border: 1px solid" class="border flex flex-center q-mr-sm">
                  <div class="text-weight-bold text-blue-grey-14 text-center" style="font-size: 0.7rem">KPB<span class="text-secondary">.</span></div>
                </div>

                <div class="column">
                  <div class="text-primary text-weight-bold">{{ $getProfile().role.toUpperCase() }}</div>
                  <div class="text-primary text-weight-regular">{{ $getProfile().nama }}</div>
                </div>

              </div>

              <q-separator class="q-my-sm"/>
              <q-list>
                <slot name="menu"></slot>
                <q-item clickable>
                <!-- <q-item clickable @click="logout()"> -->
                  <q-item-section side>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Keluar Akun</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
</template>
<script>
// import logout from '../../helper/Logout'
export default {
  methods: {
    // logout
  }
}
</script>
