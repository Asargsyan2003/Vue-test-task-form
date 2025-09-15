<template>
  <div class="tag-input-wrapper">
    <div class="input-with-tags">
      <QInput
        v-model="rawTags"
        label="Метка"
        outlined
        clearable
        type="text"
        dense
        :rules="[maxLengthRule]"
        @blur="parseTags"
        @keyup.enter="parseTags"
      >
        <template v-slot:append>
          <QIcon name="label" />
        </template>
      </QInput>

      <div class="tags-container">
        <QChip
          v-for="(tag, index) in tags"
          :key="index"
          color="primary"
          text-color="white"
          removable
          @remove="removeTag(index)"
        >
          {{ tag.text }}
        </QChip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

const rawTags = ref('')
const tags = ref<{ text: string }[]>([])

const maxLengthRule = (val: string) => {
  if (!val) return true
  const parts = val.split(';').map(p => p.trim()).filter(Boolean)
  return parts.every(p => p.length <= 50) || 'Каждая метка максимум 50 символов'
}

function parseTags() {
  const parts = rawTags.value
    .split(';')
    .map(p => p.trim())
    .filter(Boolean)
    .filter(p => p.length <= 50)

  parts.forEach(p => {
    if (!tags.value.some(t => t.text === p)) {
      tags.value.push({ text: p })
    }
  })

  emit('update:modelValue', tags.value)
  rawTags.value = ''
}

function removeTag(index: number) {
  tags.value.splice(index, 1)
  emit('update:modelValue', tags.value)
}
</script>

<style scoped>
.input-with-tags {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
}
</style>
