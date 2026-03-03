import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Minimal health check for the server since the app is 100% frontend
  app.get(api.health.get.path, (req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}
