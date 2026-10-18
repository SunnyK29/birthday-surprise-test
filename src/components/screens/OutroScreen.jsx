import { motion } from "framer-motion"
import { ArrowRightIcon } from "lucide-react";

const HeartIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

function OutroScreen({ onNext }) {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center z-10 text-center max-w-md border-4 border-border bg-[#D7FFAE] rounded-4xl p-3 will-change-transform"
        >
            <div className="flex flex-col items-center justify-center border-4 border-border rounded-3xl px-6 py-8 bg-white">
                <motion.div
                    className="mb-8 mt-4 relative"
                >
                    <div className="w-36 h-36 bg-white rounded-full border-8 border-[#FFE29C] shadow-[0px_0px_0px_10px_#FFF8E7] flex items-center justify-center z-10 relative">
                        <HeartIcon className="w-20 h-20 text-[#FF1493]" />
                    </div>
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-caveat font-bold text-[#FF69B4] mb-4 text-balance">
                    You’re so special!
                </h1>

                <p className="text-xl font-medium mb-8">
                    Never forget it.
                </p>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onNext}
                    className="text-[#FF69B4] font-bold py-3 px-6 rounded-full border-4 border-[#FF69B4] bg-white z-20 flex items-center gap-2 mb-2 will-change-transform"
                >
                    Continue to Birthday Surprise <ArrowRightIcon size={18} />
                </motion.button>
            </div>
        </motion.div>
    );
}

export default OutroScreen