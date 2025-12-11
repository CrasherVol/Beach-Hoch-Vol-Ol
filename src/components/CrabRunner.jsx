import { useEffect, useState } from "react";

export default function CrabRunner() {
  const [runId, setRunId] = useState(0);
  const [direction, setDirection] = useState("ltr");
  const [isRunning, setIsRunning] = useState(false);
  const [prints, setPrints] = useState([]);

  useEffect(() => {
    const walkDuration = 12000;
    const pauseMin = 120000;
    const pauseMax = 240000;

    let timeoutId;

    const startRun = () => {
      setDirection(Math.random() > 0.5 ? "ltr" : "rtl");
      setIsRunning(true);
      setRunId((id) => id + 1);

      const walkStartTime = Date.now();

      // 🐾 Fußspuren erzeugen, solange die Krabbe läuft
      const printInterval = setInterval(() => {
        const elapsed = Date.now() - walkStartTime;
        if (elapsed > walkDuration) {
          clearInterval(printInterval);
          return;
        }

        // Krabbe bewegt sich kontinuierlich → Position berechnen
        const progress = elapsed / walkDuration; // 0–1
        const x =
          direction === "ltr"
            ? progress * window.innerWidth
            : window.innerWidth - progress * window.innerWidth;

        const id = Math.random().toString(36).slice(2);
        setPrints((prev) => [...prev, { id, x }]);

        // Fußspur nach 3.5s löschen
        setTimeout(() => {
          setPrints((prev) => prev.filter((p) => p.id !== id));
        }, 3500);
      }, 200); // alle 200ms neuer Punkt

      // Lauf Ende
      setTimeout(() => {
        setIsRunning(false);
        const nextPause =
          Math.random() * (pauseMax - pauseMin) + pauseMin;
        timeoutId = setTimeout(startRun, nextPause);
      }, walkDuration);
    };

    // erster Start
    timeoutId = setTimeout(startRun, 7000);

    return () => clearTimeout(timeoutId);
  }, [direction]);

  return (
    <>
      {/* 🐾 Fußspuren */}
      {prints.map((p) => (
        <div
          key={p.id}
          className="crab-footprint"
          style={{
            left: `${p.x}px`,
          }}
        >
          ·
        </div>
      ))}

      {/* 🦀 Krabbe */}
      {isRunning && (
        <div
          key={runId}
          className="crab-runner crab-anim"
          style={{
            animationName:
              direction === "ltr"
                ? "crabWalkLeftToRight"
                : "crabWalkRightToLeft",
            animationDuration: "12s",
          }}
        >
          🦀
        </div>
      )}
    </>
  );
}
