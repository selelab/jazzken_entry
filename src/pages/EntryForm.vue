<template>
  <v-container fluid>
    <v-form ref="form" v-model="state.valid">
      <v-card-actions>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field v-model="band.name" label="バンド名" required />
            <v-select
              v-model="band.memberNum"
              :items="membersSelection"
              label="メンバー数"
            />
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-actions>
        <v-row justify="center">
          <v-col cols="6">
            <v-row>
              <v-card-title>メンバー情報</v-card-title>
            </v-row>

            <v-card-actions v-for="member in band.memberList" :key="member.id">
              <v-text-field v-model="member.name" label="メンバーの名前" />
              <v-spacer />
              <v-select
                v-model="member.instrument"
                label="楽器"
                :items="instrumentList"
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watch,
} from '@vue/composition-api'

type memberType = {
  id: number
  name: string
  instrument: string
}

type bandType = {
  name: string
  memberNum: number
  memberList: memberType[]
}

export default defineComponent({
  setup() {
    const state = reactive({
      valid: false,
    })

    const member: memberType = {
      id: 0,
      name: '',
      instrument: '',
    }
    const band = reactive<bandType>({
      name: '',
      memberNum: 1,
      memberList: [Object.assign({}, member)],
    })

    const instrumentList: string[] = [
      'Vo',
      'T.Sax',
      'A.Sax',
      'Fl',
      'Cl',
      'Tp',
      'Tb',
      'Gt',
      'Pf',
      'Ba',
      'Dr',
      'Perc',
      'その他',
    ]

    const membersLimit = 20
    const membersSelection = computed<number[]>(() =>
      Array.from({ length: membersLimit }, (v, k) => k + 1)
    )

    const pushEmptyMember = watch(
      () => band.memberNum,
      (memberNum, prevNum) => {
        const memberDiff: number = memberNum - prevNum

        if (memberDiff > 0) {
          for (let i = 0; i < memberDiff; i++) {
            member.id++
            band.memberList.push(Object.assign({}, member))
          }
        } else {
          for (let i = 0; i < -memberDiff; i++) {
            band.memberList.pop()
          }
        }
      }
    )

    return {
      state,
      band,
      instrumentList,
      membersSelection,
      pushEmptyMember,
    }
  },
})
</script>
