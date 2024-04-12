import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  IQueryResultInfo,
  InfinitePaginatorInfo,
  QueryOptions,
} from "../../types";
import client from "../client/client";
import { API_ENDPOINTS } from "../client/api_endpoints";

export interface IConversationQueryOptions extends QueryOptions {
  name: string;
}

export type TConversation = {
  id: number;
  content: string;
};

export function useGetConversations(
  params?: Partial<IConversationQueryOptions>,
  options?: Partial<
    UseInfiniteQueryOptions<
      IQueryResultInfo<TConversation>,
      unknown,
      InfinitePaginatorInfo<TConversation>
    >
  >
) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<
    IQueryResultInfo<TConversation>,
    unknown,
    InfinitePaginatorInfo<TConversation>
  >({
    queryKey: [API_ENDPOINTS.CONVERSATIONS, params],
    queryFn: ({ queryKey, pageParam = 1 }) => {
      const obj = Object.assign(
        {},
        queryKey[1],
        pageParam
      ) as Partial<IConversationQueryOptions>;

      return client.conversations.all(obj);
    },
    getNextPageParam: ({ meta }) => {
      const currentPage = meta?.currentPage;
      const totalPages = meta?.totalPages;

      return currentPage < totalPages ? { page: currentPage + 1 } : undefined;
    },
    initialPageParam: options?.initialPageParam ?? 1,

    ...options,
  });

  function handleLoadMore() {
    fetchNextPage();
  }


  console.log('%csrc\data-fetching\api\conversations.ts:71 data', 'color: red;', data);
  return {
    data: data?.pages?.flatMap((page) => page) ?? [],
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}
