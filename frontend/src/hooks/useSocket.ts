import { useEffect, useState } from "react";

const WS_URL = import.meta.env.PROD
  ? import.meta.env.VITE_APP_URL
  : "http://localhost:8080";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnect");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
