import axiosConfig from "../axiosConfing/axios";

export const getAudioApi = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/song",
        method: "get",
        params:{id:sid}
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
