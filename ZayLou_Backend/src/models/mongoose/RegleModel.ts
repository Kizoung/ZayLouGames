import mongoose from "mongoose";

const regleSchema = new mongoose.Schema({
  description: { type: String, required: true },
  conditions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Condition" }],
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action" }]
}, { timestamps: true });

export const RegleModel = mongoose.model("Regle", regleSchema);
