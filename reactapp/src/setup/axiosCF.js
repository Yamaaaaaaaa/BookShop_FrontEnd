import axios from "axios";
import { toast } from 'react-toastify';


// Khai báo 1 instance (1 object của axios)
const instance = axios.create({
    baseURL: "http://localhost:8081"
});

// Cấu hình header cho mỗi reaquest đính kèm Bearer vào header
// instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`


// set Global mặc định cho tất cả các phương thức axios đều có thể trao đổi dữ liệu (Giúp bên server express có thể gửi cookie):
instance.defaults.withCredentials = true


// Interceptor
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
        // => Ta có thể config CORS ở đây (nếu ko config thì nó sẽ nhảy sang catch)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// // Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx  cause this function to trigger
        // (Mấy cái 2xx thì nó là cái phản hồi res, mà kiểu nó thành công ấy VD 200 OKE)
        // Ngoài thì sang catch


    // Do something with response data
        
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    // Xử lý một số lỗi (bao gồm những req trả về status khác khoảng 200)
    const status = error && error.response && error.response.status || 500 
    console.log("Status Warning: ", status);
    
    switch (status) {
        case 401:
            toast.error("Unauthorized the user, Please login,...");
            break;
        case 403:
            toast.error("Forbidden: You don’t have permission.");
            break;
        case 404:
            toast.error("Not found: The requested resource does not exist.");
            break;
        case 500:
            toast.error("Server error, please try again later.");
            break;
        default:
            toast.error("An unexpected error occurred.");
    }
    // return Promise.reject(error);
    return new Promise(() => {}); // Trả về một Promise pending để tránh throw error
});

export default instance