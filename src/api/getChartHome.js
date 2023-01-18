import axiosConfig from "../axiosConfing/axios";

export const getChartHome = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/charthome",
        method: "get",
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });