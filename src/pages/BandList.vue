<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card-title>エントリー済バンド一覧</v-card-title>
    </v-row>
    <v-row justify="center">
      <v-card flat :width="listWidth">
        <v-list>
          <v-list-group v-for="band in bands" :key="band.name">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ band.name }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-card-subtitle>備考: </v-card-subtitle>
            <v-list-item>
              <v-list-item-content>
                <v-card-text>{{ band.notes }} </v-card-text>
              </v-list-item-content>
            </v-list-item>
            <v-card-subtitle>メンバー: </v-card-subtitle>
            <v-list-item>
              <v-list-item-content>
                <v-card-text v-for="member in band.memberList" :key="member.id"
                  >{{ member.name }}({{ member.instrument }})</v-card-text
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
import {
  defineComponent,
  ref,
  watchEffect,
  computed,
} from '@vue/composition-api'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

interface MemberType {
  id: number
  name: string
  instrument: string
}

interface BandType {
  name: string
  memberNum: number
  notes: string
  memberList: MemberType[]
}

export default defineComponent({
  setup() {
    const bands = ref<null | BandType[]>(null)

    const listWidth = computed(() => {
      const width: number = window.screen.width

      if (width < 1264) {
        return '85%'
      }
      return '30%'
    })

    watchEffect(async () => {
      const db = firebase.firestore()
      const bandCol = db.collection('bands')
      const res = await bandCol.get()
      bands.value = res.docs.map(doc => doc.data() as BandType)
    })

    return {
      bands,
      listWidth,
    }
  },
})
</script>
