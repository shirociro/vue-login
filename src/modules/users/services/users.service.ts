import { api } from "@/api/axios";

/** User type */
export interface User {
  id: string;
  username: string;
  password?: string;
}

/** Fetch all users */
export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>("/api/users");
  return data;
};

/** Add a new user */
export const addUserAPI = async (user: Omit<User, "id">): Promise<User> => {
  const { data } = await api.post<User>("/api/users", user);
  return data;
};

/** Update existing user */
export const updateUserAPI = async (user: User): Promise<User> => {
  const { data } = await api.put<User>(`/api/users/${user.id}`, user);
  return data;
};

/** Delete a user */
export const deleteUserAPI = async (id: string): Promise<string> => {
  await api.delete(`/api/users/${id}`);
  return id;
};
