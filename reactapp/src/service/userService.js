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

export const getWishListForUser = async (userId) => {
    return await instance.get(mainUrl + "/wish-list/get-wish-list", {
        params: {userId}
    })
}
export const getABookFromWishList = async (userId, bookId) => {
    return await instance.get(mainUrl + "/wish-list/get-a-book-in-wish-list", {
        params: {userId: userId, bookId: bookId}
    })
}
export const addBookToWishList = async (userId, bookId) => {
    return await instance.post(mainUrl + "/wish-list/add-book-to-wish-list", {userId, bookId})
}

export const deleteBookOnWishList = async (query) => {
    return await instance.delete(mainUrl + "/wish-list/delete-book-in-wish-list", {
        params: query
    })
}


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
export const deleteUser = async (userId) => {
    return await instance.delete(mainUrl + "/user/delete-user", {params: {id: userId}})
}