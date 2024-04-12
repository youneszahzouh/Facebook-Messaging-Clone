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

  console.log(
    "%cappcomponentsconversations-listConversationsListClientSide.tsx:17 conversationsQuery",
    "color: #26bfa5;",
    conversationsQuery
  );
  return (
    <div className="flex flex-col">
      <div className="flex-1 flex-grow  flex-wrap flex relative">
        <div className="font-bold text-center flex-1 flex items-center p-4 flex-col bg-gray-100">
          <InfiniteListConversations query={conversationsQuery} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConversationsListClientSide);
