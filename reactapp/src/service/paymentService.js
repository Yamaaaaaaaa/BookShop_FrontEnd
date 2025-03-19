
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getAllPaymentMethod = async (query) => {
    return await instance.get( mainUrl + "/payment/get-all-payment", {
        params: query
    })
}

export const createPayment = async (data) => {
    return await instance.post( mainUrl + "/payment/create-payment", data)
}

export const updatePayment = async (data) => {
    return await instance.put( mainUrl + "/payment/update-payment", data)
}

export const deletePayment = async (id) => {
    return await instance.delete( mainUrl + "/payment/delete-payment", {
        params: {id}
    })
}
