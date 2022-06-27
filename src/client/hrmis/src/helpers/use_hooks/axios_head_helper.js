import { useState } from "react";

export const useAxiosHeadHelper = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const tokenHead = {
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*",
    },
  };

  return tokenHead;
};
