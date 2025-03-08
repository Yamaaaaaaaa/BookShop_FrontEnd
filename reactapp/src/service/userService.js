import instance from "../setup/axiosCF"

export const mainUrl = "http://localhost:8080/api/v1"
export const getCartForUser = async (userId) => {
    return await instance.get(mainUrl + "/user/get-cart", {
        params: {userId}
    })
}

export const updateCartForUser = async (cartID, action) => {
    return await instance.put(mainUrl + "/user/update-cart", {}, { // Body rỗng (Tk Put nó nhận đó)
        params: { cartID, action }
    });
};
