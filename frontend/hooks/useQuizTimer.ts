// useQuizTimer.ts
import { useEffect, useRef, useState } from "react";

export function useQuizTimer(
  startedAt: string,
  durationSec: number,
  serverNow: string,
) {
  // Calculate offset between server time and local time
  const offsetRef = useRef(Date.now() - new Date(serverNow).getTime());
  const [remaining, setRemaining] = useState(durationSec);
  useEffect(() => {
    const started = new Date(startedAt).getTime();

    const tick = () => {
      const now = Date.now() - offsetRef.current;
      const elapsed = Math.floor((now - started) / 1000);
      const left = durationSec < 0 ? -1 : Math.max(durationSec - elapsed, 0);
      setRemaining(left);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startedAt, durationSec]);

  return remaining;
}
