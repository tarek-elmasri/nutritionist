"use client";

import { useEffect, useState } from "react";

interface UseFetchProps<T> {
  fetchFn: () => Promise<T>;
}

const useFetch = <T,>(fetchMethod: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<any>(null);

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
    refetch();
    // eslint-disable-next-line
  }, []);

  return {
    data,
    errors,
    isLoading,
    refetch,
  };
};

export default useFetch;
