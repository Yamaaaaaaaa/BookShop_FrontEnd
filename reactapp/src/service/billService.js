import instance from "../setup/axiosCF"

export const mainUrl = "http://localhost:8080/api/v1"
// Delete thì ko có body đâu, nên ko cần truyền: url, body, params (có post với put thế thôi)
export const deleteOwnBill = async (userId, billId) => {
    return await instance.delete(mainUrl + "/bill/delete-own-bill", {
        params: {userId, billId}
    });
}


// Admin:
export const getAllBill = async (userId) => {
    return await instance.get(mainUrl + "/bill/get-all-bill");
}
export const getBillById = async (billId) => {
    return await instance.get(mainUrl + "/bill/get-a-bill", {params: {billId}});
}
export const deleteBill = async (billId) => {
    return await instance.delete(mainUrl + "/bill/delete-bill", {
        params: {billId}
    });
}
export const updateBill = async (billId, state) => {
    return await instance.put(mainUrl + "/bill/update-bill", 
        {
            state, billId
        }
    );
}
