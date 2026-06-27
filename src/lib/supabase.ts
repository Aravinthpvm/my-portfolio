import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createMockClient = () => {
  const dummyPromise = Promise.resolve({ data: null, error: null });
  const mockChannel = {
    on: () => mockChannel,
    subscribe: () => mockChannel,
  };
  return {
    from: () => ({
      select: () => ({
        order: () => ({
          order: () => dummyPromise,
        }),
      }),
      insert: () => ({
        select: () => ({
          single: () => dummyPromise,
        }),
      }),
      update: () => ({
        eq: () => dummyPromise,
      }),
    }),
    storage: {
      from: () => ({
        upload: () => dummyPromise,
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
    channel: () => mockChannel,
    removeChannel: () => {},
    auth: {
      signInWithPassword: () => dummyPromise,
      signOut: () => dummyPromise,
      getSession: () => dummyPromise,
    },
  } as any;
};

export const supabase = supabaseUrl && supabaseAnonKey
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();