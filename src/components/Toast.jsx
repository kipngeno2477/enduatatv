import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-[9999] bg-slate-800 border border-slate-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 max-w-sm"
          style={{ borderLeft: '4px solid #dc2626' }}
        >
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
