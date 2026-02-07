<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed } from 'vue';

const props = defineProps<{
    isOpen: boolean,
    title: string,
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "update:isOpen", value: boolean): void;
}>();

const visible = computed({
    get: () => props.isOpen,
    set: (value) => emit("update:isOpen", value)
})

</script>

<template>
    <Dialog v-model:visible="visible" modal :header="props.title" :style="{ width: '30rem' }" :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
        <slot></slot>
    </Dialog>
</template>