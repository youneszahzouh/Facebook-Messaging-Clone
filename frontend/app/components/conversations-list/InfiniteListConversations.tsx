import { TConversation } from "@/src/data-fetching/api/conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shadcn/ui/avatar";
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
  return (
    <InfiniteScroll
      dataLength={query.data?.length}
      next={query.loadMore}
      hasMore={query.hasMore}
      loader={
        <div className="flex items-center justify-center h-48">Loading ...</div>
      }
      className="flex text-primary-foreground flex-col  gap-2 pb-4 items-center"
    >
      <div className="flex flex-col pt-2  gap-4 w-full ">
        {query?.data?.map((conversation) => {
          return (
            <ConversationItem
              conversation={conversation}
              key={conversation.id}
            />
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteListConversations;

function ConversationItem({ conversation }: { conversation: TConversation }) {
  return (
    <div
      key={conversation.id}
      className="p-2 text-sm  rounded flex gap-4 items-center flex-1 "
    >
      <Avatar>
        <AvatarImage
          src={
            process.env.NEXT_PUBLIC_BACKEND_API +
            "/" +
            conversation?.users?.[0]?.user?.profilePicture.url
          }
          className="object-cover"
        />
        <AvatarFallback className="text-primary">
          Profile Picture
        </AvatarFallback>
      </Avatar>

      {conversation?.users?.[0]?.user?.firstName +
        conversation?.users?.[0]?.user?.lastName}
    </div>
  );
}
