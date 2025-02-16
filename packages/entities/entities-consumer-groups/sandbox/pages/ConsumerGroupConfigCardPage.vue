<template>
  <h2>Konnect API</h2>
  <ConsumerGroupConfigCard
    :config="konnectConfig"
    @copy:success="onCopy"
    @fetch:error="onError"
    @fetch:success="onSuccess"
  />

  <h2>Kong Manager API</h2>
  <ConsumerGroupConfigCard
    :config="kongManagerConfig"
    @copy:success="onCopy"
    @fetch:error="onError"
    @fetch:success="onSuccess"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AxiosError } from 'axios'
import type { KonnectConsumerGroupEntityConfig, KongManagerConsumerGroupEntityConfig } from '../../src'
import { ConsumerGroupConfigCard } from '../../src'

const props = defineProps({
  /** Grab the ConsumerGroup id from the route params */
  id: {
    type: String,
    required: false,
    default: '',
  },
})

const controlPlaneId = import.meta.env.VITE_KONNECT_CONTROL_PLANE_ID || ''
const konnectConfig = ref<KonnectConsumerGroupEntityConfig>({
  app: 'konnect',
  apiBaseUrl: '/us/kong-api/konnect-api', // `/{geo}/kong-api`, with leading slash and no trailing slash; Consuming app would pass in something like `https://us.api.konghq.com`
  // Set the root `.env.development.local` variable to a control plane your PAT can access
  controlPlaneId,
  entityId: props.id,
})
const kongManagerConfig = ref<KongManagerConsumerGroupEntityConfig>({
  app: 'kongManager',
  workspace: 'default',
  apiBaseUrl: '/kong-manager', // For local dev server proxy
  entityId: props.id,
})

const onError = (error: AxiosError) => {
  console.log(`Error: ${error}`)
}
const onSuccess = (payload: Record<string, any>) => {
  console.log('fetch:success', payload)
}
const onCopy = (payload: Record<string, any>) => {
  console.log('copy:success', payload)
}
</script>
