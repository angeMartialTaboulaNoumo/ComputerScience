import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dhnodfhyzydcjkxmpidm.supabase.co" //process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = "sb_publishable_BxZ19vjjqCixXmW1srG6aQ_zxowPQvp" // process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
