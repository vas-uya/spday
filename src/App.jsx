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
I’ll hold you up.
I’ll make sure you never feel like giving up.

2. Pillar of Strength

When the syllabus feels endless or results shake your confidence, I’ll be the one reminding you of your power — the strength you sometimes forget you have.

3. Pillar of Peace

In the chaos of books, classes, and pressure, I’ll be your calm.
Your safe place.
The person you can come to when you need a breath, a break, or just silence.

4. Pillar of Motivation

I’ll push you forward when you question yourself.
I’ll remind you why you started.
I’ll stand beside you until the day you finally write “CA” before your name — because you will.

You’re not just studying for a degree…
You’re building your future, your identity, your pride.

And I promise — no matter how hard it gets —
I’ll be here, holding you up, standing behind you, and walking with you through every chapter of this CA journey.

You’re strong.
You’re capable.
You’re unstoppable.
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
and I finished working on this today. I know you told me not to say it… but please accept my apology. I truly am s***y.
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
  const [open, setOpen] = useState(false);

  const spawnHeart = () => {
    const x = Math.random() * 200;
    const id = Math.random().toString(36).slice(2, 9);
    const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
    setHearts((s) => [...s, { id, x, size: 18 + Math.random() * 18, emoji }]);
    setTimeout(() => setHearts((s) => s.filter((h) => h.id !== id)), 1000);
  };

  const handleToggle = (e) => {
    e?.stopPropagation();
    setOpen((o) => !o);
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

  useEffect(() => {
    if (!locked) {
      const addHeart = (e) => {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        if (x == null || y == null) return;
        const id = Math.random().toString(36).slice(2);
        const emoji = LOVE_EMOJIS[Math.floor(Math.random() * LOVE_EMOJIS.length)];
        setCursorHearts((h) => [...h, { id, x, y, emoji }]);
        setTimeout(() => setCursorHearts((h) => h.filter((c) => c.id !== id)), 800);
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
    return () => { document.body.style.overflow = "auto"; };
  }, [locked]);

  /* ---------- Timeline Events ---------- */
  const timeline = [
    { 
      date: "16 Aug",
      title: "The First Glance",
      desc: `💙 The First Glance — The Moment Everything Changed 💙

I still remember the 18th of August so clearly, as if it’s a memory carved into my heart forever. That was the day I saw you for the very first time — a moment that felt ordinary to the world but absolutely unforgettable to me.

You were standing there in your blue shirt 💙, and somehow that simple color made you look even more enchanting. I swear, for a few seconds, I forgot how to blink. Everything around me blurred, and all I could focus on was you. You looked so cute, so pure, so effortlessly beautiful that it felt like time paused just to let me admire you.

There was something about your presence — something calm, warm, and magical ✨. Your smile 😊 had this softness that could melt any stress away. Your eyes 👀 held a kind of innocence and depth that made me want to know every thought behind them. Even the way you stood, the way you moved, carried a gentle confidence that pulled me in without you even trying.

In that moment, I realized that beauty isn’t just about appearance. It’s about the feeling someone gives you. And you gave me a feeling I had never felt before — a mix of awe, warmth, and a thousand butterflies fluttering in my stomach 🦋.

It was as if all the definitions of beauty — grace, charm, cuteness, elegance, softness — came together and formed you. You weren’t just beautiful… you were breathtaking ❤️.

That first glance became the beginning of a story I didn’t even know I was ready for. A story filled with emotions, hopes, and moments I’d cherish forever.

Sometimes, I still think about that day and smile, because I know that a single look at you in that blue shirt changed something inside me — something real, something lasting 💙..`
    },

    { 
      date: "5 Sept",
      title: "Our First Talk",
      desc: `Then came 5th September, a day that felt just as special as the first time I saw you.
That was the day I finally gathered the courage to speak to you — even if it was only a few words.

It wasn’t a long conversation, just a small moment, a simple exchange… but for me, it meant so much. Those few words felt like a doorway opening, like the first step toward something beautiful.

Your voice, your kindness, the way you replied — it stayed with me. Even that short conversation made my whole day feel brighter. It was small, but to me, it was everything. ❤️`
    },

    { 
      date: "26 Sept",
      title: "I Proposed",
      desc: `Then came 26th September, the day my heart felt heavier than ever — but in the most beautiful way.
For days, I had been noticing you — the way you smiled, the way you carried yourself, the little things that made you who you are. Every day I admired you from a respectful distance, quietly hoping you would someday understand what you meant to me.

And on that day, I finally gathered all the courage inside me and confessed my feelings.
My heart was racing, my thoughts were everywhere, but I knew I had to say it — that I cared for you, that you had become someone incredibly special to me.

After speaking my heart, all I could do was wait…
Waiting for your reply felt like waiting for my whole world to answer back. Each moment felt like days, each day felt like years — filled with hope, nervousness, and the soft fear of the unknown. But even in that uncertainty, there was a strange comfort… because at least you finally knew how I truly felt.

That day wasn’t just a confession… it was the moment I chose honesty, courage, and love ❤️.`
    },

    { 
      date: "29 Sept",
      title: "You Said Yes",
      desc: `29 September — the day you said yes to my proposal 💍❤️
A day I will never forget. Those few days I spent waiting for your answer felt like years… every hour heavy with hope, every minute filled with love and fear.

But when you finally said yes, everything inside me lit up. It felt like the world paused for a moment, just to let my heart breathe again.

That ‘yes’ didn’t just make me happy — it changed my life.
It gave me a future to dream about, a reason to become better, and a love that feels like home.

From that day onwards, everything became more meaningful, more beautiful, because it was with you. ❤️`
    },

    {
      date: "Every Storm",
      title: "Hardships We Faced",
      desc: `💔 The Hardship We Faced — The Storms We Survived Together 💔

Every love story has its beautiful moments, but ours also carried storms that tested our hearts in ways we never expected.
We went through days when misunderstandings clouded our thoughts, when words hurt more than silence, and when distance felt heavier than miles.

There were moments when confusion made us question ourselves, when emotions ran deep, and when handling everything felt overwhelming.

We didn’t always know how to express what we truly felt, and sometimes that silence created cracks we never meant to cause.

But through every hardship, through every tear, through every restless night, one thing remained — the quiet, unspoken bond between us.

Even when things were tough, even when the world felt too heavy, my heart always found its way back to you.

The challenges we faced weren’t signs of weakness; they became proof of how strong our connection truly was.

Because despite everything — the misunderstandings, the pain, the struggles — we still chose to hold on, to believe, and to keep fighting for what we had.

And that is what makes our story real… and worth every moment. ❤️‍🩹`
    },

    {
      date: "Last From The Date, But Never Late To Express",
      title: "Special Message",
      desc: `“I know it’s been almost two months since our anniversary.
I’m late, and that’s because of me — but everything I’ve written here comes straight from my heart.”

I don’t know what the future holds for us, but I want you to know one thing with absolute clarity: you are special to me, and you always will be.

I know I’ve messed things up.
I know I’ve made life harder — for you and for myself.
There are moments where I look back and see how many mistakes I’ve made, how many times my actions hurt you, and it breaks me a little inside.

But behind all that, I’ve been trying.
Trying to improve myself,
trying to grow,
trying to be someone worthy of your love,
even if I fall short again and again.

Sometimes it feels like no matter how hard I try,
I’m still not reaching anywhere…
like I’m just losing everything,
like I’m stuck in the same place and I don’t know where I’m going wrong.

But even on the days when it’s hard,
even on the days when I feel lost,
my feelings for you remain the same —
strong, honest, and real.

I’m trying in every moment.
Trying because you matter to me.
Trying because what we have is worth fighting for.
Trying because I don’t want to lose you.

This is just a small part of my love for you.`
    }
  ];

  return (
    <div className="min-h-screen text-gray-900">
      {locked && <IntroOverlay onUnlock={() => setLocked(false)} />}

      {cursorHearts.map((h) => (
        <CursorHeart key={h.id} x={h.x} y={h.y} emoji={h.emoji} />
      ))}

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

      <main>
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

          {/* TIMELINE FULL WIDTH */}
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

          {/* MOTIVATION CARD */}
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

          {/* POEM CARD */}
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
          <p className="text-sm text-gray-600">
            Made with ❤️BY SURU
          </p>
        </footer>
      </main>

      <StoryModal card={selectedCard} onClose={() => setSelectedCard(null)} />
    </div>
  );
}
