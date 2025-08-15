import createClient from "openapi-fetch";

import type { paths } from "@/lib/backend/apiV1/schema";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const client = createClient<paths>({
  baseUrl: NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export default client;

export const apiFetch = (url: string, options?: RequestInit) => {
  options = options || {};

  options.credentials = "include";

  if (options?.body) {
    const headers = new Headers(options?.headers || {});

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json; charset=utf-8");
    }

    options.headers = headers;
  }

  return fetch(`${NEXT_PUBLIC_API_BASE_URL}${url}`, options).then((res) => {
    if (!res.ok) {
      return res.json().then((errorData) => {
        throw errorData;
      });
    }

    return res.json();
  });
};
