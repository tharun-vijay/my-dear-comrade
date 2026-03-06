import { useState, useEffect, useRef, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import marakkavillayeCover from "../assets/marakkavillaye.jpeg";
import marakkavillayeAudio from "../assets/Marakkavillayae.mp3";
import dearComradeImg from "../assets/Dear Comrade.png";

const NAME_LIST = [
  "ܠܒܢܝܐ",
  "ᮜᮝᮔᮡ",
  "لٱۋنْيَ",
  "ឡាវញ្ញ",
  "ላቫንያ",
  "لڤني",
  "লাবণ্য",
  "ލަވަންޔާ",
  "ਲਾਵਨਿ",
  "ߟߊߝߊ߲ߦߊ",
  "लावन्या",
  "ᓚᕙᓂᔭ",
  "ଲାବଣ୍ୟ",
  "לבניה",
  "लावण्य़ा",
  "לָוַאנְיָ",
  "لاوݣیا",
  "라바냐",
  "લાવણ્ય",
  "لاونیا",
  "लावण्या",
  "لَڤَانْيَ",
  "라반야",
  "ଲାବଣ୍ୟା",
  "𐒐𐒖𐒁𐒛𐒖",
  "ᛚᚨᚡᚨᚾᛃᚨ",
  "لَوْڤَنْيَ",
  "ឡាវ៉ាញា",
  "ⵍⴰⵠⴰⵏⵢⴰ",
  "ลาวันยา",
  "လာဗည",
  "Лавања",
  "Λαϐάνα",
  "લાવણ્યા",
  "లావణ్య",
  "ลาวัณยา",
  "ᎳᏩᏂᏯ",
  "ລາວັນຍາ",
  "لاڤانيا",
  "လာဝညာ",
  "ᬮᬯᬦ᭄ᬬ",
  "ᜎᜊᜈ᜔ᜌ",
  "ꦭꦮꦚ",
  "ลาวัญญา",
  "ලාවන්ය",
  "ਲਾਵਣਿਆ",
  "ლავანია",
  "Лаванья",
  "라바냐아",
  "ᨒᨓᨊᨐ",
  "ラバニャ",
  "Լավանյա",
  "ලාවන්යා",
  "Λαβάνια",
  "라브안야",
  "拉瓦尼娅",
  "លាវាន់យ៉ា",
  "拉華妮雅",
  "לַאָוַאַנְיא",
  "ලාවඤ්ඤ",
  "လာဗဉညာ",
  "ലാവണ്യ",
  "ラヴァニャ",
  "らゔぁんや",
  "லாவண்யா",
  "Lavanya",
];

const NO_TEXTS = [
  "No 😊",
  "Are you sure? 🤔",
  "Think again! 😏",
  "Really?! 😢",
  "Pretty please? 🥺",
  "One more chance? 💭",
  "You're breaking my heart 💔",
  "I'll wait forever 🌹",
  "Reconsider? 🦋",
  "But whyyy 😩",
  "Last chance? 🥀",
  "I know you didn't mean that 😌",
  "Try the other button 👉",
  "Click Yes already! 💕",
  "No is not an option 😤",
  "Are you absolutely sure? 😶‍🌫️",
  "Maybe your finger slipped… try again 💫",
  "That felt like a Yes in disguise 😌",
  "Give love a chance? 🌷",
  "My heart says you meant Yes ❤️",
  "Come on… don’t be shy 🫣",
  "The Yes button misses you 😔",
  "You can’t escape destiny ✨",
  "Your future self would click Yes 😏",
  "Just imagine the cute dates 🥹",
  "Still thinking? I’ll wait 💭",
  "Don’t make this poor button cry 😢",
  "Love deserves another click 💌",
  "Try again… but with feelings 💕",
  "You almost clicked Yes… I saw that 👀",
  "One tiny Yes won’t hurt 🌸",
  "Let your heart decide 💖",
  "Are we really doing this again? 😩",
  "Plot twist: You actually want to click Yes 😏",
  "Okay but… what if Yes? 🤭",
  "This could be the start of something beautiful 🌹",
  "The Yes button believes in you ✨",
  "Just one brave click 💫",
  "You know you want to 😌",
  "Your heart whispered Yes 💗",
];

function formatTime(sec) {
  if (!sec || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Homepage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [noIndex, setNoIndex] = useState(0);
  const [noShake, setNoShake] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [displayName, setDisplayName] = useState(NAME_LIST[0]);

  useEffect(() => {
    let index = 0;
    let cancelled = false;

    function showNext() {
      if (cancelled || index >= NAME_LIST.length - 1) {
        setDisplayName(NAME_LIST[NAME_LIST.length - 1]); 
        return;
      }
      index++;
      setDisplayName(NAME_LIST[index]);

      const delay = 10 + index * 4;
      setTimeout(showNext, delay);
    }

    const kickoff = setTimeout(showNext, 100);

    return () => {
      cancelled = true;
      clearTimeout(kickoff);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    if (audio.duration) setDuration(audio.duration);

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const resume = () => {
          audio.play().catch(() => {});
          removeGestureListeners();
        };
        const removeGestureListeners = () => {
          ["click", "touchstart", "touchend", "keydown"].forEach((evt) =>
            document.removeEventListener(evt, resume, { capture: true }),
          );
          document.removeEventListener("scroll", resume, true);
        };
        ["click", "touchstart", "touchend", "keydown"].forEach((evt) =>
          document.addEventListener(evt, resume, { capture: true, once: false }),
        );
        document.addEventListener("scroll", resume, true);
      });
    }

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reveals = container.querySelectorAll(".section-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, root: container },
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const handleProgressClick = useCallback((e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  const handleRestart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const handleYes = useCallback(() => navigate("/accepted"), [navigate]);

  const handleNo = useCallback(() => {
    setNoIndex((prev) => (prev + 1) % NO_TEXTS.length);
    setNoShake(true);
    setTimeout(() => setNoShake(false), 500);
  }, []);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`,
      })),
    [],
  );

  const letterHearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${8 + Math.random() * 6}s`,
        size: `${0.6 + Math.random() * 0.8}rem`,
      })),
    [],
  );

  const scanPattern = useMemo(() => {
    const cells = [];
    for (let i = 0; i < 64; i++) {
      cells.push(Math.random() > 0.45 ? "dark" : "light");
    }
    return cells;
  }, []);

  return (
    <div className="homepage" ref={containerRef}>
      <section className="section hero-section">
        <div className="hero-bg-number">23</div>
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="hero-sparkle"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
        <div className="hero-content">
          <h1 className="hero-title">Happy Birthday</h1>
          <h2 className="hero-name">{displayName}</h2>
          <div className="hero-ornament" />
        </div>
        <div className="scroll-indicator">
          <span className="scroll-indicator-text">Scroll</span>
          <span className="scroll-indicator-arrow">▼</span>
        </div>
      </section>

      <audio
        ref={audioRef}
        src={marakkavillayeAudio}
        loop
        playsInline
        preload="auto"
      />

      <section className="section music-section">
        <div className="section-reveal">
          <div className="music-container">
            <p className="music-label">Now Playing</p>
            <h3 className="music-title">For You</h3>
            <div className="music-art">
              <img src={marakkavillayeCover} alt="Marakkavillayae cover" />
              <div className="music-art-overlay" />
            </div>
            <p className="music-song-name">Marakkavillayae</p>
            <p className="music-artist">Anirudh Ravichander</p>
            <div
              className="music-progress"
              ref={progressRef}
              onClick={handleProgressClick}
              role="slider"
              aria-label="Seek"
              aria-valuenow={currentTime}
              aria-valuemax={duration}
              tabIndex={0}
            >
              <div
                className="music-progress-fill"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
              />
            </div>
            <div className="music-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="music-controls">
              <button className="music-btn" aria-label="Restart" onClick={handleRestart}>
                ⏮
              </button>
              <button
                className="music-btn music-btn-play"
                aria-label={isPlaying ? "Pause" : "Play"}
                onClick={togglePlayPause}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button className="music-btn" aria-label="Restart" onClick={handleRestart}>
                ⏭
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section letter-section">
        <div className="letter-hearts">
          {letterHearts.map((h) => (
            <span
              key={h.id}
              className="letter-heart-float"
              style={{
                left: h.left,
                animationDelay: h.delay,
                animationDuration: h.duration,
                fontSize: h.size,
              }}
            >
              ♥
            </span>
          ))}
        </div>
        <div className="section-reveal">
          <div className="letter-container">
            <h3 className="letter-title">A Little Note For You</h3>
            <div className="letter-body">
              <p className="letter-text">
                Today, you turn 23 my love and so did I, two days ago. That's a
                great milestone and I am fortunate enough to reach that
                milestone 2 days before you. I am glad that we are moving in a similar pace. Unfortunately I wasn't there for
                the previous 22 one's but I really want to be a part of the
                journey that lies ahead. As days pass by, we grow and so does my
                love for you. And I am fortunate enough to know that my love for
                you never stops growing. Gladly, for us, for what lies ahead,
                for the days that remain unknown, through the thick and thins
                you face in this journey let me be your
                <span
                  style={{ color: "var(--gold-light)", fontWeight: "bold" }}
                >
                  {" "}
                  'Dear Comrade'
                </span>
                .💕
              </p>
              <div className="letter-signature">— With love ♥</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section playlist-section">
        <div className="section-reveal">
          <div className="playlist-container">
            <p className="playlist-label">Curated For You</p>
            <h3 className="playlist-title">Songs That Remind You</h3>
            <p className="playlist-message">
              A playlist curated by me to keep your day lovely. Relax, lean
              back, and fall in love, for I will always be there to catch you.
            </p>
            <div className="playlist-card">
              <div className="playlist-cover">
                <img src={dearComradeImg} alt="Dear Comrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section proposal-section">
        <div className="section-reveal">
          <div className="proposal-container">
            <div className="proposal-icon">💗</div>
            <h3 className="proposal-question">
              Will u let me hear your "Yeee Slu" for the rest of my life?
            </h3>
            <div className="proposal-buttons">
              <button
                className="proposal-btn proposal-btn-yes"
                onClick={handleYes}
              >
                Yes 💕
              </button>
              <button
                className={`proposal-btn proposal-btn-no ${noShake ? "proposal-no-shake" : ""}`}
                onClick={handleNo}
              >
                {NO_TEXTS[noIndex]}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
