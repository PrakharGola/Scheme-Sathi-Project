import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { rateLimiter } from "./middleware/rateLimiter";

import { authRouter } from "./routes/auth.routes";
import { schemesRouter } from "./routes/schemes.routes";
import { eligibilityRouter } from "./routes/eligibility.routes";
import { chatRouter } from "./routes/chat.routes";
import { adminRouter } from "./routes/admin.routes";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: [env.CORS_ORIGIN, "http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRouter);
app.use("/api/schemes", schemesRouter);
app.use("/api/eligibility", eligibilityRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Backend listening on port ${env.PORT}`);
});
