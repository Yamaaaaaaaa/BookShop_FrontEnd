import instance from "../setup/axiosCF"

export const mainUrl = "http://localhost:8080/api/v1"
export const getCartforUser = async (userId) => {
    return await instance.get(mainUrl + "/user/get-cart", {
        params: {userId}
    })
}
