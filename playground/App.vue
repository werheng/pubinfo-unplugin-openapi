<script lang="ts" setup>
import { useRequest } from 'alova'
import { ref } from 'vue'

const res = ref({})
async function requestApi() {}

const { data, send } = useRequest(
  params => getRoleListByResourceId(params, {
    transformData(data) {
      return data.data ?? []
    },
  }),
  {
    immediate: false,
  },
)

send()

requestApi()
</script>

<template>
  <div>{{ res }}</div>
  <div>{{ data }}</div>
</template>
