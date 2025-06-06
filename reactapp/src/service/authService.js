import axios from "axios"
import instance from "../setup/axiosCF"

export const mainUrl =  process.env.REACT_APP_API_ROUTE
console.log("API_ROUTE", mainUrl);

export const loginClientService = async (userData) => {
    return await instance.post( mainUrl + "/auth/client/login", userData)
    // Phải có Creadential thì nó mới gán được cookie gửi tử FE
}

export const registerClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/client/register", userData)
}
export const addUserClientService = async (userData) => {
    return await axios.post( mainUrl + "/auth/admin/add-user", userData)
}
export const loginAdminService = async (userData) => {
    return await instance.post( mainUrl + "/auth/admin/login", userData)
    // Phải có Creadential thì nó mới gán được cookie gửi tử FE
}
export const updateUserClientService = async (userData) => {
    return await instance.put(mainUrl + "/auth/update-user", userData)
}
export const getAllGroup = async (userData) => {
    return await instance.get(mainUrl + "/group/get-all-group", userData)
}
