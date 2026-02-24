import { ref, reactive, onUnmounted } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  fetchUsers,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "@/modules/users/services/users.service";

export const useUsers = () => {
  const queryClient = useQueryClient();
  let timeoutId = null; // Replaces useRef(null)

  // 0. State Management (Replaces useState)
  const alert = reactive({
    show: false,
    message: "",
    type: "success",
  });

  const showAlert = (message, type = "success") => {
    alert.show = true;
    alert.message = message;
    alert.type = type;

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      alert.show = false;
      alert.message = "";
    }, 3000);
  };

  // Cleanup timeout on component unmount
  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  /* 1. FETCH USERS */
  const {
    data: users, // This will be a Ref, so use .value in logic
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialData: [], // Default value
    staleTime: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  /* 2. SHARED OPTIMISTIC LOGIC */
  const updateLocalCache = async (updateFn) => {
    await queryClient.cancelQueries({ queryKey: ["users"] });
    const previous = queryClient.getQueryData(["users"]);
    queryClient.setQueryData(["users"], updateFn);
    return { previous };
  };

  /* 3. ADD USER */
  const addUserMutation = useMutation({
    mutationFn: addUserAPI,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users"], (old = []) => [...old, newUser]);
      showAlert("Successfully added User!", "success");
    },
  });

  /* 4. UPDATE USER */
  const updateUserMutation = useMutation({
    mutationFn: updateUserAPI,
    networkMode: "offlineFirst",
    onMutate: async (updatedUser) =>
      updateLocalCache((old = []) =>
        old.map((u) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u,
        ),
      ),
    onError: (err, _, context) => {
      if (navigator.onLine && context?.previous) {
        queryClient.setQueryData(["users"], context.previous);
        showAlert("Update failed", "destructive");
      }
    },
    onSuccess: () => showAlert("Successfully updated User", "success"),
    onSettled: () => {
      if (navigator.onLine && queryClient.isMutating().value === 0) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  /* 5. DELETE USER */
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserAPI,
    onMutate: (id) =>
      updateLocalCache((old = []) => old.filter((u) => u.id !== id)),
    onError: (err, _, context) => {
      if (navigator.onLine && context?.previous)
        queryClient.setQueryData(["users"], context.previous);
      showAlert("Delete failed", "destructive");
    },
    onSuccess: () => showAlert("Successfully deleted User", "success"),
    onSettled: () => {
      if (navigator.onLine)
        queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    users, // Note: In Vue, this is a Ref. Template unwrap it automatically.
    isLoading,
    isError,
    alert,
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
  };
};
