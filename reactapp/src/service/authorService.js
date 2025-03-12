
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllAuthor = async (query) => {
    return await instance.get( mainUrl + "/author/get-all-author", {
        params: query
    })
}
