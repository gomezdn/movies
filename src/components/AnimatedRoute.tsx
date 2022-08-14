import { motion } from 'framer-motion';

export function AnimatedRoute(props: { content: JSX.Element }) {
  return (
    <motion.div
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.content}
    </motion.div>
  );
}
