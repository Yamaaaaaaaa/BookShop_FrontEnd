import axios from "axios"

export const mainUrl = "http://localhost:8080/api/v1"
export const loginClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/login", userData)
}

export const registerClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/register", userData)
}