
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllSeries = async (query) => {
    return await instance.get( mainUrl + "/series/get-all-series", {
        params: query
    })
}
