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
    return await instance.post( mainUrl + "/book/create-book", bookData)
}

export const updateBook = async (bookData) => {
    return await instance.put(mainUrl + "/book/update-book", bookData);
}

export const deleteBook = async (id) => {    
    return await instance.delete(mainUrl + "/book/delete-book", {
        params: {id}
    });
}