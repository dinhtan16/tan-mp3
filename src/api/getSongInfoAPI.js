import axiosConfig from "../axiosConfing/axios";

export const getSongInfo = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/infosong",
        method: "get",
        params:{id:sid}
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
