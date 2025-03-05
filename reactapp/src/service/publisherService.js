import axios from "axios"
import { mainUrl } from "./authService"

export const getAllPublisher = async (query) => {
    return await axios.get( mainUrl + "/publisher/get-all-publisher", {
        params: query
    })
}
