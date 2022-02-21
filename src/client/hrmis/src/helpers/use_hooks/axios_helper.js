import axios from "axios";
import { API_HOST } from "../global/global_config";

const onSubmitRequest = async (
  data,
  endpoint,
  params,
  withFiles = false,
  files = null
) => {
  let token = document.head.querySelector('meta[name="csrf-token"]');

  const formData = withFiles === false ? data : new FormData();
  const contentType = withFiles
    ? "multipart/form-data"
    : "application/x-www-form-urlencoded";
  const parameter = params === undefined ? "" : "/" + params;
  console.log(parameter);
  console.log(contentType);
  console.log(API_HOST + endpoint + parameter);
  try {
    const result = await axios.post(API_HOST + endpoint + parameter, formData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const useAxiosHelper = { post: onSubmitRequest };

export default useAxiosHelper;
