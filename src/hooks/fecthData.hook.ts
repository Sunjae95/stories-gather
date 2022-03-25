/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetchData = <T>({
  url,
  initialState,
}: {
  url: string;
  initialState: T;
}) => {
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<T>(url);
        setData(res.data);
      } catch {
        setData(initialState);
      }
    };

    fetchData();
  }, [url]);

  return data;
};
