<template>
  <div class="account-list">
    <div
      v-for="(account, index) in store.accounts"
      :key="index"
      class="account-row q-pa-sm q-mb-sm row items-center"
    >
      <div class="col tags-col">
        <QInput
          :value="formattedTags(account.tags)"
          dense
          outlined
          readonly
        />
      </div>

      <div class="col type-col">
        <QSelect
          v-model="account.authType"
          :options="['Локальная', 'LDAP']"
          dense
          outlined
          readonly
        />
      </div>

      <div class="col login-col">
        <QInput v-model="account.login" dense outlined readonly />
      </div>

      <div class="col password-col">
        <QInput
          v-if="account.authType === 'Локальная'"
          v-model="account.password"
          dense
          outlined
          type="password"
          readonly
        />
      </div>

      <div class="col-auto">
        <QBtn
          color="negative"
          icon="delete"
          round
          dense
          glossy
          @click="removeAccount(index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from '../stores/accountStore'
import { QInput, QSelect, QBtn } from 'quasar'

const store = useAccountStore()

function removeAccount(index: number) {
  store.accounts.splice(index, 1)
}

function formattedTags(tags: { text: string }[]) {
  return tags.map(t => t.text).join('; ')
}
</script>

<style scoped>
.account-row {
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.col {
  flex: 1;
}

.tags-col {
  min-width: 200px;
}

.type-col {
  min-width: 140px;
}

.login-col {
  min-width: 140px;
}

.password-col {
  min-width: 140px;
}
</style>
