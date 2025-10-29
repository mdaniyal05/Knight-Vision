import { WebSocket } from "ws";

class Game {
  private player1: WebSocket;
  private player2: WebSocket;
  private playerMoves: string[];
  private chessBoard: string;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.playerMoves = [];
    this.chessBoard = "";
    this.startTime = new Date();
  }
}

export { Game };
