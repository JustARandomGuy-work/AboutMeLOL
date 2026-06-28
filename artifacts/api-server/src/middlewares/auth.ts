import { type Request, type Response, type NextFunction } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { logger } from "../lib/logger";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Missing authorization header" });
      return;
    }

    const token = authHeader.slice(7);

    if (supabaseJwtSecret) {
      const secret = new TextEncoder().encode(supabaseJwtSecret);
      const { payload } = await jwtVerify(token, secret);
      req.userId = payload.sub as string;
      req.userEmail = payload.email as string;
    } else if (supabaseUrl) {
      const jwks = createRemoteJWKSet(
        new URL(`${supabaseUrl}/auth/v1/.well-known/jwks.json`)
      );
      const { payload } = await jwtVerify(token, jwks);
      req.userId = payload.sub as string;
      req.userEmail = payload.email as string;
    } else {
      res.status(500).json({ error: "Auth not configured" });
      return;
    }

    next();
  } catch (err) {
    logger.warn({ err }, "Auth verification failed");
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
