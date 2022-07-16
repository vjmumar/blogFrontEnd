import { useState } from "react";

// axios
import axios from "axios";

// Hooks
import useLocalStorage from "./useLocalStorage";

export const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const storage = useLocalStorage();
  const axiosCreate = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_HOST,
    headers: { 
    "Authorization": `Bearer ${storage.get('token')}`,
     },
  });

  const communicate = async (method,url,data) => {
    setIsLoading(true);
    const axiosStart = await axiosCreate({
      method: method,
      url: url,
      data: data,
    });
    setIsLoading(false);
    return axiosStart;
  };

  return [isLoading, communicate];
};
