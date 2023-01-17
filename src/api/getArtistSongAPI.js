import axiosConfig from "../axiosConfing/axios";

export const getArtistSong = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        url: "/artistsong",
        method: "get",
        params:{id:id,page:1,count:50}
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
//   req.query.id, req.query.page, req.query.count