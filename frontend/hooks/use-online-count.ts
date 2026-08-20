"use client";

import { useEffect, useState } from "react";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000";

export function useOnlineCount(): number {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "online-count" && typeof data.count === "number") {
          setOnlineCount(data.count);
        }
      } catch {
        // Ignore malformed WebSocket messages.
      }
    };

    socket.onerror = () => {
      setOnlineCount(0);
    };

    return () => {
      socket.close();
    };
  }, []);

  return onlineCount;
}
