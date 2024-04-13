import {
  TConversation,
  TFormattedConversation,
} from "@/src/data-fetching/api/conversations";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shadcn/ui/avatar";
import InfiniteScroll from "react-infinite-scroll-component";
import { format, formatDistance, intlFormatDistance } from "date-fns";

const InfiniteListConversations = ({
  query,
}: {
  query: {
    data: TFormattedConversation[];
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
      <div className="flex flex-col pt-2  gap-1 w-full ">
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

function ConversationItem({
  conversation,
}: {
  conversation: TFormattedConversation;
}) {
  return (
    <button
      key={conversation.id}
      className="p-2 text-sm  rounded flex gap-2 items-center flex-1  hover:bg-black/20"
    >
      <Avatar className="h-14 w-14">
        <AvatarImage
          src={conversation?.users?.[0]?.profilePicture?.url}
          className="object-cover"
        />
        <AvatarFallback className="text-primary">
          Profile Picture
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1 items-start">
        <span className="font-semibold">
          {conversation?.users?.[0]?.fullName}
        </span>
        <span className=" text-xs flex gap-2">
          {conversation?.messages?.[0]?.previewMessage}
          <span className="text-gray-400">
            {intlFormatDistance(
              conversation?.messages?.[0]?.createdAt,
              new Date(),
              {
                style: "narrow",
                numeric: "always",
              }
            )?.replace(" ago", "")}
          </span>
        </span>
      </div>
    </button>
  );
}
