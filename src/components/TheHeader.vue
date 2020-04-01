<template>
  <v-app-bar app color="primary" dark>
    <v-card-actions style="padding: 0">
      <v-btn text to="/">ジャズ研バンドエントリーシステム</v-btn>
    </v-card-actions>

    <v-spacer></v-spacer>

    <v-btn v-if="path !== '/list'" to="./list" text>
      <span>バンド一覧</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn v-else to="/" text>
      <span>エントリー</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, SetupContext, ref, watch } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    const path: any = ref(null)

    watch(
      () => context.root.$route.path,
      newPath => {
        path.value = newPath
        // console.log(path)
      }
    )

    return {
      path,
    }
  },
})
</script>
