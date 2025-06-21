import { Database } from '@/lib/supabase/type';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_BAAS_URL;
const supabaseKey = process.env.NEXT_PUBLIC_BAAS_API_KEY;
if (!supabaseUrl) {
  throw new Error('Baas URL is not defined');
}
if (!supabaseKey) {
  throw new Error('Baas API Key is not defined');
}
export const instanceBaaS = createClient<Database>(supabaseUrl, supabaseKey);

export default instanceBaaS;
