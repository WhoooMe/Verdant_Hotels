import { Variants } from "framer-motion";

export const fadeSlideDown: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};
