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
          <v-textarea v-model="band.notes" label="備考" />
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
            <v-combobox
              class="mr-2 ml-2"
              v-model="member.name"
              label="メンバーの名前"
              :items="users"
              item-text="name"
              item-value="name"
              :return-object="false"
              :rules="state.memberNameRules"
              :filter="filterUser"
              required
              style="width: 25%"
            >
            </v-combobox>
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
  SetupContext,
  onMounted,
  onUnmounted,
} from '@vue/composition-api'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { instrumentList } from '@/instrumentList'

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

interface UserType {
  name: string
  kana: string
}

const member: MemberType = {
  id: 0,
  name: '',
  instrument: '',
}

const membersLimit = 20

// eslint-disable-next-line
const handler = (event: any) => {
  event.returnValue = "Data you've inputted won't be synced"
}
window.addEventListener('beforeunload', handler)

export default defineComponent({
  setup(_, context: SetupContext) {
    const state = reactive({
      valid: false,
      bandNameRules: [(v: string) => !!v || 'バンド名を入力してください'],
      memberNameRules: [(v: string) => !!v || '名前を入力してください'],
      instrumentRules: [(v: string) => !!v || '楽器を選択してください'],
    })

    const band = ref<BandType>({
      name: '',
      memberNum: 1,
      notes: '',
      memberList: [Object.assign({}, member)],
    })
    onMounted(() => {
      if (typeof context.root.$route.params.band !== 'undefined') {
        // @ts-ignore
        band.value = context.root.$route.params.band as BandType
      }
    })

    const users = ref<(UserType | undefined)[]>([])
    onMounted(async () => {
      const db = firebase.firestore()
      const userRef = await db.collection('users').get()
      users.value = userRef.docs.map(doc =>
        doc.exists ? (doc.data() as UserType) : undefined
      )
    })

    const filterUser = (item: UserType, queryText: string) => {
      const hasValue = (val: string) => (val !== null ? val : '')
      const query = hasValue(queryText)
      const name = hasValue(item.name)
      const kana = hasValue(item.kana)

      return (
        name.indexOf(query.toString()) > -1 ||
        kana.indexOf(query.toString()) > -1
      )
    }

    const membersSelection = computed<number[]>(() =>
      Array.from({ length: membersLimit }, (v, k) => k + 1)
    )

    const pushEmptyMember = watch(
      () => band.value.memberNum,
      (memberNum: number, prevNum: number) => {
        const memberDiff = memberNum - prevNum

        if (memberDiff > 0) {
          for (let i = 0; i < memberDiff; i++) {
            member.id++
            band.value.memberList.push(Object.assign({}, member))
          }
        } else {
          for (let i = 0; i < -memberDiff; i++) {
            band.value.memberList.pop()
          }
        }
      }
    )

    const form = ref('')
    const submit = () => {
      if (state.valid) {
        // eslint-disable-next-line
        const params: any = {}
        params['band'] = band.value
        context.root.$router.push({
          name: 'EntryConfirm',
          params,
        })
      } else {
        // @ts-ignore
        form.value.validate()
      }
    }

    onUnmounted(() => {
      window.removeEventListener('beforeunload', handler)
    })

    return {
      state,
      band,
      instrumentList,
      membersSelection,
      pushEmptyMember,
      submit,
      form,
      users,
      filterUser,
    }
  },
})
</script>
