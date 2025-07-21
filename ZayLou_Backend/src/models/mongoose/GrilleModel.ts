import mongoose from "mongoose";
import { CaseModel } from "./CaseModel";

const grilleSchema = new mongoose.Schema({
    largeur: { type:Number, required: true},
    hauteur: { type:Number, required: true},
    tailleCase: { type:Number, required: true},
    couches: [[{ type: mongoose.Schema.Types.ObjectId, ref: "Case"}]]
},{timestamps: true
});
export const GrilleModel = mongoose.model("Grille", grilleSchema);