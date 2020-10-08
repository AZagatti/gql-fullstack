import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const id = useGetIntId()

  return usePostQuery({
    pause: id === -1,
    variables: { id },
  });
};
