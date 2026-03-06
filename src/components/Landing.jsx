import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const TARGET_DATE = new Date("2026-03-06T00:00:00+05:30").getTime();

function Landing() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, TARGET_DATE - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      total: diff,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isReady = timeLeft.total <= 0;

  const pad = (n) => String(n).padStart(2, "0");

  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      size: `${0.8 + Math.random() * 1.2}rem`,
      symbol: ["♥", "♡", "❤", "💕"][Math.floor(Math.random() * 4)],
    }));
  }, []);

  const handleEnter = () => {
    if (isReady) {
      navigate("/celebrate");
    }
  };

  return (
    <div className="landing">
      <div className="landing-hearts">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart"
            style={{
              left: h.left,
              animationDelay: h.delay,
              animationDuration: h.duration,
              fontSize: h.size,
            }}
          >
            {h.symbol}
          </span>
        ))}
      </div>

      <div className="landing-content">
        <p className="landing-subtitle">A Celebration of You</p>
        <h1 className="landing-title">Happy Birthday</h1>
        <h2 className="landing-name">Lavanya</h2>

        <div className="landing-ornament" />

        <div className="countdown-container">
          <div className="countdown">
            <div className="countdown-unit">
              <span className="countdown-value">{pad(timeLeft.days)}</span>
              <span className="countdown-label">Days</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{pad(timeLeft.hours)}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{pad(timeLeft.minutes)}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-unit">
              <span className="countdown-value">{pad(timeLeft.seconds)}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>

        <button
          className={`enter-btn ${isReady ? "enabled" : "disabled"}`}
          onClick={handleEnter}
          disabled={!isReady}
        >
          {isReady ? "Enter Celebration 💕" : "Some more minutes darling 😉"}
        </button>
      </div>
    </div>
  );
}

export default Landing;
