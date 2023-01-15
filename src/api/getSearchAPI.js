import axiosConfig from "../axiosConfing/axios";

export const getSearch = (keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/search",
        method: "get",
        params:{keyword}
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
