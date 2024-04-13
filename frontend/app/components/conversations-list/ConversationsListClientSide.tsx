"use client";
import {
  IConversationQueryOptions,
  useGetConversations,
} from "@/src/data-fetching/api/conversations";
import React from "react";
import InfiniteListConversations from "./InfiniteListConversations";

const ConversationsListClientSide = ({
  defaultParams,
}: {
  defaultParams: Partial<IConversationQueryOptions>;
}) => {
  const conversationsQuery = useGetConversations(defaultParams, {});

  return (
    <div className="flex flex-col">
      <InfiniteListConversations query={conversationsQuery} />
    </div>
  );
};

export default React.memo(ConversationsListClientSide);
