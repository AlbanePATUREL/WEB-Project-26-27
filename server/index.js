// =========================================================
// index.js — API Express du WOOHP Store
// React (Netlify) ──▶ cette API (Render) ──▶ Supabase
// =========================================================
import { supabase } from './supabaseClient.js' // charge aussi le .env
import express from 'express'
import cors from 'cors'
import { validerGadget } from './validation.js'

const app = express()
const PORT = process.env.PORT || 3000

// --- Middlewares ---
app.use(express.json()) // lit le JSON envoyé par le front dans req.body
// En prod, on n'autorise que l'URL Netlify ; en local (FRONT_URL vide) : toutes les origines
app.use(cors({ origin: process.env.FRONT_URL || '*' }))

// Petite fonction pour renvoyer une erreur Supabase en 500
function erreurServeur(res, error) {
  console.error('Erreur Supabase :', error)
  return res.status(500).json({ erreur: `Erreur de la base de données : ${error.message}` })
}

// Un id doit être un entier positif, sinon il ne peut pas exister
function lireId(req) {
  const id = Number(req.params.id)
  return Number.isInteger(id) && id > 0 ? id : null
}

// --- GET / : route de santé (pour réveiller Render avant la démo) ---
app.get('/', (req, res) => {
  res.json({ message: '🕵️‍♀️ API du WOOHP Store opérationnelle', date: new Date().toISOString() })
})

// --- GET /gadgets : liste complète triée par id ---
app.get('/gadgets', async (req, res) => {
  const { data, error } = await supabase.from('gadgets').select('*').order('id', { ascending: true })
  if (error) return erreurServeur(res, error)
  res.status(200).json(data)
})

// --- POST /gadgets : création ---
app.post('/gadgets', async (req, res) => {
  const { erreur, donnees } = validerGadget(req.body)
  if (erreur) return res.status(400).json({ erreur })

  const { data, error } = await supabase.from('gadgets').insert(donnees).select().single()
  if (error) return erreurServeur(res, error)
  res.status(201).json(data)
})

// --- PUT /gadgets/:id : modification (partielle autorisée) ---
app.put('/gadgets/:id', async (req, res) => {
  const id = lireId(req)
  if (!id) return res.status(404).json({ erreur: `Aucun gadget avec l'id ${req.params.id}.` })

  const { erreur, donnees } = validerGadget(req.body, { partiel: true })
  if (erreur) return res.status(400).json({ erreur })

  // .select() est indispensable : sans lui, Supabase ne renvoie aucune ligne
  // et on ne peut pas savoir si l'id existait (voir « bug résolu » dans le README)
  const { data, error } = await supabase.from('gadgets').update(donnees).eq('id', id).select()
  if (error) return erreurServeur(res, error)
  if (data.length === 0) return res.status(404).json({ erreur: `Aucun gadget avec l'id ${id}.` })

  res.status(200).json(data[0])
})

// --- DELETE /gadgets/:id : suppression ---
app.delete('/gadgets/:id', async (req, res) => {
  const id = lireId(req)
  if (!id) return res.status(404).json({ erreur: `Aucun gadget avec l'id ${req.params.id}.` })

  const { data, error } = await supabase.from('gadgets').delete().eq('id', id).select()
  if (error) return erreurServeur(res, error)
  if (data.length === 0) return res.status(404).json({ erreur: `Aucun gadget avec l'id ${id}.` })

  res.status(204).end() // 204 = succès, sans corps
})

// --- Route inconnue ---
app.use((req, res) => {
  res.status(404).json({ erreur: 'Route introuvable.' })
})

// --- JSON mal formé envoyé par le client ---
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erreur: 'JSON invalide dans le corps de la requête.' })
  }
  console.error(err)
  res.status(500).json({ erreur: 'Erreur interne du serveur.' })
})

app.listen(PORT, () => {
  console.log(`🚀 API WOOHP Store sur http://localhost:${PORT}`)
})
