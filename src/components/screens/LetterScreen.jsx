import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon } from "lucide-react";

const messageStarting = `Hey Cutiepie `;

const specialMessage = `There are so many little things that make you special.
Your kindness, your energy, your little habits, and the way you make me feel comfortable around you...
it all means more than you think.
So whenever you doubt yourself,
just remember that someone out there truly appreciates you exactly the way you are.`;

const messageEnding = `Always Yours!`;

function LetterScreen({ onNext }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="z-10 flex flex-col items-center justify-center w-full relative"
    >
      <div className="mb-8 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold font-caveat text-[#FF69B4] bg-white px-6 py-3 rounded-full border-4 border-[#FFB6C1] shadow-md">
          Special message for special you!
        </h2>
      </div>

      <div
        style={{ perspective: 1200 }}
        className="w-full max-w-sm h-120"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 70,
            damping: 14
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* FRONT */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 bg-[#FFFBF0] rounded-4xl border-4 border-[#FFB6C1] shadow-md flex flex-col items-center justify-center p-6"
          >
            <div className="w-20 h-20 bg-white border-4 border-[#FFB6C1] rounded-full flex items-center justify-center mb-6">
              <HeartIcon className="w-10 h-10 text-[#FF69B4] fill-current" />
            </div>
            <p className="text-[#FF69B4] font-semibold mt-2 text-lg">
              Tap to open ✨
            </p>
          </div>

          {/* BACK */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
            className="absolute inset-0 bg-[#FFFBF0] border-4 border-[#FFB6C1] rounded-4xl shadow-md"
          >
            <div className="h-full w-full p-7 relative flex flex-col">
              <h4 className="font-caveat text-3xl font-bold text-[#FF69B4] mb-4">
                {messageStarting}
              </h4>

              <div
                className="flex-1 overflow-y-auto"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <p className="font-caveat text-2xl leading-relaxed font-bold whitespace-pre-wrap text-[#6D4C41]">
                  {specialMessage}
                </p>
              </div>

              <div className="font-caveat text-3xl text-[#FF69B4] font-bold text-right mt-4">
                {messageEnding}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isFlipped && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="bg-[#FF69B4] text-white text-lg font-bold py-3 px-7 rounded-full border-4 border-[#FF1493] shadow-md mt-8 flex items-center gap-2"
          >
            Continue <HeartIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LetterScreen;