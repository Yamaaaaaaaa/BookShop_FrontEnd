
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllSeries = async (query) => {
    return await instance.get( mainUrl + "/series/get-all-series", {
        params: query
    })
}

export const createSeries = async (data) => {
    return await instance.post( mainUrl + "/series/create-series", data)
}

export const updateSeries = async (data) => {
    return await instance.put( mainUrl + "/series/update-series", data)
}

export const deleteSeries = async (id) => {
    return await instance.delete( mainUrl + "/series/delete-series", {
        params: {id}
    })
}
