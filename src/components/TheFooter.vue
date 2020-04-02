<template>
  <v-footer color="primary" app>
    <v-row justify="space-around">
      <v-btn class="white--text" to="/" text>
        <span>エントリー</span>
      </v-btn>
      <v-btn class="white--text" to="./list" text>
        <span>バンド一覧</span>
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({})
</script>
