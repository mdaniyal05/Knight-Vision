import { useEffect } from "react";
import Button from "../components/Button";
import useSocket from "../hooks/useSocket";

const INIT_GAME = "init_game";

const Chess = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          console.log("GAME INITIALIZED");
          break;
        default:
          break;
      }
    };
  }, [socket]);

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

export default Chess;
