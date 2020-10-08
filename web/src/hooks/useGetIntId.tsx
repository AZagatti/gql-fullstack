import { useRouter } from "next/router";

export const useGetIntId = () => {
  const router = useRouter();
  return typeof router.query.id === "string" ? +router.query.id : -1;
}