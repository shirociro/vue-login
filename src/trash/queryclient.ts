import { QueryClient } from "@tanstack/vue-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
    mutations: {
      // Optional mutation defaults
      retry: false,
    },
  },
});
