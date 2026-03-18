import { createClient } from '@supabase/supabase-js';

// Environment variables are preferred, but we will hardcode for prototype speed as per context
const supabaseUrl = 'https://ulkqviinfvslafedaycx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsa3F2aWluZnZzbGFmZWRheWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTEzODIsImV4cCI6MjA4OTM4NzM4Mn0.HefK4-tepT7PRh8HZIGeC4Ng6_s54VXVDoSLEyC_Suc';

export const supabase = createClient(supabaseUrl, supabaseKey);
