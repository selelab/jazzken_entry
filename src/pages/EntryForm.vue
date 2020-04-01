<template>
  <v-container fluid>
    <v-row justify="center">
      <v-card-title>エントリーフォーム</v-card-title>
    </v-row>
    <v-form ref="form" v-model="state.valid">
      <v-row justify="center">
        <v-col cols="11" lg="4">
          <v-text-field
            v-model="band.name"
            label="バンド名"
            :rules="state.bandNameRules"
            required
          />
          <v-select
            v-model="band.memberNum"
            label="メンバー数"
            :items="membersSelection"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="11" lg="4">
          <v-card-subtitle style="padding: 0">メンバー情報</v-card-subtitle>
          <v-row
            justify="center"
            v-for="member in band.memberList"
            :key="member.id"
          >
            <v-text-field
              class="mr-2 ml-2"
              v-model="member.name"
              label="メンバーの名前"
              :rules="state.memberNameRules"
              required
              style="width: 25%"
            />
            <v-select
              class="mr-2 ml-2"
              v-model="member.instrument"
              label="楽器"
              :items="instrumentList"
              :rules="state.instrumentRules"
              required
              style="width: 25%"
            />
          </v-row>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="8" lg="2">
          <v-btn block color="primary" @click="submit">確認画面へ</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
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

const member: memberType = {
  id: 0,
  name: '',
  instrument: '',
}

const membersLimit = 20

export default defineComponent({
  setup(_, context: any) {
    const state = reactive({
      valid: false,
      bandNameRules: [(v: string) => !!v || 'バンド名を入力してください'],
      memberNameRules: [(v: string) => !!v || '名前を入力してください'],
      instrumentRules: [(v: string) => !!v || '楽器を選択してください'],
    })

    const band = reactive<bandType>({
      name: '',
      memberNum: 1,
      memberList: [Object.assign({}, member)],
    })

    const instrumentList = ref<string[]>([
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
    ])

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

    const submit = () => {
      if (state.valid) {
        const params: any = {}
        params['band'] = band
        context.root.$router.push({
          name: 'EntryConfirm',
          params,
        })
      } else {
        context.refs.form.validate()
      }
    }

    return {
      state,
      band,
      instrumentList,
      membersSelection,
      pushEmptyMember,
      submit,
    }
  },
})
</script>
