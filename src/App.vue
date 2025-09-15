<template>
  <div class="wrapper">
    <div class="main-block">
      <div class="main-block__header">
        <div class="main-block__header__title">
          <h5>Учетные записи</h5>
          <QBtn color="secondary" glossy icon="add" @click="toggleForm" />
        </div>
        <div class="main-block__header__info">
          <QChip icon="help" label="Для указания нескольких меток для одной пары логин/пароль используйте разделитель"
            size="sm" color="gray" />
        </div>
      </div>

      <AccountForm v-if="showForm" />
      <AccountList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AccountForm from './components/form/Account-form.vue'
import AccountList from './components/Account-list.vue'

const showForm = ref(false)

function toggleForm() {
  showForm.value = !showForm.value
}
</script>

<style scoped>
.main-block {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.main-block__header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-block__header__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.main-block__header__title>h5 {
  font-weight: bold;
  color: #42567A;
}
</style>
