import { ref } from "vue";
import { getUsers } from "../services/user";
import { type User } from "../types/user";
import Swal from "sweetalert2";

export function useUser() {
  const items = ref<User[]>([]);
  const loading = ref(false);
  const isModalOpen = ref(false);
  const editingItem = ref<User | null>(null);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      const { data } = await getUsers();
      items.value = data;
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      loading.value = false;
    }
  };

  const openModal = () => {
    editingItem.value = null;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    editingItem.value = null;
    isModalOpen.value = false;
  };

  const handleEdit = (item: User) => {
    editingItem.value = { ...item };
    isModalOpen.value = true;
  };

  const handleDelete = async (item: User) => {
    const result = await Swal.fire({
      title: "Eliminar Usuario",
      text: `Tu estas seguro de eliminar al usuario ${item.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

      if (result.isConfirmed) {
        items.value = items.value.filter((i) => i.id !== item.id);
        Swal.fire({
          title: "Eliminado!",
          text: `${item.name} ha sido eliminado.`,
          icon: "success",
        });
      }
  };

  const handleFormSubmit = (formData: User) => {
    if (editingItem.value) {
        const index = items.value.findIndex((i)=> i.id === editingItem.value!.id);
        if(index !== -1) {
            items.value[index] = {...editingItem.value, ...formData};
        }
    } else {
            const newid = Math.max(...items.value.map((i) => i.id ?? 0), 0) + 1;
            items.value.push({...formData, id: newid});
    }    
  
  closeModal();
}

return{
    items,
    loading,
    isModalOpen,
    editingItem,
    fetchUsers,
    openModal,
    closeModal,
    handleEdit,
    handleDelete,
    handleFormSubmit
}

}
