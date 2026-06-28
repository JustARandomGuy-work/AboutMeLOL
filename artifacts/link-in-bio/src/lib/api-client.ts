import { setAuthTokenGetter } from "@workspace/api-client-react";
import { supabase } from "./supabase";

// Set up the API client to automatically attach the Supabase token
setAuthTokenGetter(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
});
