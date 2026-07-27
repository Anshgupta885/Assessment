import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function BackgroundScene() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 18 });
  const orbX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const move = (event) => {
    x.set(event.clientX / window.innerWidth - 0.5);
    y.set(event.clientY / window.innerHeight - 0.5);
  };

  return (
    <div className="scene" onMouseMove={move}>
      <div className="grid" />
      <div className="noise" />
      <motion.div className="orb orb-one" style={{ x: orbX, y: orbY }} />
      <motion.div className="orb orb-two" style={{ x: orbY, y: orbX }} />
      <motion.div
        className="floating-cube"
        animate={{ y: [0, -12, 0], rotateX: [18, 28, 18], rotateY: [-24, -10, -24] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
        <span />
        <span />
      </motion.div>
    </div>
  );
}
