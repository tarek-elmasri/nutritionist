"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const onError = () => {
    toast.error("حدث خطأ أثناء الاتصال بالخادم");
  };

  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { staleTime: 5000 } },
      queryCache: new QueryCache({ onError }),
      mutationCache: new MutationCache({ onError }),
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;
