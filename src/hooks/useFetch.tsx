"use client";

import { useEffect, useState } from "react";

interface UseFetchProps<T> {
  fetchFn: () => Promise<T>;
}

const useFetch = <T,>(fetchMethod: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [fetchMethod]);

  return {
    data,
    errors,
    isLoading,
  };
};

export default useFetch;
