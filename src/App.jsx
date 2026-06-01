import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import StitchPixel from "./components/StitchPixel";

function App() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    const nextState = !open;
    setOpen(nextState);

    if (nextState) {
      confetti({
        particleCount: 200,
        spread: 110,
        origin: { y: 0.6 },
      });
    }
  }

  const sakuraPetals = ["🌸", "🌸", "🌸", "❀", "✿"];

  const backgroundFlowers = [
    "#f5a3b7",
    "#ffcf56",
    "#c084fc",
    "#fb7185",
    "#60a5fa",
    "#f9a8d4",
  ];

  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#d7f5e7] via-[#ffe4ef] to-[#fff3c4] p-4">
      {/* background*/}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-pink-300 blur-3xl opacity-30 top-[-120px] left-[-120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-yellow-300 blur-3xl opacity-30 bottom-[-120px] right-[-120px]"
        animate={{ scale: [1.1, 0.95, 1.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Background flower vines */}
      <svg
        className="absolute inset-0 w-full h-full z-0 opacity-70 pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          d="M60 80 C180 220, 20 360, 150 520 C260 660, 90 800, 220 950"
          stroke="#7fa45b"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M940 70 C800 230, 980 390, 830 540 C710 680, 900 810, 760 960"
          stroke="#7fa45b"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M180 980 C350 850, 520 990, 700 850 C820 760, 890 700, 960 610"
          stroke="#8fbf63"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {[
          [90, 150], [130, 300], [100, 460], [180, 620], [145, 790],
          [900, 150], [850, 310], [910, 470], [805, 650], [850, 820],
          [280, 900], [430, 900], [620, 885], [760, 790],
        ].map(([x, y], index) => (
          <g key={index}>
            <ellipse
              cx={x - 18}
              cy={y}
              rx="10"
              ry="22"
              fill="#7fb069"
              transform={`rotate(-35 ${x - 18} ${y})`}
            />
            <ellipse
              cx={x + 18}
              cy={y}
              rx="10"
              ry="22"
              fill="#8fbc5a"
              transform={`rotate(35 ${x + 18} ${y})`}
            />

            <circle cx={x} cy={y} r="12" fill={backgroundFlowers[index % backgroundFlowers.length]} />
            <circle cx={x - 14} cy={y} r="11" fill={backgroundFlowers[index % backgroundFlowers.length]} />
            <circle cx={x + 14} cy={y} r="11" fill={backgroundFlowers[index % backgroundFlowers.length]} />
            <circle cx={x} cy={y - 14} r="11" fill={backgroundFlowers[index % backgroundFlowers.length]} />
            <circle cx={x} cy={y + 14} r="11" fill={backgroundFlowers[index % backgroundFlowers.length]} />
            <circle cx={x} cy={y} r="6" fill="#b45309" />
          </g>
        ))}
      </svg>

      {/* falling petals */}
      {Array.from({ length: 34 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-pink-300 pointer-events-none z-[1]"
          style={{
            left: `${(index * 29) % 100}%`,
            top: "-80px",
            fontSize: `${18 + (index % 4) * 5}px`,
            opacity: 0.75,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [
              0,
              index % 2 === 0 ? 90 : -90,
              index % 3 === 0 ? 40 : -40,
              0,
            ],
            rotate: [0, 120, 260, 360],
          }}
          transition={{
            duration: 8 + (index % 9),
            repeat: Infinity,
            delay: index * 0.28,
            ease: "linear",
          }}
        >
          {sakuraPetals[index % sakuraPetals.length]}
        </motion.div>
      ))}

      {/* Main card wrapper */}
      <div className="relative z-10 w-full max-w-[720px] h-[690px] flex items-center justify-center">
        {/* Stitch pixel character */}
        <motion.div
          className="absolute z-30 left-[-30px] bottom-[120px] origin-bottom-left"
          animate={{
            opacity: open ? 0 : 1,
            x: open ? -90 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          style={{
            pointerEvents: open ? "none" : "auto",
          }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <StitchPixel />
          </motion.div>
        </motion.div>

        {/* Floral vine frame around card */}
        <motion.svg
          viewBox="0 0 500 650"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          fill="none"
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            opacity: open ? 0 : 1,
            scale: open ? 1.12 : 1,
            rotate: open ? 5 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <path
            d="M95 60 C45 150, 70 250, 60 340 C50 440, 95 520, 110 600"
            stroke="#7a9f45"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M405 60 C455 150, 430 250, 440 340 C450 440, 405 520, 390 600"
            stroke="#7a9f45"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M100 70 C190 20, 310 20, 400 70"
            stroke="#7a9f45"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M110 590 C200 640, 300 640, 390 590"
            stroke="#7a9f45"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {[
            [80, 130], [70, 210], [75, 300], [70, 410], [95, 520],
            [420, 130], [430, 220], [425, 310], [430, 420], [405, 530],
            [170, 45], [260, 35], [330, 50], [170, 610], [260, 625], [330, 605],
          ].map(([x, y], i) => (
            <ellipse
              key={`leaf-${i}`}
              cx={x}
              cy={y}
              rx="9"
              ry="18"
              fill="#8fbc5a"
              transform={`rotate(${i % 2 === 0 ? 35 : -35} ${x} ${y})`}
            />
          ))}

          {[
            [70, 160], [85, 360], [115, 540],
            [430, 170], [415, 365], [385, 545],
            [245, 42], [250, 613],
          ].map(([x, y], i) => (
            <g key={`flower-${i}`}>
              <circle cx={x} cy={y} r="8" fill={backgroundFlowers[i % backgroundFlowers.length]} />
              <circle cx={x - 10} cy={y} r="8" fill={backgroundFlowers[i % backgroundFlowers.length]} />
              <circle cx={x + 10} cy={y} r="8" fill={backgroundFlowers[i % backgroundFlowers.length]} />
              <circle cx={x} cy={y - 10} r="8" fill={backgroundFlowers[i % backgroundFlowers.length]} />
              <circle cx={x} cy={y + 10} r="8" fill={backgroundFlowers[i % backgroundFlowers.length]} />
              <circle cx={x} cy={y} r="5" fill="#d88461" />
            </g>
          ))}
        </motion.svg>

        {/* Actual card */}
        <div
          className="relative w-[78%] h-[76%] z-10"
          style={{ perspective: "2000px" }}
        >
          {/* Inside card */}
          <div className="absolute inset-0 bg-white/95 rounded-[35px] shadow-2xl border-[5px] border-pink-300 flex flex-col items-center justify-center text-center p-8 z-10">
            <motion.div
              className="text-7xl mb-5"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎂
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-5">
              Happy Birthday Vinuki !!!
            </h1>

            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              Wishing you a great and an amzaing day and an amazing year ahead and great awesome success in everything you do !!!!
            </p>

          </div>

          {/* Front cover */}
          <motion.div
            animate={{ rotateY: open ? -165 : 0 }}
            transition={{ duration: 1.2 }}
            style={{
              transformOrigin: "left",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            className="absolute inset-0 rounded-[35px] shadow-2xl border-[5px] border-white bg-gradient-to-br from-pink-500 via-rose-400 to-yellow-300 flex flex-col items-center justify-center text-white text-center p-8 z-20"
          >
            <motion.div
              animate={{
                opacity: open ? 0 : 1,
                scale: open ? 0.8 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🥳
              </motion.div>

              <h2
                className="text-4xl sm:text-5xl text-white"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                }}
              >
                Happyyy Birthdayyy
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={handleOpen}
        className="absolute bottom-6 z-30 bg-pink-600 hover:bg-pink-700 transition text-white px-10 py-4 rounded-full text-lg sm:text-xl font-bold shadow-xl"
      >
        {open ? "Close Card" : "Open Card"}
      </button>
    </div>
  );
}

export default App;