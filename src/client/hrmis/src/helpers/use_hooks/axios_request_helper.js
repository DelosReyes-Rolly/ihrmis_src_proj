import axios from "axios";
import { API_HOST } from "../global/global_config";

const onSubmit = async (data, endpoint, params, withFiles = false) => {
  const formData = new FormData();
  const contentType = withFiles
    ? "multipart/form-data"
    : "application/x-www-form-urlencoded";
  const parameter = params === undefined ? "" : "/" + params;
  let errorGenerator = undefined;

  try {
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        if (withFiles == true) {
          data[key].forEach((item) => formData.append(key, item));
        } else {
          data[key].forEach((item) =>
            formData.append(key, JSON.stringify(item))
          );
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    //Axios Request
    const result = await axios.post(API_HOST + endpoint + parameter, formData, {
      headers: {
        "content-type": contentType,
      },
    });
    //Return Result when success
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status == 422) {
        let errorContainer = error.response.data.errors;
        let container = {};
        Object.keys(errorContainer).forEach((key) => {
          Object.assign(container, { [key]: errorContainer[key][0] });
        });
        throw container;
      } else if (error.response.status === 404) {
        errorGenerator = new Error("404 Page Not Found");
        throw errorGenerator.message;
      } else if (error.response.status === 500) {
        errorGenerator = new Error(`${error.response.data.message}`);
        throw errorGenerator.message;
      }
    }
    if (error.request) {
      errorGenerator = new Error(`Please check your network connectivity.`);
      throw errorGenerator.message;
    }
    errorGenerator = new Error(`Oopss something went wrong.`);
    throw errorGenerator.message;
  }
};

/**
 * HTTP REQUEST HELPER
 */
const useAxiosRequestHelper = { post: onSubmit };
// APPLICANT FORM PAGE FIVE
export default useAxiosRequestHelper;
