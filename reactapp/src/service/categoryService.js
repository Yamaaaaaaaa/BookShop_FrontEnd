import axios from "axios"
import { mainUrl } from "./authService"

export const getAllCategories = async (query) => {
    return await axios.get( mainUrl + "/category/get-all-category", {
        params: query
    })
}
