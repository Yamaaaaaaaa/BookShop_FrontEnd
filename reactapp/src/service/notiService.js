import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"


export const getNoti = async (id, toId) => {
    return await instance.get( mainUrl + "/noti/get-noti", {
        params: {id: id, toId: toId}
    })
}

export const createNoti = async (data) => {
    return await instance.post( mainUrl + "/noti/create-noti", data)
}

export const updateNoti = async (data) => {
    return await instance.put( mainUrl + "/noti/update-noti", data)
}

export const deleteNoti = async (id) => {
    return await instance.delete( mainUrl + "/noti/delete-noti", {
        params: {id}
    })
}

