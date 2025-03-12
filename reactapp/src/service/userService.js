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

export const addBookToCartForUser = async (bookId, userId,quantity) => {
    return await instance.post(mainUrl + "/user/add-to-cart", {}, { // Body rỗng (Tk Put nó nhận đó)
        params: { bookId, userId ,quantity}
    });
};

export const createBillForUser = async (billData) => {
    return await instance.post(mainUrl + "/bill/create-bill", billData);
};

export const getAllBillForUser = async (userId) => {
    return await instance.get(mainUrl + "/bill/get-own-bill", {
        params: {userId: userId}
    });
}

export const getPaymentMethod = async () => {
    return await instance.get(mainUrl + "/payment/get-paymentMethod");
}



export const getAllUser = async () => {
    return await instance.get(mainUrl + "/user/get-all-user")
}