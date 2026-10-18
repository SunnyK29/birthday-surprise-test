import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

const REASONS = [
  "Your smile feels comforting 🤍",
  "You make people feel safe ✨",
  "Your energy is adorable 🌷",
  "You care more than you show 💖",
  "You’re one of a kind 🥹"
];

function ReasonScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="w-full flex flex-col items-center justify-center z-10 px-4"
    >
      <div className="text-center mb-8">
        <h2
          className="text-4xl md:text-5xl font-semibold font-caveat text-[#FF69B4] mb-2 bg-white px-6 py-3 sm:px-8 sm:py-4 rounded-full border-4 border-[#FFB6C1] shadow-md"
        >
          Why you're special?
        </h2>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        {REASONS.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 bg-white border-3 border-[#FFB6C1] rounded-full px-4 py-3 shadow-sm"
          >
            <HeartIcon className="w-5 h-5 text-[#FF69B4] fill-current shrink-0" />

            <p className="text-sm sm:text-base font-semibold text-[#6D4C41]">
              {reason}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="bg-[#FF69B4] text-white text-lg font-bold py-3 px-7 rounded-full shadow-md border-4 border-[#FF1493] mt-8 flex items-center gap-2"
      >
        Read Letter 💌
      </motion.button>
    </motion.div>
  );
}

export default ReasonScreen;