import axios from "axios"
import { mainUrl } from "./authService"
import instance from "../setup/axiosCF"

export const getBooks = async (query) => {
    return await axios.get( mainUrl + "/book/get-all-book", {
        params: query
    })
}

export const getBookData = async (query) => {
    return await instance.get( mainUrl + "/book/get-all-book", {
        params: query
    })
}

export const getABooks = async (query) => {
    return await instance.get( mainUrl + "/book/get-a-book", {
        params: query
    })
}

export const createBook = async (bookData) => {
    const formData = new FormData();
    formData.append("id", bookData.id);
    formData.append("name", bookData.name);
    formData.append("description", bookData.description);
    formData.append("originalCost", bookData.originalCost);
    formData.append("sale", bookData.sale);
    formData.append("stock", bookData.stock);
    formData.append("publisherId", bookData.publisherId);
    formData.append("authorId", bookData.authorId);
    formData.append("state", bookData.state);
    formData.append("publishedDate", bookData.publishedDate);
    formData.append("seriesId", bookData.seriesId);
    formData.append("image", bookData.image);
    return await instance.post(mainUrl + "/book/create-book", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const updateBook = async (bookData) => {
    // const formData = new FormData();
    // formData.append("id", bookData.id);
    // formData.append("name", bookData.name);
    // formData.append("description", bookData.description);
    // formData.append("originalCost", bookData.originalCost);
    // formData.append("sale", bookData.sale);
    // formData.append("stock", bookData.stock);
    // formData.append("publisherId", bookData.publisherId);
    // formData.append("authorId", bookData.authorId);
    // formData.append("state", bookData.state);
    // formData.append("publishedDate", bookData.publishedDate);
    // formData.append("seriesId", bookData.seriesId);
    // if(bookData.image) formData.append("image", bookData.image);

    // return await instance.put(mainUrl + "/book/update-book", formData, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // });

    return await instance.put(mainUrl + "/book/update-book", bookData);
}

export const deleteBook = async (id) => {    
    return await instance.delete(mainUrl + "/book/delete-book", {
        params: {id}
    });
}

export const updateBooksPrices = async (data) => {
    console.log(data);
}


export const deleteBulkBooks = async (data) => {
    console.log(data);
}