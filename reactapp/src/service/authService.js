import axios from "axios"
import instance from "../setup/axiosCF"
export const mainUrl = "http://localhost:8080/api/v1"
export const loginClientService = async (userData) => {
    return await instance.post( mainUrl + "/auth/client/login", userData)
    // Phải có Creadential thì nó mới gán được cookie gửi tử FE
}

export const registerClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/client/register", userData)
}

export const loginAdminService = async (userData) => {
    return await instance.post( mainUrl + "/auth/admin/login", userData)
    // Phải có Creadential thì nó mới gán được cookie gửi tử FE
}