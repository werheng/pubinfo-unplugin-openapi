<script lang="ts" setup>
import { ref } from 'vue'

const res = ref({})

async function requestApi() {
  await loginUsingPost({ username: 'admin', password: '123' })
  // await save({ id: 123 })
  res.value = await getOrgUsingGet({ orgCode: '1' })
}

requestApi()
</script>

<template>
  <div>{{ res }}</div>
</template>
