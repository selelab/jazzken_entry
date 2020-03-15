<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="5">
        <v-form ref="form" v-model="state.valid">
          <v-row justify="center">
            <v-col cols="7">
              <h1>エントリーフォーム</h1>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-row justify="center">
              <v-col>
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
          </v-card-actions>

          <v-card-actions>
            <v-row justify="center">
              <v-col>
                <h2>メンバー情報</h2>
                <v-card-actions
                  v-for="member in band.memberList"
                  :key="member.id"
                >
                  <v-text-field
                    v-model="member.name"
                    label="メンバーの名前"
                    :rules="state.memberNameRules"
                    required
                  />
                  <v-spacer />
                  <v-select
                    v-model="member.instrument"
                    label="楽器"
                    :items="instrumentList"
                    :rules="state.instrumentRules"
                    required
                  />
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn
                  :disabled="state.value"
                  block
                  color="primary"
                  @click="submit"
                  >確認画面へ</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watch,
  SetupContext,
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
  setup(_, context: SetupContext) {
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
