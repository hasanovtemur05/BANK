import { useQuery } from "@tanstack/react-query";
import { averageCourse, banksLists, chart  } from "../service";


// ===================================  GET ALL BANKS  ======================================
export function useGetAverageCourse (){
    const {data} = useQuery({
        queryFn: ()=> averageCourse (),
        queryKey: ["course"]
    }) 
    return{
        data
    }
}


// ===================================  GET BANKS LISTS  ======================================
export function useGetBanksLists (){
    const {data} = useQuery({
        queryFn: ()=> banksLists (),
        queryKey: ["banksLists"]
    }) 
    return{
        data
    }
}


// ===================================  GET CHART  ======================================
export function useGetChart (){
    const {data} = useQuery({
        queryFn: ()=> chart (),
        queryKey: ["chart"]
    }) 
    return{
        data
    }
}