import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
    x: {type: Number, required: true },
    y: {type: Number, required: true},
    type: {type: String, enum:["mur","vide","spawn","objectif","special"], required: true},
    effets: [{type: mongoose.Schema.Types.ObjectId, ref: "Effet"}]
},{ _id: false});
export const CaseModel = mongoose.model("Case", caseSchema);