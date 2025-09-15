<script lang="ts" setup>
import { ref, computed } from 'vue'
import { QForm, QInput, QSelect, QBtn, QIcon } from 'quasar'
import TagInput from '../ui/Tag-input.vue'
import { useAccountStore } from '../../stores/accountStore'

type AuthType = 'Локальная' | 'LDAP'

const store = useAccountStore()

const formRef = ref<InstanceType<typeof QForm> | null>(null)
const authType = ref<AuthType | ''>('')
const login = ref('')
const password = ref('')
const showPassword = ref(false)
const tags = ref<{ text: string }[]>([])

const authTouched = ref(false)
const loginTouched = ref(false)
const passwordTouched = ref(false)

const authError = computed(() => (authTouched.value && !authType.value ? 'Выберите тип авторизации' : ''))
const loginError = computed(() => (loginTouched.value && !login.value ? 'Введите логин' : ''))
const passwordError = computed(() => {
  if (authType.value !== 'Локальная') return ''
  return passwordTouched.value && !password.value ? 'Введите пароль' : ''
})

function onLoginInput() { if (login.value) loginTouched.value = false }
function onPasswordInput() { if (password.value) passwordTouched.value = false }
function toggleShowPassword() { showPassword.value = !showPassword.value }

function onSubmit() {
  authTouched.value = true
  loginTouched.value = true
  if (authType.value === 'Локальная') passwordTouched.value = true

  const valid = !authError.value && !loginError.value && !passwordError.value

  if (valid) {
    store.addAccount({
      authType: authType.value,
      login: login.value,
      password: authType.value === 'Локальная' ? password.value : null,
      tags: tags.value
    })

    authType.value = ''
    login.value = ''
    password.value = ''
    tags.value = []
    authTouched.value = false
    loginTouched.value = false
    passwordTouched.value = false
  }
}
</script>

<template>
  <QForm ref="formRef" @submit.prevent="onSubmit" class="account-form">
    <TagInput v-model="tags" />

    <QSelect v-model="authType" :options="['Локальная', 'LDAP']" dense outlined color="grey" label="Тип авторизации"
      @blur="authTouched = true" :error="!!authError" :error-message="authError" />

    <QInput v-model="login" label="Логин" dense outlined maxlength="100" color="grey"
      @blur="loginTouched = true" @input="onLoginInput" :error="!!loginError" :error-message="loginError" />

    <QInput v-if="authType === 'Локальная'" v-model="password" :type="showPassword ? 'text' : 'password'" label="Пароль"
      dense outlined maxlength="100" color="grey" @blur="passwordTouched = true" @input="onPasswordInput"
      :error="!!passwordError" :error-message="passwordError">
      <template v-slot:append>
        <QIcon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
          @click="toggleShowPassword" />
      </template>
    </QInput>

    <div class="form-actions">
      <QBtn type="submit" color="primary" label="Сохранить" />
    </div>
  </QForm>
</template>


<style scoped>
.account-form {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-actions {
  display: flex;
  gap: 3px;
  align-items: center;
}

.deleteBtn {
  margin-left: auto;
}

/* Скрываем стандартные иконки ошибок Quasar */
:deep(.q-field__append .q-icon.text-negative) {
  display: none !important;
}
</style>
