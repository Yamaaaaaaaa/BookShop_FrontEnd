
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllAuthor = async (query) => {
    return await instance.get( mainUrl + "/author/get-all-author", {
        params: query
    })
}

export const createAuthor = async (data) => {
    return await instance.post( mainUrl + "/author/create-author", data)
}

export const updateAuthor = async (data) => {
    return await instance.put( mainUrl + "/author/update-author", data)
}

export const deleteAuthor = async (id) => {
    return await instance.delete( mainUrl + "/author/delete-author", {
        params: {id}
    })
}
