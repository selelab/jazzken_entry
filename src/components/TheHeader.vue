<template>
  <v-app-bar app color="primary" dark hide-on-scroll>
    <v-row justify="start">
      <v-card-text>
        ジャズ研バンドエントリーシステム
      </v-card-text>
    </v-row>

    <v-row class="d-lg-flex d-none mr-2" justify="end">
      <v-btn v-if="path !== '/list'" to="./list" outlined>
        <span>バンド一覧</span>
      </v-btn>
      <v-btn v-else to="/" outlined>
        <span>エントリー</span>
      </v-btn>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    const path = ref<null | string>(null)

    watch(
      () => context.root.$route.path,
      newPath => {
        path.value = newPath
      }
    )

    return {
      path,
    }
  },
})
</script>
