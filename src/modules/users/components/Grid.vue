<template>
  <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    <!-- First card: UserAdd -->
    <UserAdd @add="handleAdd" />

    <!-- User Cards -->
    <div v-for="user in users" :key="user.id">
      <!-- Edit Mode -->
      <UserEdit
        v-if="editingUserId === user.id"
        :user="user"
        @save="(updatedUser) => handleEdit(updatedUser, user.id)"
        @cancel="() => (editingUserId = null)"
      />

      <!-- Delete Mode -->
      <UserDelete
        v-else-if="deletingUserId === user.id"
        :user="user"
        @confirm="() => handleDelete(user.id)"
        @cancel="() => (deletingUserId = null)"
      />

      <!-- Default Card -->
      <UserCard
        v-else
        :user="user"
        @edit="() => (editingUserId = user.id)"
        @delete="() => (deletingUserId = user.id)"
        @completed="() => emitCompleted(user.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserCard from "@/modules/users/components/Card.vue";
import UserEdit from "@/modules/users/components/UserEdit.vue";
import UserAdd from "@/modules/users/components/UserAdd.vue";
import UserDelete from "@/modules/users/components/UserDelete.vue";

// Props from parent
defineProps({
  users: { type: Array, required: true },
  onAdd: { type: Function, required: true },
  onEdit: { type: Function, required: true },
  onDelete: { type: Function, required: true },
  onCompleted: { type: Function, required: true },
});

// Refs for editing/deleting state
const editingUserId = ref(null);
const deletingUserId = ref(null);

// Emits helper functions
const handleAdd = (user) => {
  onAdd(user);
};

const handleEdit = (user, id) => {
  onEdit(user);
  editingUserId.value = null;
};

const handleDelete = (id) => {
  onDelete(id);
  deletingUserId.value = null;
};

const emitCompleted = (id) => {
  onCompleted(id);
};
</script>
