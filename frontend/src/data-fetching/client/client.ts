import { IQueryResultInfo } from "@/src/types";
import { API_ENDPOINTS } from "./api_endpoints";
import { HttpClient } from "./http-client";
import { IConversationQueryOptions, TConversation } from "../api/conversations";
import { LoginCredentialsType } from "@/app/login/validators";
import { AuthResponse } from "../api/auth";
import { UseMutationResult } from "@tanstack/react-query";

class Client {
  conversations = {
    all: (params: Partial<IConversationQueryOptions>) =>
      HttpClient.get<IQueryResultInfo<TConversation>>(
        API_ENDPOINTS.CONVERSATIONS,
        params
      ),
  };

  auth = {
    login: (credentials: LoginCredentialsType) =>
      HttpClient.post<AuthResponse>(
        API_ENDPOINTS.USERS_LOGIN,
        credentials
      ),
  };
}

const client = new Client();

export default client;
