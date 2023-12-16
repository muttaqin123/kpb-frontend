<template>
  <div class="q-gutter-sm row items-center no-wrap">
      <q-btn round flat>
        <q-avatar size="26px" icon="person"/>
        <q-menu>
          <q-list>
            <slot name="menu"></slot>
            <q-item clickable @click="logout">
              <q-item-section avatar>
                <q-icon color="primary" name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
</template>
<script>
import logout from '../../helper/Logout'
export default {
  methods: {
    logout
  }
}
</script>
