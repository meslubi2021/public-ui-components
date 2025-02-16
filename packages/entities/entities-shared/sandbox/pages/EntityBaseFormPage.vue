<template>
  <div class="sandbox-container">
    <EntityBaseForm
      :can-submit="canSubmit"
      :config="konnectConfig"
      :error-message="form.errorMessage"
      :fetch-url="konnectFetchUrl"
      :form-fields="form.fields"
      :is-readonly="form.isReadonly"
      @cancel="handleCancel"
      @submit="handleSave"
    >
      <EntityFormSection
        description="General information will help identify and manage this Entity."
        has-divider
        title="General Information"
      >
        <KInput
          v-model.trim="form.fields.name"
          autocomplete="off"
          data-testid="form-name"
          label="Name *"
          placeholder="Enter a unique name for this key set"
          :readonly="form.isReadonly"
          required
          type="text"
        />

        <KInput
          v-model.trim="form.fields.tags"
          autocomplete="off"
          data-testid="form-tags"
          help="e.g. tag1, tag2, tag3"
          label="Tags"
          :label-attributes="{ info: 'An optional set of strings for grouping and filtering, separated by commas.' }"
          placeholder="Enter a list of tags separated by comma"
          :readonly="form.isReadonly"
          type="text"
        />
      </EntityFormSection>
    </EntityBaseForm>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import type { KonnectBaseFormConfig } from '../../src'
import { EntityBaseForm, EntityFormSection } from '../../src'

const controlPlaneId = import.meta.env.VITE_KONNECT_CONTROL_PLANE_ID || ''
const konnectFetchUrl = ref(`/api/runtime_groups/${controlPlaneId}/services`)

const konnectConfig = ref<KonnectBaseFormConfig>({
  app: 'konnect',
  apiBaseUrl: '/us/kong-api/konnect-api', // `/{geo}/kong-api`, with leading slash and no trailing slash; Consuming app would pass in something like `https://us.api.konghq.com`
  // Set the root `.env.development.local` variable to a control plane your PAT can access
  controlPlaneId,
  cancelRoute: { name: '/' },
  jsonYamlFormsEnabled: true,
})

const canSubmit = computed((): boolean => !!form.fields.name)

const form = reactive({
  fields: {
    name: '',
    tags: '',
  },
  isReadonly: false,
  errorMessage: '',
})

const handleSave = (): void => {
  console.log('Save clicked', form.fields)
}

const handleCancel = (): void => {
  console.log('Cancel clicked')
}
</script>

<style lang="scss" scoped>
.sandbox-container {
  padding: 40px;
}

.entity-name {
  font-weight: 600;
}
</style>
