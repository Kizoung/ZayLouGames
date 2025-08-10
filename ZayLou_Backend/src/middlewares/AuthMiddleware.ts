import { Request,Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request{
    userId?: string

}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
  
    if (!token) {
      res.status(401).json({ 
        erreur: 'Vous devez vous connecter' 
      })
      return
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
      ;(req as AuthRequest).userId = decoded.id
      next()
    } catch (err) {
      res.status(403).json({ erreur: 'Token invalide' })
    }
  }