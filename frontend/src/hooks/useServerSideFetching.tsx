import {
  HydrationBoundary,
  QueryClient,
  QueryKey,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";

type ServerTableProps<T> = {
  endpoint: string;
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => void;
  defaultParams: Partial<T>;
};

const useServerFetching = async <T,>({
  endpoint,
  queryFn,
  defaultParams,
}: ServerTableProps<T>) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [endpoint, defaultParams],
    queryFn: queryFn,
    initialPageParam: 1,
  });

  return {
    ServerComponent: ({ children }: { children: ReactNode }) => (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    ),
  };
};

export default useServerFetching;
