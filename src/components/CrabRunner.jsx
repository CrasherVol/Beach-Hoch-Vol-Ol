import { useEffect, useRef, useState } from "react";

export default function CrabRunner() {
  const [runId, setRunId] = useState(0);
  const [direction, setDirection] = useState("ltr");
  const [isRunning, setIsRunning] = useState(false);
  const [prints, setPrints] = useState([]);

  const runTimeout = useRef(null);
  const printInterval = useRef(null);

  useEffect(() => {
    const walkDuration = 12000;
    const pauseMin = 120000;
    const pauseMax = 240000;

    const startRun = () => {
      // 🧼 Reset
      setPrints([]);
      setDirection(Math.random() > 0.5 ? "ltr" : "rtl");
      setIsRunning(true);
      setRunId((id) => id + 1);

      const startTime = Date.now();

      // 🐾 Fußspuren NUR während des Laufs
      printInterval.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed > walkDuration) return;

        const progress = elapsed / walkDuration;
        const x =
          direction === "ltr"
            ? progress * window.innerWidth
            : window.innerWidth - progress * window.innerWidth;

        const id = crypto.randomUUID();

        setPrints((prev) => [...prev, { id, x }]);

        // Spur nach 3.5s entfernen
        setTimeout(() => {
          setPrints((prev) => prev.filter((p) => p.id !== id));
        }, 3500);
      }, 200);

      // 🦀 Lauf endet
      runTimeout.current = setTimeout(() => {
        setIsRunning(false);
        clearInterval(printInterval.current);
        setPrints([]);

        const nextPause =
          Math.random() * (pauseMax - pauseMin) + pauseMin;
        runTimeout.current = setTimeout(startRun, nextPause);
      }, walkDuration);
    };

    // ⏱️ erster Start
    runTimeout.current = setTimeout(startRun, 7000);

    return () => {
      clearTimeout(runTimeout.current);
      clearInterval(printInterval.current);
    };
  }, []); // ⬅️ WICHTIG: kein dependency mehr

  return (
    <>
      {/* 🐾 Fußspuren – NUR wenn der Krebs läuft */}
      {isRunning &&
        prints.map((p) => (
          <div
            key={p.id}
            className="crab-footprint"
            style={{ left: `${p.x}px` }}
          >
            ·
          </div>
        ))}

      {/* 🦀 Krabbe – fixed + hoher z-index */}
      {isRunning && (
        <div
          key={runId}
          className="crab-runner crab-anim fixed bottom-6 left-0 w-screen pointer-events-none z-[60]"
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
