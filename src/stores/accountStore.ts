import { defineStore } from 'pinia'

export interface Account {
  authType: 'Локальная' | 'LDAP' | ''
  login: string
  password?: string | null
  tags: { text: string }[]
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account)
    }
  }
})
