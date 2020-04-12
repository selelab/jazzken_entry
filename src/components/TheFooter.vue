<template>
  <v-footer color="primary" app>
    <v-row justify="space-around">
      <v-btn class="white--text" to="/" text>
        <v-row justify="space-between">
          <v-col>
            <v-row justify="center">
              <v-icon>{{ mdiAccountMultiplePlusOutline }}</v-icon>
            </v-row>
            <span>エントリー</span>
          </v-col>
        </v-row>
      </v-btn>
      <v-btn class="white--text" to="./list" text>
        <v-row>
          <v-col>
            <v-row justify="center">
              <v-icon>{{ mdiFormatListBulleted }}</v-icon>
            </v-row>
            <span>バンド一覧</span>
          </v-col>
        </v-row>
      </v-btn>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { mdiFormatListBulleted, mdiAccountMultiplePlusOutline } from '@mdi/js'

export default defineComponent({
  setup() {
    return {
      mdiFormatListBulleted,
      mdiAccountMultiplePlusOutline,
    }
  },
})
</script>
