import type {
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";
import { createServerClient } from "supabase-auth-helpers-qwik";
import type { Database } from "~/types/supabase";

export const createDbClient = (
  requestEv:
    | RequestEventLoader<QwikCityPlatform>
    | RequestEventAction<QwikCityPlatform>
) => {
  return createServerClient<Database>(
    requestEv.env.get("SUPABASE_URL")!,
    requestEv.env.get("SUPABASE_SECRET")!,
    requestEv
  );
};
