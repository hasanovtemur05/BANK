import axiosInstance from "../../../api"

export const averageCourse = async ()=>{
    const response = await axiosInstance.get("api/home?cur=usd&current_date=10.02.2025")
    return response.data
}

export const banksLists = async ()=>{
    const response = await axiosInstance.get("api/sorted-banks?cur=usd&sortBy=ALL&orderBy=ASC&take=all&lang=ru&current_date=13.02.2025")
    return response.data
}

export const chart = async ()=>{
    const response = await axiosInstance.get("api/chart?code=usd&count=31&date=13.02.2025")
    return response.data
}


