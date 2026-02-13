"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { createContext, useState } from "react";

export const apiContext = createContext();

export function ApiContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("bike");
  const params = useParams();
  const apiKey=process.env.NEXT_PUBLIC_API_KEY;
  async function fetchData() {
    let ans = params?.device === "laptop" ? "landscape" : "portrait";
    let response = await axios(
      `https://api.unsplash.com/search/photos?query=${category}&orientation=${ans}&per_page=30&page=${page}&client_id=${apiKey}`,
    );
    let actualUrls = await response.data.results;
    setData((prev) => [...prev, ...actualUrls]);
    setPage((prev) => prev + 1);
    
  }

  let value = {
    data,
    setData,
    fetchData,
    category,
    setCategory,
    page,
    setPage,
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
}

// GvgmoWxw7WrLFBfcB-sYaGLcSTovsxzqyNOgemXDiSQ
// 4gwXG5urvcklOQqXdCY_iv5StHDeQXtWOHcqTpTRtxU
//i6sat3Ei1v76Yz11hITB2nwXAtUrGQ51eYk44CS8DfI
// "https://api.unsplash.com/search/photos?query=${category}&per_page=30&page=${page}&client_id=4gwXG5urvcklOQqXdCY_iv5StHDeQXtWOHcqTpTRtxU"
