import axiosConfig from '../axiosConfing/axios'

export const getDetailPlaylist =  (pid) => new Promise( async (resolve,reject) => {
    try{
        const res = await axiosConfig({
            url:'/detailplaylist',
            method:'get',
            params:{id:pid}
        })
        resolve(res)
    }catch(error){
        reject(error)
    }
})