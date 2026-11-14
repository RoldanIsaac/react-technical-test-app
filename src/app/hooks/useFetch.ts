import { useCallback, useEffect, useState } from "react";
import { getErrorMessage, isAbortError } from "../core/api/client";

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((error: unknown) => {
        if (isAbortError(error)) return;
        setState({
          data: null,
          isLoading: false,
          error: getErrorMessage(error),
        });
      });

    return () => controller.abort();
  }, [fetcher, attempt]);

  const retry = useCallback(() => {
    setState({ data: null, isLoading: true, error: null });
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
