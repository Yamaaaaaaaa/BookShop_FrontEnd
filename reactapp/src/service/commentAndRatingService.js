
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getComments = async (query) => {
    return await instance.get( mainUrl + "/comments/get-comments", {
        params: query
    })
}

export const createComments = async (data) => {
    return await instance.post( mainUrl + "/comments/create-comments", data)
}

export const updateComments = async (data) => {
    return await instance.put( mainUrl + "/comments/update-comments", data)
}

export const deleteAuthor = async (id) => {
    return await instance.delete( mainUrl + "/comments/delete-comments", {
        params: {id}
    })
}
