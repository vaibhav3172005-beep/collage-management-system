import { createClient } from '@supabase/supabase-js';

// Environment variables are preferred, but we will hardcode for prototype speed as per context
const supabaseUrl = 'https://ulkqviinfvslafedaycx.supabase.co';
const supabaseKey = 'sb_publishable_St64C5y7BpMuL9o9KoQ8LA_AEFu6Jna';

export const supabase = createClient(supabaseUrl, supabaseKey);
