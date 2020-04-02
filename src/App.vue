<template>
  <v-app>
    <TheHeader />
    <v-content>
      <router-view />
    </v-content>
    <TheFooter class="d-lg-none" />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import router from '@/router/index.ts'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default defineComponent({
  router,
  components: {
    TheHeader,
    TheFooter,
  },
})
</script>
