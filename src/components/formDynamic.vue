<script setup lang="ts">
import { InputNumber, InputText, Button } from 'primevue';
import { XCircle, Save } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { validateFields } from '../utils/userValidator';

interface fieldDef {
  key: string;
  label: string;
  type: 'text' | 'number' | 'email';
  placeholder?: string;
  required?: boolean;
}

interface Props{
    fields: fieldDef[];
    initialData?: Record<string, any> | null;
    submitLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    initialData: null,
    submitLabel: 'Guardar'
});

const emit = defineEmits<{
    (e: "submit", data: any): void;
    (e: "cancel"): void;
}>();


const formData = ref<Record<string, any>>({});
const errors = ref<Record<string, string>>({});

watch(
    () => props.initialData,
    (newData) => {
        errors.value = {};
        if (newData){
            formData.value = { ...newData };
        } else{
            formData.value = {};
            props.fields.forEach((field) =>{
                formData.value[field.key] = "";
            })
        }
    },
    {immediate: true},
);

const handleSubmit = () => {
    errors.value = validateFields(props.fields, formData.value);
    if(Object.keys(errors.value).length > 0) return;
    emit("submit", formData.value);
};

</script>

<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <div class="fields-container">
      <div v-for="field in fields" :key="field.key" class="field-item">
        <label :for="field.key" class="field-label">{{ field.label }}</label>

        <InputNumber
          v-if="field.type === 'number'"
          :id="field.key"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          class="w-full"
          :invalid="!!errors[field.key]"
          fluid
        />

        <InputText
          v-else
          :id="field.key"
          v-model="formData[field.key]"
          :type="field.type"
          :placeholder="field.placeholder"
          class="w-full"
          :invalid="!!errors[field.key]"
          fluid
        />

        <small v-if="errors[field.key]" class="field-error">{{
          errors[field.key]
        }}</small>
      </div>
    </div>

    <div class="form-actions">
      <Button
        label="Cancelar"
        severity="secondary"
        outlined
        @click="emit('cancel')"
      >
        <template #icon>
          <XCircle :size="18" />
        </template>
      </Button>
      <Button type="submit" :label="submitLabel" severity="contrast">
        <template #icon>
          <Save :size="18" />
        </template>
      </Button>
    </div>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 0.5rem;
}

.fields-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-weight: 600;
  color: var(--text-main);
  font-size: 0.95rem;
}

.field-error {
  color: var(--p-red-500, #ef4444);
  font-size: 0.8rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

:deep(.p-button) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

:deep(.p-button-icon) {
  margin-right: 0.5rem;
}

.w-full {
  width: 100%;
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
