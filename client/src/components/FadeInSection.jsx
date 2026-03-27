import { motion } from "framer-motion";

function FadeInSection({
  children,
  delay = 0,
  duration = 0.5,
  y = 40,
  once = true
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeInSection;