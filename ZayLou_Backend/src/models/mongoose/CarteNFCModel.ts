import mongoose from "mongoose";

const carteNFCSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true},
    type: { type: String, required: true,}, //genre est ce sur joueur ou objet
    associeA: {type: mongoose.Schema.Types.ObjectId, refPath:"type"} // lien dynamique
},{timestamps: true

});
export const CarteNFCModel = mongoose.model("CarteNFC", carteNFCSchema);