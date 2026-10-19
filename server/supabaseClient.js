// =========================================================
// supabaseClient.js — LE SEUL endroit où le serveur se connecte à Supabase
// =========================================================
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Charge les variables de server/.env dans process.env
dotenv.config({ quiet: true })

const url = process.env.SUPABASE_URL
const cleSecrete = process.env.SUPABASE_SECRET_KEY

if (!url || !cleSecrete) {
  console.error('❌ SUPABASE_URL ou SUPABASE_SECRET_KEY manquant dans server/.env')
  process.exit(1)
}

// La secret key (sb_secret_...) contourne la RLS : elle ne doit exister QUE côté serveur.
export const supabase = createClient(url, cleSecrete, {
  auth: { persistSession: false },
})
