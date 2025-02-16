/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { bestCourses, averageCourse, getCoursesOnBanks, getPredictions, getChart } from "../service";

// ================================   GET BESTCOURSES  =========================================
export function useBestCourses() {
  const { data } = useQuery({
    queryFn: () => bestCourses(),
    queryKey: ["bestCourses"],
  });

  return {
    data,
  };
}

// ================================   GET AVERAGECOURSE  =========================================

export function useAverageCourse() {
  const { data } = useQuery({
    queryFn: () => averageCourse(),
    queryKey: ["averageCourse"],
  });

  return {
    data,
  };
}

// ================================   GET COURSESONBANKS  =========================================

export function useCoursesOnBanks2(
  currency = "usd",
  sortBy = "bestBuy",
  orderBy = "DESC"
) {
  return useQuery({
    queryKey: ["banks", currency, sortBy, orderBy],
    queryFn: () => getCoursesOnBanks(currency, sortBy, orderBy),
  });
}

// ================================   GET PREDICTION  =========================================

export function usepredictions() {
    const { data } = useQuery({
      queryFn: () => getPredictions(),
      queryKey: ["prediction"],
    });
  
    return {
      data,
    };
  }


  // ================================   GET CHART  =========================================

  export function useGetChart(count: number, code: string) {
    return useQuery({
      queryKey: ["chart", code, count],
      queryFn: () => getChart(code, count), 
    });
  }
  
