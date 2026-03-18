import { createClient } from '@supabase/supabase-js';

// Environment variables are preferred, but we will hardcode for prototype speed as per context
const supabaseUrl = 'https://ulkqviinfvslafedaycx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJzdXBhYmFzZSIsInJlZiI6InVsa3F2aWluZnZzbGFmZWRheWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMDgxMjMsImV4cCI6MjA1Nzg4NDEyM30.K9v2wA8oO0r_4BqX1Qn7Q4X5pW-9lKk9sR1bZ-vIuq8';

export const supabase = createClient(supabaseUrl, supabaseKey);
