import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const user = await serverSupabaseUser(event);
    event.context.user = user;
  } catch (error) {
    event.context.user = null;
  }
});
