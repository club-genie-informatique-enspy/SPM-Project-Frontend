import { useEffect, useRef } from "react";
import type { WsProjectEvent } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8082";

/**
 * Subscribes to real-time project events via STOMP/SockJS.
 * Calls `onEvent` whenever a task or member event arrives on /topic/project/{projectId}.
 * Safe to use in SSR environments — connection only opens in the browser.
 */
export function useProjectSocket(
  projectId: string,
  onEvent: (event: WsProjectEvent) => void
) {
  // Keep a stable ref so the effect doesn't re-run when onEvent identity changes
  const onEventRef = useRef(onEvent);
  useEffect(() => { onEventRef.current = onEvent; }, [onEvent]);

  useEffect(() => {
    if (typeof window === "undefined" || !projectId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    let client: { deactivate: () => void } | null = null;
    let cancelled = false;

    import("@stomp/stompjs").then(({ Client }) => {
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const SockJS = require("sockjs-client");

      const stompClient = new Client({
        webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
        connectHeaders: { Authorization: `Bearer ${token}` },
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe(`/topic/project/${projectId}`, (frame) => {
            try {
              const event: WsProjectEvent = JSON.parse(frame.body);
              onEventRef.current(event);
            } catch {
              // malformed message — ignore
            }
          });
        },
      });

      stompClient.activate();
      client = stompClient;
    });

    return () => {
      cancelled = true;
      client?.deactivate();
    };
  }, [projectId]);
}

/**
 * Subscribes to personal notification events via STOMP/SockJS.
 * Calls `onNotification` whenever the backend pushes to /user/queue/notifications.
 */
export function useNotificationSocket(
  onNotification: (payload: Record<string, unknown>) => void
) {
  const onNotifRef = useRef(onNotification);
  useEffect(() => { onNotifRef.current = onNotification; }, [onNotification]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    let client: { deactivate: () => void } | null = null;
    let cancelled = false;

    import("@stomp/stompjs").then(({ Client }) => {
      if (cancelled) return;

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const SockJS = require("sockjs-client");

      const stompClient = new Client({
        webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
        connectHeaders: { Authorization: `Bearer ${token}` },
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe("/user/queue/notifications", (frame) => {
            try {
              onNotifRef.current(JSON.parse(frame.body));
            } catch {
              // ignore
            }
          });
        },
      });

      stompClient.activate();
      client = stompClient;
    });

    return () => {
      cancelled = true;
      client?.deactivate();
    };
  }, []);
}
