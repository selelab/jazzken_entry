<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="band in bands" :key="band.name">
        <v-row>
          <v-card-actions>
            <v-card-titel>{{ band.name }}</v-card-titel>
            <v-divider />
            <v-list>
              <v-list-item v-for="member in band.memberList" :key="member.id">
                <v-list-item-content>{{ member.name }}</v-list-item-content>
                <v-list-item-content>{{
                  member.instrument
                }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-actions>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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

    return {
      bands,
    }
  },
})
</script>
