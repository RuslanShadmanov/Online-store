import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loading: true });
  useEffect(() => {
    fetchData();
  }, [url]);
  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setState({ data: data, loading: false });
  };
  return state;
};
