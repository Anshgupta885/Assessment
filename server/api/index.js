// Vercel serverless entry point — imports and re-exports the Express app.
// Vercel treats this file as the handler for all /api/* requests.
import app from "../server.js";

export default app;
