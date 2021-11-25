// import axios from "axios";
// import { API_HOST } from "./global/global_config";

// const onSubmit = async (data, endpoint, params, withFiles = false) => {
//   console.log(data);
//   const formData = new FormData();
//   const contentType = withFiles
//     ? "multipart/form-data"
//     : "application/x-www-form-urlencoded";

//   try {
//     Object.keys(data).forEach((key) => {
//       if (Array.isArray(data[key])) {
//         data[key].forEach((item) => formData.append(key, item));

//         console.log("array");
//       } else {
//         formData.append(key, data[key]);
//         console.log("hello");
//       }
//     });

//     console.log(formData);
//     const result = await axios.post(API_HOST + endpoint + params, formData, {
//       headers: {
//         "content-type": contentType,
//       },
//     });
//     return result;
//   } catch (error) {
//     if (error.response) {
//       if (error.response.status === 422) {
//         console.log(error.response.data.errors);
//         throw new Error(Object.entries(error.response.data.errors));
//       } else if (error.response.status === 404) {
//         throw new Error("404 Page Not Found");
//       } else if (error.response.status === 500) {
//         throw new Error(`500: ${error.response.data.message}`);
//       }
//     } else if (error.request) {
//       throw new Error(`Please check your network connectivity.`);
//     } else {
//       console.log(error);
//       throw new Error(`Oopss something went wrong.`);
//     }
//   }
// };

// const read = async () => {};

// /**
//  * HTTP REQUEST HELPER
//  */
// const httpRequestHelper = { post: onSubmit, get: read };
// // APPLICANT FORM PAGE FIVE
// export default httpRequestHelper;
