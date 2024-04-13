import { API_ENDPOINTS } from "@/src/data-fetching/client/api_endpoints";
import useServerFetching from "@/src/hooks/useServerSideFetching";
import { QueryKey } from "@tanstack/react-query";
import ConversationsListClientSide from "./ConversationsListClientSide";
import { getFullApiPath } from "@/src/utils/getFullApiPath";
import { convertObjectToStringRecord } from "@/src/utils/convertObjectToStringRecord";

async function getConversations({ queryKey }: { queryKey: QueryKey }) {
  "use server";

  const url = new URL(getFullApiPath(API_ENDPOINTS.CONVERSATIONS));
  url.search = new URLSearchParams(
    convertObjectToStringRecord(queryKey[1] as object)
  ).toString();

  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ConversationsList = async () => {
  const defaultParams = {  };

  const { ServerComponent } = await useServerFetching({
    endpoint: API_ENDPOINTS.CONVERSATIONS,
    queryFn: getConversations,
    defaultParams: defaultParams,
  });

  return (
    <ServerComponent>
      <ConversationsListClientSide defaultParams={defaultParams} />
    </ServerComponent>
  );
};

export default ConversationsList;
