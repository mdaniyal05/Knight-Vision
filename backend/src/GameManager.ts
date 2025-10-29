import { WebSocket } from "ws";
import { INIT_CHESS } from "./messages";
import { Game } from "./Game";

class GameManager {
  private games: Game[];
  private waitingPlayer: WebSocket | null;
  private players: WebSocket[];

  constructor() {
    this.games = [];
    this.players = [];
    this.waitingPlayer = null;
  }

  addPlayer(socket: WebSocket) {
    this.players.push(socket);
    this.addHandler(socket);
  }

  removePlayer(socket: WebSocket) {
    this.players = this.players.filter((player) => player !== socket);
  }

  private addHandler(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_CHESS) {
        if (this.waitingPlayer) {
          const game = new Game(this.waitingPlayer, socket);
          this.games.push(game);
          this.waitingPlayer = null;
        } else {
          this.waitingPlayer = socket;
        }
      }
    });
  }
}

export { GameManager };
