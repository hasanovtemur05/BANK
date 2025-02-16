import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConverter } from "../service";
import { ConverterType } from "../types";


export function useCreateConverter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ConverterType) => createConverter(data), 
    onSuccess: (response) => {
      console.log(response.message);
      queryClient.invalidateQueries({ queryKey: ["converter"] }); 
    },
    onError: (error) => {
      console.error("error", error);
    },
  });
}
