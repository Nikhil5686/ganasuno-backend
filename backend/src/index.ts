import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { registerRoutes } from "./routes/index.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://ganasuno-kappa.vercel.app",
        "https://www.ganasuno.studio",
        "https://ganasuno.studio",
        "http://localhost:3000",
        "http://192.168.1.7:3000",
        "https://localhost",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "GanaSuno API",
  });
});

registerRoutes(app);

const server = createServer(app);

const wss = new WebSocketServer({
  server,
});

function broadcastOnlineCount(): void {
  const count = wss.clients.size;

  const message = JSON.stringify({
    type: "online-count",
    count,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on("connection", (socket) => {
  broadcastOnlineCount();

  socket.on("close", () => {
    broadcastOnlineCount();
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`GanaSuno backend running on http://localhost:${PORT}`);
});
