import axiosInstance from "../../../api"
import { ConverterType } from "../types"

export const bestCourses = async ()=>{
    const response = await axiosInstance.get("api/best-buy-rate")
    return response
}

export const averageCourse = async ()=>{
    const response = await axiosInstance.get("api/home?cur=usd")
    return response?.data
}

export const getCoursesOnBanks = async (
  currency: string = "usd",
  sortBy: string = "bestBuy",
  orderBy: string = "DESC"
) => {
  try {
    const response = await axiosInstance.get(
      `/api/banks?cur=${currency}&sortBy=${sortBy}&orderBy=${orderBy}`
    );
    return response?.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};



export const createConverter = async (data: ConverterType) => {
  const response = await axiosInstance.post("api/converter", data); 
  return response?.data;
};

export const getPredictions = async ()=>{
  const response = await axiosInstance.get("api/predictions")
  return response?.data
}

export const getChart = async (code:string, count:number) => {
  const response = await axiosInstance.get(`/api/chart?code=${code}&count=${count}`);
  return response?.data;
};