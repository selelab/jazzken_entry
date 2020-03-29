<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card-title>エントリー済バンド一覧</v-card-title>
    </v-row>
    <v-row justify="center">
      <v-card flat width="500">
        <v-list>
          <v-list-group v-for="band in bands" :key="band.name">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ band.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="member in band.memberList" :key="member.id">
              <v-list-item-content>
                <v-card-text
                  >{{ member.instrument }} {{ member.name }}</v-card-text
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default defineComponent({
  setup() {
    const bands: any = ref(null)

    watchEffect(async () => {
      const db = firebase.firestore()
      const bandCol = db.collection('bands')
      const res = await bandCol.get()
      bands.value = res.docs.map(doc => doc.data())
    })

    return {
      bands,
    }
  },
})
</script>
