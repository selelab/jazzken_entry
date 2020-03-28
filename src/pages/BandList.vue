<template>
  <v-container fluid>
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
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const bands = [
      {
        name: 'じゃがたら',
        memberNum: 1,
        memberList: [
          {
            id: 0,
            name: '江戸アケミ',
            instrument: 'Vo',
          },
        ],
      },
      {
        name: '人間椅子',
        memberNum: 2,
        memberList: [
          {
            id: 0,
            name: '鈴木研一',
            instrument: 'Ba',
          },
          {
            id: 1,
            name: '和嶋慎治',
            instrument: 'Gt',
          },
        ],
      },
      {
        name: 'THE STALIN',
        memberNum: 1,
        memberList: [
          {
            id: 0,
            name: '遠藤ミチロウ',
            instrument: 'Vo',
          },
        ],
      },
    ]

    const isMemberListOpen = ref(new Array(bands.length).fill(false))

    return {
      bands,
      isMemberListOpen,
    }
  },
})
</script>
