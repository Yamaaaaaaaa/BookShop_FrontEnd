import axios from "axios"

export const mainUrl = "http://localhost:8080/api/v1"
export const loginClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/login", userData, { withCredentials: true })
    // Phải có Creadential thì nó mới gán được cookie gửi tử FE
}

export const registerClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/register", userData)
}