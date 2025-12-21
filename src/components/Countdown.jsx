import { useEffect, useState } from "react";

export const EVENT_DATE = new Date("2026-03-13T18:00:00+01:00");

export default function Countdown({ size = "lg", targetDate = EVENT_DATE }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, targetDate - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  // Desktop bleibt wie vorher, Mobile darf umbrechen statt abgeschnitten zu werden
  const cls =
    size === "xl"
      ? "text-2xl gap-3"
      : size === "lg"
      ? "text-lg gap-2"
      : "text-base gap-2";

  // Auf Mobile etwas kompakter, ab sm identisch zu vorher
  const pill =
    size === "xl"
      ? "px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl"
      : size === "lg"
      ? "px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl"
      : "px-2 py-2 sm:px-2.5 sm:py-2 rounded-lg";

  return (
    <div
      className={`flex flex-wrap ${cls} font-[tabular-nums] justify-center text-slate-900 max-w-full`}
    >
      <span className={`bg-white/90 ${pill} shadow-soft border border-amber-300`}>
        <b>{d}</b>T
      </span>
      <span className={`bg-white/90 ${pill} shadow-soft border border-amber-300`}>
        <b>{h}</b>h
      </span>
      <span className={`bg-white/90 ${pill} shadow-soft border border-amber-300`}>
        <b>{m}</b>m
      </span>
      <span className={`bg-white/90 ${pill} shadow-soft border border-amber-300`}>
        <b>{s}</b>s
      </span>
    </div>
  );
}
