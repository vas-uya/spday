import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ----------------  MASTER EMOJI LIST  ---------------- */
const LOVE_EMOJIS = [
  "❤️","💖","💘","💝","💕","💞","💓","💗","💌","💟",
  "💜","💙","💚","🩷","💋","✨","🤗","😘","🥰","😚","😻","😍"
];

/* ---------- 3D Heart ---------- */
const HeartMesh = () => {
  const meshRef = useRef();
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0, 0, -1.5, -2.5, -3, -2);
    shape.bezierCurveTo(-6, -0.5, -3.5, 3.5, 0, 5);
    shape.bezierCurveTo(3.5, 3.5, 6, -0.5, 3, -2);
    shape.bezierCurveTo(1.5, -2, 0, 0, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.3,
      bevelSegments: 4,
    });
    geo.center();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff4d6d",
        metalness: 0.3,
        roughness: 0.4,
        emissive: "#44000a",
        emissiveIntensity: 0.2,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      scale={[0.25, 0.25, 0.25]}
      rotation={[Math.PI, 0, 160]}
    />
  );
};

/* ---------- Background Floating Emoji ---------- */
const FloatingEmoji = ({ emoji, left, duration, delay }) => (
  <div
    className="emoji-floating"
    style={{
      left,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    aria-hidden
  >
    {emoji}
  </div>
);

/* ---------- Cursor-Trail Heart ---------- */
const CursorHeart = ({ x, y, emoji }) => (
  <motion.div
    className="pointer-events-none fixed"
    style={{ left: x, top: y, fontSize: 26 }}
    initial={{ opacity: 1, scale: 0.8, y: 0 }}
    animate={{ opacity: 0, scale: 1.6, y: -60 }}
    transition={{ duration: 1 }}
  >
    {emoji}
  </motion.div>
);

/* ---------- Intro Overlay ---------- */
const IntroOverlay = ({ onUnlock }) => {
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/song1.mp3");
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }
    return () => audioRef.current?.pause();
  }, []);

  useEffect(() => {
    const start = async () => {
      try { await audioRef.current?.play(); } catch {}
      setVisible(false);
      setTimeout(onUnlock, 650);
      window.removeEventListener("pointerdown", start);
    };
    window.addEventListener("pointerdown", start);
    return () => window.removeEventListener("pointerdown", start);
  }, [onUnlock]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={visible ? { opacity: 1 } : { opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center intro-bg"
    >
      <div className="flex flex-col items-center text-center px-6">
        <div style={{ width: "min(520px,86vw)", height: "min(520px,86vw)" }}>
          <Canvas shadows camera={{ position: [0, 0, 7], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.9} />
            <pointLight position={[-5, -5, -5]} intensity={0.35} />
            <HeartMesh />
          </Canvas>
        </div>
        <p className="mt-6 text-rose-100 text-lg">
          Click or tap anywhere to begin 💖
        </p>
      </div>
    </motion.div>
  );
};

/* ---------- Floating hearts on hover ---------- */
const FloatingHeart = ({ x, size, emoji }) => (
  <motion.div
    className="floating-heart"
    style={{ left: x, fontSize: size }}
    initial={{ y: 0, opacity: 1, scale: 0.6 }}
    animate={{ y: -80 - Math.random() * 60, opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.9 }}
  >
    {emoji}
  </motion.div>
);

/* ---------- Story Modal ---------- */
const StoryModal = ({ card, onClose }) => (
  <AnimatePresence>
    {card && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-md w-full bg-white rounded-2xl p-6 text-gray-800 shadow-xl"
        >
          <h2
            className="text-3xl font-bold text-rose-700 mb-4"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            {card.title}
          </h2>
          <div className="text-sm text-rose-600 mb-3">{card.date}</div>
          <p className="leading-relaxed whitespace-pre-line">{card.desc}</p>
          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ---------- Timeline Card ---------- */
const TimelineCard = ({ event, index, onOpen }) => {
  const [hearts, setHearts] = useState([]);

  const spawnHeart = () => {
    const x = Math.random() * 200;
    const id = Math.random().toString(36).slice(2, 9);
    const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
    setHearts((s) => [...s, { id, x, size: 18 + Math.random() * 18, emoji }]);
    setTimeout(() => setHearts((s) => s.filter((h) => h.id !== id)), 1000);
  };

  return (
    <motion.div
      className="timeline-card relative overflow-hidden cursor-pointer"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={spawnHeart}
      onTouchStart={spawnHeart}
      onClick={() => onOpen(event)}
    >
      {LOVE_EMOJIS.slice(0, 6).map((em, i) => (
        <FloatingEmoji
          key={i}
          emoji={em}
          left={`${10 + i * 15}%`}
          duration={6 + i * 3}
          delay={i * 1.2}
        />
      ))}
      <div className="text-sm text-rose-600 font-semibold">{event.date}</div>
      <h3
        className="text-xl font-bold mt-1"
        style={{ fontFamily: "Great Vibes, cursive" }}
      >
        {event.title}
      </h3>
      {hearts.map((h) => (
        <FloatingHeart key={h.id} x={h.x} size={h.size} emoji={h.emoji} />
      ))}
    </motion.div>
  );
};

/* ---------- Main App ---------- */
export default function App() {
  const [locked, setLocked] = useState(true);
  const [cursorHearts, setCursorHearts] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (!locked) {
      const addHeart = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (x == null || y == null) return;
        const id = Math.random().toString(36).slice(2);
        const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
        setCursorHearts((h) => [...h, { id, x, y, emoji }]);
        setTimeout(() => setCursorHearts((h) => h.filter((c) => c.id !== id)), 1000);
      };
      window.addEventListener("mousemove", addHeart);
      window.addEventListener("touchmove", addHeart);
      return () => {
        window.removeEventListener("mousemove", addHeart);
        window.removeEventListener("touchmove", addHeart);
      };
    }
  }, [locked]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = locked ? "hidden" : "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [locked]);

  /* ---------- Timeline Events ---------- */
  const timeline = [
    { 
      date: "16 Aug",
      title: "The First Glance",
      desc: "The day our story quietly began. Here you can write the full story details for this memory."
    },
    { 
      date: "5 Sept",
      title: "Our First Talk",
      desc: "Words that turned strangers into something more. Describe the conversation and feelings you both shared."
    },
    { 
      date: "26 Sept",
      title: "I Proposed",
      desc: "With a racing heart, I asked for forever. Add the proposal moment and emotions here."
    },
    { 
      date: "29 Sept",
      title: "You Said Yes",
      desc: "The sweetest word, the happiest day. Share how it felt when you heard that magical ‘Yes!’"
    },
    {
      date: "Every Storm",
      title: "Hardships We Faced",
      desc: "We weathered sleepless nights, distance, and moments of doubt. Yet each trial only drew us closer. Through every challenge, we chose love—proving that together, we can endure anything."
    },
    {
      date: "Today",
      title: "Special Message",
      desc: "Through every challenge and every joy, my love for you grows stronger. This is our ongoing story—an endless chapter of care, laughter, and hope for all our tomorrows."
    }
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {locked && <IntroOverlay onUnlock={() => setLocked(false)} />}

      {/* Hearts that follow the cursor/finger */}
      {cursorHearts.map((h) => (
        <CursorHeart key={h.id} x={h.x} y={h.y} emoji={h.emoji} />
      ))}

      {/* Global floating emojis */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <FloatingEmoji
            key={i}
            emoji={LOVE_EMOJIS[i % LOVE_EMOJIS.length]}
            left={`${Math.random() * 90}%`}
            duration={8 + Math.random() * 6}
            delay={Math.random() * 6}
          />
        ))}
      </div>

      <main className="relative">
        <section className="min-h-screen flex items-center justify-center py-20 px-6">
          <div className="max-w-3xl text-center">
            <h1
              className="text-4xl md:text-6xl font-extrabold"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
             Happy 7th Anniversary ❤️ GUDIYA
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              A little page of love, memory, and soft encouragement.
            </p>
          </div>
        </section>

        <section className="py-24 px-6 bg-gradient-to-b from-rose-50 to-rose-100">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-3xl font-semibold mb-6"
                style={{ fontFamily: "Great Vibes, cursive" }}
              >
                Our Timeline
              </h2>
              <div className="space-y-6">
                {timeline.map((t, i) => (
                  <TimelineCard
                    key={t.date}
                    event={t}
                    index={i}
                    onOpen={setSelectedCard}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="timeline-card relative">
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Motivation
                </h3>
                <p className="mt-3 text-gray-700">
                  My love, the road to becoming a CA is steep, but you are
                  stronger than every late night and heavy textbook. I will
                  always be your biggest supporter.
                </p>
              </div>

              <div className="timeline-card relative">
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "Great Vibes, cursive" }}
                >
                  Our Poem
                </h3>
                <div className="mt-3 text-gray-800 whitespace-pre-line">
{`In the hush of dawn your dreams take flight,
Numbers and balance through every night.
Yet here you are—my brightest star,
No distance or deadline can dim who you are.
Seven years, a heartbeat’s span,
Forever my love, my dearest friend.`}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 text-center">
          <p className="text-sm text-gray-600">
            Made with ❤️BY SURU
          </p>
        </footer>
      </main>

      {/* Story Modal */}
      <StoryModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
