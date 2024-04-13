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
import { addApiUrlAsPrefix, concatenateStrings } from "@/src/utils";
import Cookies from "js-cookie";

export interface IConversationQueryOptions extends QueryOptions {
  name: string;
}

export type TConversation = {
  id: number;
  users: Array<{
    user: {
      firstName: string;
      lastName: string;
      id: number;
      profilePicture: TFile;
    };
  }>;
  messages: TConversationMessage[];
};

export type TFormattedConversation = {
  id: number;
  users: Array<{
    firstName: string;
    lastName: string;
    fullName: string;
    id: number;
    profilePicture: {
      mimetype: string;
      name: string;
      size: number;
      url: string;
    };
  }>;
  messages: Array<{
    id: string;
    content: string;
    previewMessage: string;
    createdAt: string;
    updatedAt: true;
  }>;
};

export type TConversationMessage = {
  content: string;
  senderId: number;
  id: string;
  createdAt: string;
  updatedAt: true;

  files: TFile[];
};

export type TFile = {
  createdAt?: string | Date;
  mimetype: string;
  name: string;
  size: number;
  url: string;
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
      const lastPage = meta?.lastPage;

      return currentPage < lastPage ? { page: currentPage + 1 } : undefined;
    },
    initialPageParam: options?.initialPageParam ?? 1,

    ...options,
  });

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    data:
      data?.pages?.flatMap((page) => conversationsTransformer(page.data)) ?? [],
    isLoading,
    error,
    isFetching,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage),
  };
}

const conversationsTransformer = (
  data: TConversation[]
): TFormattedConversation[] => {
  return data.map((conversation) => {
    const formattedData = {
      id: conversation.id,
      users: conversation.users.map((user) => {
        const fullName = concatenateStrings(
          user?.user?.firstName,
          user?.user?.lastName
        );
        return {
          ...user.user,
          fullName,
          profilePicture: {
            ...user.user?.profilePicture,
            url: user.user?.profilePicture?.url
              ? addApiUrlAsPrefix(user.user?.profilePicture?.url)
              : `https://phantom-marca.unidadeditorial.es/72805d5a6a521774e2a199af5b1b90c3/crop/0x0/1916x1078/resize/828/f/jpg/assets/multimedia/imagenes/2022/04/07/16493398189245.jpg`,
          },
        };
      }),

      messages: conversation.messages.map((message) => {
        const sentByMe = message.senderId?.toString() == Cookies.get("userId");

        const previewMessage = sentByMe
          ? concatenateStrings("You:", message.content)
          : message.content;

        const formattedMessage = {
          id: message.id,
          content: message.content,
          previewMessage,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        };

        return formattedMessage;
      }),
    };
    return formattedData;
  });
};
