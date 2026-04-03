// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lxljngtuvzlpnkkocxwx.supabase.co'
const SUPABASE_KEY = 'sb_publishable_5vgJVr6hSNtMB5iIOs3tQw_44QNeQ6M'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)