import { useEffect, useState } from 'react';
import { createURL } from '@utils/index';
import type { IResponseError, IResponseSuccess, IUrl } from '@interfaces/index';

export default function useFetchList<T>(url: IUrl, delay = 500) {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<IResponseSuccess<T> | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const u = createURL(url);
    let timerID: ReturnType<typeof setTimeout>;

    fetch(u)
      .then<IResponseSuccess<T> | IResponseError>((r) => r.json())
      .then((r) => {
        if (r.success === false) throw new Error(r.status_message);

        setResponse(r);
      })
      .catch((error) => {
        setResponse(null);
        setError(error);
      })
      .finally(() => {
        timerID = setTimeout(() => {
          setLoading(false);
        }, delay);
      });

    return () => clearTimeout(timerID);
  }, [JSON.stringify(url), delay]);

  return {
    loading,
    response,
    error,
  };
}
