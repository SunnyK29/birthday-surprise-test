import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

function IntroScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center z-10 text-center max-w-md border-4 border-border bg-[#BBDBFD] shadow-md rounded-4xl p-3 will-change-transform"
    >
      <div className="flex flex-col items-center justify-center border-4 border-border rounded-3xl  px-4 py-8 bg-white">
        <motion.div
          className="mb-8"
        >
          <div className="w-32 h-32 bg-white rounded-4xl border-4 border-[#FFB6C1] shadow-md flex items-center justify-center relative">
            <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hey.webp`} alt="cute bear" className="absolute -bottom-1.5 z-10" />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-semibold mb-4 text-[#FF69B4] font-caveat text-center">
          Hi Cutie :)
        </h1>
        <p className="text-lg md:text-xl font-medium mb-8">
          I made a little something just for you. Ready to see why you're so special?
        </p>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="bg-[#FF69B4] text-white text-xl font-bold py-4 px-8 rounded-full shadow-md border-4 border-[#FF1493] will-change-transform flex items-center gap-2"
        >
          Let's Go! <HeartIcon className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default IntroScreen