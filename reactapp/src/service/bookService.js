import axios from "axios"
import { mainUrl } from "./authService"

export const getBooks = async (query) => {
    return await axios.get( mainUrl + "/book/get-all-book", {
        params: query
    })
}
