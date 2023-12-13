"use client";

import { useEffect, useState } from "react";

const useFetch = <T,>(fetchMethod: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<unknown>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const res = await fetchMethod();
      setData(res);
    } catch (error) {
      setErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  }, []);

  return {
    data,
    errors,
    isLoading,
    refetch,
  };
};

export default useFetch;
