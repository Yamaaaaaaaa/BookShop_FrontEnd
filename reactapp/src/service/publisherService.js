import axios from "axios"
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllPublisher = async (query) => {
    return await axios.get( mainUrl + "/publisher/get-all-publisher", {
        params: query
    })
}
export const createPublisher = async (data) => {
    return await instance.post( mainUrl + "/publisher/create-publisher", data)
}

export const updatePublisher = async (data) => {
    return await instance.put( mainUrl + "/publisher/update-publisher", data)
}

export const deletePublisher = async (id) => {
    return await instance.delete( mainUrl + "/publisher/delete-publisher", {
        params: {id}
    })
}
