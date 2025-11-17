import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

/* ----------------  MASTER EMOJI LIST  ---------------- */
const LOVE_EMOJIS = [
  "❤️","💖","💘","💝","💕","💞","💓","💗","💌","💟",
  "💜","💙","💚","🩷","💋","✨","🤗","😘","🥰","😚","😻","😍"
];

/* ----------------------------------------------
   SAVE MOTIVATION + POEM AS VARIABLES
   (your text is completely unchanged)
------------------------------------------------*/

const motivationText = `
💙 To the Strongest Girl I Know — My CA Warrior 💙

I know the CA journey isn’t easy.
It’s long… stressful… full of sleepless nights, endless revisions, pressure, and moments when it feels like the world is moving fast but you’re stuck between chapters, attempts, and expectations.

But even through all of that, you’re still standing.
You’re still fighting.
You’re still giving your best.

And I’m so proud of you.

I’ve seen how hard you work, how much you sacrifice, how deeply you care about your dreams.
Becoming a CA isn’t just a career… it’s a test of strength, discipline, and courage — and you have all of it within you.

And in this journey, you are not alone.
Because I am here — your four pillars, always.

1. Pillar of Support

Whenever you feel tired, stressed, or overwhelmed, lean on me.
I'll hold you up.
I'll make sure you never feel like giving up.

2. Pillar of Strength

When the syllabus feels endless or results shake your confidence, I'll be the one reminding you of your power — the strength you sometimes forget you have.

3. Pillar of Peace

In the chaos of books, classes, and pressure, I'll be your calm.
Your safe place.
The person you can come to when you need a breath, a break, or just silence.

4. Pillar of Motivation

I'll push you forward when you question yourself.
I'll remind you why you started.
I'll stand beside you until the day you finally write “CA” before your name — because you will.

You're not just studying for a degree…
You're building your future, your identity, your pride.

And I promise — no matter how hard it gets —
I'll be here, holding you up, standing behind you, and walking with you through every chapter of this CA journey.

You're strong.
You're capable.
You're unstoppable.
And I believe in you more than you know. 💙

I hope this making you feel motivated.this took me time to make. Hope u feel good and loved. 
&
&
This to Apologize for the things which made u feel that i am not doing anything with my heart .But everthing i have and will do is with my heart for you.
I Love You and Always will do . 
`;

const poemText = `
🌙✨ A Poem From My Heart ✨🌙

I know I’ve made mistakes,
some so deep they may never be forgivable.
And sometimes my behavior makes it look
as if I’ve changed,
as if I’ve become someone different
from the one you once knew.

But inside me…
my love for you is the same,
and it keeps growing every single day.
It may seem like I’ve changed,
but my heart has never shifted—
not once, not ever.

Yes, it is the rule of nature
for human behavior to change,
for seasons to turn,
for people to evolve through time.
But the emotions I carry for you,
the love I hold in my heart—
that is unchangeable, untouchable.
Even if God Himself stood before me,
that love would remain,
steady and eternal.

My love for you
will never fade,
never break,
never change.
It will always stay—
pure, real, and only yours.

This whole website is the result of days of my hard work. I know you are angry at me today, 
and I finished working on this today. I know you told me not to say it… but please accept my apology. I truly am sorry.
“I miss you every second, every minute, every hour, every single day. No matter what I’m doing or where I am, a part of me is always longing for you.”
“I loved you every sec, min, hour, day, month, year… and I love you every sec, min, hour, day, month, year… and I will love you every sec, min, hour, day, month, year…
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗😘🤗
😘🤗😘🤗😘🤗😘🤗😘🤗
`;

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
    const audio = new Audio("/song1.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  useEffect(() => {
    const start = async () => {
      try { await audioRef.current.play(); } catch {}
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

/* ---------- Scrollable Story Modal ---------- */
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
          className="max-w-md w-full bg-white rounded-2xl p-6 text-gray-800 shadow-xl max-h-[85vh] overflow-y-auto"
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
      className="timeline-card relative overflow-hidden cursor-pointer bg-white/5 rounded-lg p-4"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true }}
      onMouseEnter={spawnHeart}
      onTouchStart={spawnHeart}
      onClick={() => onOpen(event)}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-rose-600 font-semibold">{event.date}</div>
          <h3
            className="text-xl font-bold mt-1"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            {event.title}
          </h3>
        </div>
      </div>

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

  /* ---------------- MUSIC BUTTON ---------------- */
  const audioRefButton = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    audioRefButton.current = new Audio("/song1.mp3");
    audioRefButton.current.loop = true;
    audioRefButton.current.volume = 0.5;
  }, []);

  const startMusicButton = () => {
    audioRefButton.current.play().catch(() => {});
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1800);
  };
  /* ------------------------------------------------ */

  useEffect(() => {
    if (!locked) {
      const addHeart = (e) => {
        const x =
          e.clientX || (e.touches && e.touches[0].clientX);
        const y =
          e.clientY || (e.touches && e.touches[0].clientY);
        if (x == null || y == null) return;
        const id = Math.random().toString(36).slice(2);
        const emoji =
          LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
        setCursorHearts((h) => [...h, { id, x, y, emoji }]);
        setTimeout(
          () => setCursorHearts((h) => h.filter((c) => c.id !== id)),
          800
        );
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
    document.body.style.overflow = locked ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [locked]);

  /* ---------- Timeline Events ---------- */
  const timeline = [
    {
      date: "16 Aug",
      title: "The First Glance",
      desc: `💙 The First Glance — The Moment Everything Changed 💙

I still remember the 18th of August so clearly...`
    },
    {
      date: "5 Sept",
      title: "Our First Talk",
      desc: `Then came 5th September... ❤️`
    },
    {
      date: "26 Sept",
      title: "I Proposed",
      desc: `Then came 26th September... ❤️`
    },
    {
      date: "29 Sept",
      title: "You Said Yes",
      desc: `29 September — the day you said yes... ❤️`
    },
    {
      date: "Every Storm",
      title: "Hardships We Faced",
      desc: `💔 The Hardship We Faced... ❤️‍🩹`
    },
    {
      date: "Last From The Date, But Never Late To Express",
      title: "Special Message",
      desc: `“I know it’s been almost two months...”`
    },
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {locked && <IntroOverlay onUnlock={() => setLocked(false)} />}

      {cursorHearts.map((h) => (
        <CursorHeart key={h.id} x={h.x} y={h.y} emoji={h.emoji} />
      ))}

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
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

      <main>

        {/* ---------- FLOATING MUSIC BUTTON ---------- */}
        <button
          onClick={startMusicButton}
          className="fixed bottom-6 right-6 z-50 bg-rose-600 text-white p-4 rounded-full shadow-xl hover:bg-rose-700 transition"
        >
          🎵
        </button>

        {showPopup && (
          <div className="fixed bottom-24 right-6 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            ❤️ Music Started ❤️
          </div>
        )}
        {/* ------------------------------------------ */}

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

          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl font-semibold mb-6"
              style={{ fontFamily: "Great Vibes, cursive" }}
            >
              Our Timeline
            </h2>

            <div className="space-y-6">
              {timeline.map((t, i) => (
                <TimelineCard
                  key={i}
                  event={t}
                  index={i}
                  onOpen={setSelectedCard}
                />
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <TimelineCard
              event={{
                date: "Motivation",
                title: "You're My CA Warrior",
                desc: motivationText,
              }}
              index={timeline.length}
              onOpen={setSelectedCard}
            />
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <TimelineCard
              event={{
                date: "Poem",
                title: "A Poem From My Heart",
                desc: poemText,
              }}
              index={timeline.length + 1}
              onOpen={setSelectedCard}
            />
          </div>
        </section>

        <footer className="py-12 px-6 text-center">
          <p className="text-sm text-gray-600">Made with ❤️BY SURU</p>
        </footer>
      </main>

      <StoryModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
