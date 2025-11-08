import { useEffect, useState } from "react";
import Button from "../components/Button";
import useSocket from "../hooks/useSocket";
import { Chess } from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log(message);

      switch (message.type) {
        case INIT_GAME: {
          setChess(new Chess());
          console.log("GAME INITIALIZED");
          break;
        }
        case MOVE: {
          const move = message.payload;
          chess.move(move);
          console.log("Move made", move);
          break;
        }
        case GAME_OVER: {
          console.log("GAME OVER!");
          break;
        }
        default:
          break;
      }
    };
  }, [socket, chess]);

  if (!socket) {
    return <p>Connecting....</p>;
  }

  return (
    <>
      <Button
        onClick={() =>
          socket.send(
            JSON.stringify({
              type: INIT_GAME,
            })
          )
        }
        buttonText="PLAY"
      />
    </>
  );
};

export default Game;
