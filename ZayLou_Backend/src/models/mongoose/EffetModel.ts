import mongoose from 'mongoose'

const effetSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  type: String,         // NFC, Zone, Case
}, { timestamps: true })

export const EffetModel = mongoose.model('Effet', effetSchema)
