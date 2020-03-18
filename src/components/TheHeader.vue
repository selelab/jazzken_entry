<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-btn text href="http://abehiroshi.la.coocan.jp/" target="_brank"
        >ジャズ研バンドエントリーシステム</v-btn
      >
    </div>

    <v-spacer></v-spacer>

    <v-btn to="./list" text>
      <span class="mr-2">バンド一覧</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>
