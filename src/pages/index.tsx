import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Router } from "@/router";

import { queryClient } from "@/queryClient";

export default function Index() {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        dehydrateOptions: {
          shouldDehydrateMutation: () => false,
          shouldDehydrateQuery: (query) => {
            return (
              query.state.status === "success" &&
              query.queryKey.length > 0 &&
              typeof query.queryKey[0] === "string" &&
              query.queryKey[0] === "persist"
            );
          },
        },
      }}
    >
      <Router />
    </PersistQueryClientProvider>
  );
}
