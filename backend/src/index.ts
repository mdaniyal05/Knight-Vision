import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({ port: 8080 });

const gameManger = new GameManager();

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  gameManger.addPlayer(ws);

  ws.on("disconnect", () => gameManger.removePlayer(ws));
});
