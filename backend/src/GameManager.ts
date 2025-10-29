import { WebSocket } from "ws";
import { INIT_CHESS, MOVE } from "./messages";
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

      if (message.type === MOVE) {
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );

        if (game) {
          game.makeMove(socket, message.move);
        }
      }
    });
  }
}

export { GameManager };
