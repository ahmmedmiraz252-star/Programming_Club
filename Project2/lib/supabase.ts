
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://pjzwafazmigvtmkhgnad.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqendhZmF6bWlndnRta2hnbmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NDAzODEsImV4cCI6MjA4NTExNjM4MX0.c-gW3MPZaUcbI-SguC7LZ_oQLQsg4hBd8xaN4_FGwE0';

export const supabase = createClient(supabaseUrl, supabaseKey);
