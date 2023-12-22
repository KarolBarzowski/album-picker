import { PropsWithChildren } from "react";
import {motion} from 'framer-motion';

const AnimatedCard: React.FC<PropsWithChildren> = ({children}) => (
  <motion.div
    initial={{
      x: -48,
      opacity: 0,
    }}
    whileInView={{
      x: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 0.6,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.6,
          ease: "easeInOut",
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;