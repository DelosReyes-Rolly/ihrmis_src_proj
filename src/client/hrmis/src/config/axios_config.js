export const axiosHeader = {
  withCredentials: true,
  headers: {
    Authorization:
      sessionStorage.getItem("token_type") +
      " " +
      sessionStorage.getItem("token"),
    "Access-Control-Allow-Origin": "*",
  },
};
// sessionStorage.removeItem("token");
// sessionStorage.removeItem("user");
// sessionStorage.removeItem("token_token");
