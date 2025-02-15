import { useQuery } from "@tanstack/react-query";
import {  bestCourses, averageCourse, getCoursesOnBanks } from "../service";

export function useBestCourses(){
    const { data } = useQuery({
        queryFn: ()  => bestCourses(),  
        queryKey: ["bestCourses"],     
    });

    return {
       data
    };
}

export function useAverageCourse(){
    const { data } = useQuery({
        queryFn: ()  => averageCourse(),  
        queryKey: ["averageCourse"],     
    });
   

    return {
        data
    };
}




export function useCoursesOnBanks2(currency = "usd", sortBy = "bestBuy", orderBy = "DESC") {
  return useQuery({
    queryKey: ["banks", currency, sortBy, orderBy],
    queryFn: () => getCoursesOnBanks(currency, sortBy, orderBy),
  });
}
