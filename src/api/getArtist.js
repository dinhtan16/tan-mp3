import axiosConfig from "../axiosConfing/axios";

export const getArtist = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/artist",
        method: "get",
        params:{name:name}
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
//   req.query.id, req.query.page, req.query.count