import { motion } from 'framer-motion';
import { useReducedMotion } from '@/motion';

const TAGS = ['Tokyo', 'Bali', 'Paris', 'Adventure', 'Beach', 'Culture'];

export function FloatingTags() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {TAGS.map((tag, i) => (
        <motion.span
          key={tag}
          className="float-tag rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
          style={{ animationDelay: `${i * 0.4}s` }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
