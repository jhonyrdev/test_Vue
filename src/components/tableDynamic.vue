<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { Edit, Trash2 } from 'lucide-vue-next';

interface columnsDef{
    key: string;
    label: string;
}

interface propsDef{
    columns: columnsDef[];
    data: any[];
}

const props = defineProps<propsDef>();

const emit = defineEmits<{
    (e: "edit", item: any): void;
    (e: "delete", item: any): void;
}>();

</script>

<template>
  <div class="card">
    <DataTable
      :value="data"
      tableStyle="min-width: 50rem"
      showGridlines
      stripedRows
    >
      <Column
        v-for="col in columns"
        :key="col.key"
        :field="col.key"
        :header="col.label"
      ></Column>
      <Column
        header="Acciones"
        :exportable="false"
        style="width: 8rem; text-align: center"
      >
        <template #body="slotProps">
          <div class="action-buttons">
            <Button
              text
              rounded
              severity="info"
              class="action-btn"
              @click="emit('edit', slotProps.data)"
            >
              <template #icon>
                <Edit :size="18" />
              </template>
            </Button>
            <Button
              text
              rounded
              severity="danger"
              class="action-btn"
              @click="emit('delete', slotProps.data)"
            >
              <template #icon>
                <Trash2 :size="18" />
              </template>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>

  </div>
</template>

<style scoped>
.card {
  background: var(--surface-card);
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  width: 2rem !important;
  height: 2rem !important;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>