import { IQueryResultInfo } from "@/src/types";
import { API_ENDPOINTS } from "./api_endpoints";
import { HttpClient } from "./http-client";
import { IConversationQueryOptions, TConversation } from "../api/conversations";

class Client {
  conversations = {
    all: (params: Partial<IConversationQueryOptions>) =>
      HttpClient.get<IQueryResultInfo<TConversation>>(
        API_ENDPOINTS.CONVERSATIONS,
        params
      ),
  };
}

const client = new Client();

export default client;
