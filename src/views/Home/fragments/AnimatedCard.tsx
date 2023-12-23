import { PropsWithChildren } from "react";
import {motion} from 'framer-motion';

const AnimatedCard: React.FC<PropsWithChildren> = ({children}) => (
  <motion.div
    initial={{
      y: -24,
      opacity: 0,
    }}
    whileInView={{
      y: 0,
      opacity: 1,
      transition: {
        y: {
          duration: 0.3,
          ease: "easeInOut",
        },
        opacity: {
          duration: 0.3,
          ease: "easeInOut",
        },
      },
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;