import { AnimationProps } from "framer-motion";

const fadeCascate = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  }
};

const fadeToTop = {
  variants: {
    hidden: { 
      y: 20,
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1
    }
  }
};

const fadeOutToBottom = {
  variants: {
    hidden: { 
      y: 0,
      opacity: 1
    },
    visible: {
      y: -20,
      opacity: 0,
      transition: {
        duration: .5
      }
    }
  }
};

const fadeOutToBottomWithoutLayout = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { 
      y: 0,
      opacity: 1
    },
    visible: {
      y: 20,
      opacity: 0,
      transition: {
        duration: .5
      }
    }
  }
};

const fadeToRight = {
  variants: {
    hidden: { 
      x: -20,
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1
    }
  }
};

const expandToRight = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { 
      scaleX: 0,
      x: -20
    },
    visible: {
      scaleX: 1,
      x: 0,
      transition: {
        delay: .1,
      }
    }
  }
};

const expandToLeft = {
  initial: "hidden",
  animate: "visible",
  variants: {
    hidden: { 
      scaleX: 0,
      x: 20
    },
    visible: {
      scaleX: 1,
      x: 0,
      transition: {
        delay: .1,
      }
    }
  }
};

const zeroGravity = {
  initial: "start",
  animate: "end",
  variants: {
    start: {
      y: 0,
      x: 0
    },
    end: {
      y: 15,
      x: 5,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5
      }
    }
  },
};

const zeroGravityReverse = {
  initial: "start",
  animate: "end",
  variants: {
    start: {
      y: 15,
      x: 5
    },
    end: {
      y: 0,
      x: 0,
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 5
      }
    }
  },
};


export {
  fadeCascate,
  fadeOutToBottomWithoutLayout,
  fadeToTop,
  fadeToRight,
  expandToRight,
  expandToLeft,
  zeroGravity,
  zeroGravityReverse,
  fadeOutToBottom
};