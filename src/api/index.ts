import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://api.onmap.uz"
})

export default axiosInstance