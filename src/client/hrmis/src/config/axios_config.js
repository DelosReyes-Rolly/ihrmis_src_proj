import axios from "axios";

// axios.defaults.headers.common["Authorization"] =
//   "Bearer" + localStorage.getItem("XSRF-TOKEN");
// axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
