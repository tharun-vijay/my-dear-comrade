import { useMemo } from "react";
import "./Acceptance.css";

function Acceptance() {
  /* Generate burst hearts */
  const burstHearts = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 25;
      const distance = 120 + Math.random() * 200;
      return {
        id: i,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`,
        rot: `${Math.random() * 360}deg`,
        delay: `${Math.random() * 0.8}s`,
        duration: `${1 + Math.random() * 1.5}s`,
        size: `${1 + Math.random() * 1.5}rem`,
        symbol: ["❤", "💕", "♥", "💗", "💖", "✨"][
          Math.floor(Math.random() * 6)
        ],
      };
    });
  }, []);

  /* Generate confetti */
  const confetti = useMemo(() => {
    const colors = [
      "#B76E79",
      "#C9A96E",
      "#F4E1E6",
      "#F7E7CE",
      "#D4A0A7",
      "#E8D5A8",
    ];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      size: `${5 + Math.random() * 8}px`,
    }));
  }, []);

  return (
    <div className="acceptance">
      {/* Ambient glows */}
      <div className="acceptance-glow" />
      <div className="acceptance-glow" />

      {/* Heart bursts */}
      <div className="acceptance-hearts">
        {burstHearts.map((h) => (
          <span
            key={h.id}
            className="burst-heart"
            style={{
              left: "50%",
              top: "50%",
              "--tx": h.tx,
              "--ty": h.ty,
              "--rot": h.rot,
              animationDelay: h.delay,
              animationDuration: h.duration,
              fontSize: h.size,
            }}
          >
            {h.symbol}
          </span>
        ))}
      </div>

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: c.left,
            backgroundColor: c.color,
            animationDelay: c.delay,
            animationDuration: c.duration,
            width: c.size,
            height: c.size,
          }}
        />
      ))}

      {/* Content */}
      <div className="acceptance-content">
        <div className="acceptance-big-heart">💖</div>
        <h1 className="acceptance-title">Yaaay!</h1>
        <h2 className="acceptance-subtitle">I Knew You'd Say Yes 🥰</h2>
        <div className="acceptance-ornament" />
        <p className="acceptance-message">
          No more worries about me making up stories for Wifey typos. My Dear Comrade!💕
        </p>
        <div className="acceptance-emoji-row">
          <span>💕</span>
          <span>💗</span>
        </div>
      </div>
    </div>
  );
}

export default Acceptance;
