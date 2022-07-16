/* eslint-disable new-cap */
// axios
import axios from "axios";
// Moment Js
import Moment from "moment"

export const imageFormatter = (link) => {
    const SEPARATOR_SIGN = "+-+";
    const SEPARATOR_INDEX = link?.indexOf(SEPARATOR_SIGN);
    const SEPARATOR_SUBSTRING = link?.substring(SEPARATOR_INDEX);
    return !link?.includes(SEPARATOR_SIGN) ? link : link?.replace(SEPARATOR_SUBSTRING, "");
}

export const numberFormatter = (numb,) => {
  const formatter = Intl.NumberFormat("en", {notation: "compact"});

  return formatter.format(numb);
}

export const truncateString = (str, length) => {
  return str?.split("")?.slice(0,length)?.join("") + "..."
}

export const dateFormatter = (d, type) => {
  const date = new Date(d).toLocaleDateString();

  if (type && type === "from-now") {
    return Moment(d).fromNow();
  } else {
    return Moment(date).format("LL");
  }

}


export const bytesToMb = (size) => {
  return size / (1000 ** 2);
}

export const useAxios = (token) => {
  const axiosCreate = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_HOST,
    headers: { 
    "Authorization": `Bearer ${token}`,
     },
  });

  const communicate = async (method,url,data) => {
    const axiosStart = await axiosCreate({
      method: method,
      url: url,
      data: data,
    });
    return axiosStart;
  };

  return { communicate };
};
