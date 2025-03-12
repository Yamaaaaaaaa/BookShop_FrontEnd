import axios from "axios"
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllCategories = async (query) => {
    return await axios.get( mainUrl + "/category/get-all-category", {
        params: query
    })
}

export const createCategories = async (data) => {
    return await instance.post( mainUrl + "/category/create-category", data)
}

export const updateCategories = async (data) => {
    return await instance.put( mainUrl + "/category/update-category", data)
}

export const deleteCategories = async (id) => {
    return await instance.delete( mainUrl + "/category/delete-category", {
        params: {id}
    })
}

