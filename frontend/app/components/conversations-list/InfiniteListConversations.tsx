import { TConversation } from "@/src/data-fetching/api/conversations";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteListConversations = ({
  query,
}: {
  query: {
    data: TConversation[];
    isLoading: boolean;
    error: unknown;
    isFetching: boolean;
    isLoadingMore: boolean;
    loadMore: () => void;
    hasMore: boolean;
  };
}) => {
  console.log(
    "%cappcomponentsconversations-listInfiniteListConversations.tsx:18 data",
    "color: white; background-color: red;",
    query
  );
  return (
    <InfiniteScroll
      dataLength={query.data?.length}
      next={query.loadMore}
      hasMore={query.hasMore}
      loader={
        <div className="flex items-center justify-center h-48">Loading ...</div>
      }
      className="flex flex-col gap-2 pb-4 items-center"
    >
      <div className="grid pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {/* {query?.data?.map((conversation) => (
          <div key={conversation.id}> {conversation?.content} </div>
        ))} */}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteListConversations;
