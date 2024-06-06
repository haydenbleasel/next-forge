import { createBrowserClient as createBrowserClientRaw } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const createBrowserClient = () =>
  createBrowserClientRaw(supabaseUrl, supabaseAnonKey);
