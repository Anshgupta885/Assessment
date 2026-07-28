// Vercel auto-detects files in the root api/ folder as serverless functions.
// This file is the single entry point for ALL /api/* requests.
import app from "../server/server.js";

export default app;
