<script setup lang="ts">
import { onMounted } from "vue";
import { useUser } from "../composables/useUser";
import tableDynamic from "../components/tableDynamic.vue";
import formDynamic from "../components/formDynamic.vue";
import Button from "primevue/button";
import { ProgressSpinner } from "primevue";
import { userTableConfig, userFormConfig } from "../constants/userconfig";
import { Plus } from "lucide-vue-next";
import Modal from "../components/modal.vue";

const {
  items,
  isModalOpen,
  loading,
  editingItem,
  fetchUsers,
  openModal,
  handleEdit,
  handleDelete,
  handleFormSubmit,
  closeModal,
} = useUser();

onMounted(fetchUsers);
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <div class="header-content">
        <h1>Usuarios</h1>
      </div>
      <div class="header-actions">
        <Button @click="openModal" label="Agregar Usuario" severity="primary">
          <template #icon>
            <Plus :size="20" />
          </template>
        </Button>
      </div>
    </header>
    <main class="content">
      <div v-if="loading" class="loading-content">
        <ProgressSpinner />
        <p>Cargando...</p>
      </div>
      <tableDynamic
        v-else
        :columns="userTableConfig"
        :data="items"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </main>
    <Modal
      v-model:is-open="isModalOpen"
      :title="editingItem ? 'Editar Usuario' : 'Nuevo Usuario'"
    >

    <formDynamic
      :fields="userFormConfig"
      :initial-data="editingItem"
      :submit-label="editingItem ? 'Actualizar' : 'Agregar'"
      @submit="handleFormSubmit"
      @cancel="closeModal"
    />

    </Modal>
  </div>
</template>

<style scoped>
    .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        gap: 1rem;
    }
    .header-content h1 {
        font-size: 1.5rem;
        color: var(--text-main);
    }
    .header-content p{
        color: var(--text-secondary);
    }
    .header-actions {
        flex-shrink: 0;
    }
    :deep(.p-button) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 2rem;
    }
    @media (max-width: 600px) {
        .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
    }
</style>
