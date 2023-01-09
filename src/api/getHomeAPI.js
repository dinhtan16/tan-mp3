import axiosConfig from "../axiosConfing/axios";

export const getHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/home",
        method: "get",
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
