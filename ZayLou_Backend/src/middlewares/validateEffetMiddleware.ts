import { Request,Response, NextFunction } from "express";

export function validateEffetMiddleware(req: Request, res: Response, next: NextFunction){
    const effet = req.body;

    if (!effet.nom || !effet.type || !effet.trigger || !effet.actions || !effet.conditions){
        return res.status(400).json({error: "Effet invalide : champs manquants."});
    }

    //  vérifier type et durée
    if (!["bonus","malus"].includes(effet.type)){
        return res.status(400).json({error: "Type d'effet invalide"});
    }

    if(typeof effet.durée !=="number" || effet.durée <= 0){
        return res.status(400).json({error :"Durée invalide"});
    }

    next()

    
}