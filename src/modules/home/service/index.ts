import axiosInstance from "../../../api"

export const bestCourses = async ()=>{
    const response = await axiosInstance.get("api/best-buy-rate")
    return response
}

export const averageCourse = async ()=>{
    const response = await axiosInstance.get("api/home?cur=usd")
    return response?.data
}

export const CoursesOnBanks = async ()=>{
    const response = await axiosInstance.get("api/banks?cur=usd&sortBy=bestBuy&orderBy=DESC")
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
    console.error("Xatolik yuz berdi:", error);
    throw error;
  }
};
