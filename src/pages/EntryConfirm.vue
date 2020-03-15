<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="5">
        <v-row justify="center">
          <v-col cols="4">
            <h1 style="text-align: center">確認画面</h1>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row justify="center">
            <v-col>
              <v-card-text>
                <v-card-title>バンド名</v-card-title>
                <v-row justify="center">
                  <v-col>
                    <p style="text-align: center">{{ band.name }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-card-title>メンバー数</v-card-title>
                <v-row justify="center">
                  <v-col>
                    <p style="text-align: center">{{ band.memberNum }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text>
          <v-row justify="center">
            <v-col>
              <h2>メンバー情報</h2>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">名前</th>
                      <th class="text-left">楽器</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="member in band.memberList" :key="member.id">
                      <td>{{ member.name }}</td>
                      <td>{{ member.instrument }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                class="my-10"
                to="/complete"
                block
                color="primary"
                @click="submit"
                >エントリー</v-btn
              >
              <v-btn to="/" class="my-10" block color="error" @click="submit"
                >修正する</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    const band = context.root.$route.params.band
    return {
      band,
    }
  },
})
</script>
