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

export {
  fadeCascate,
  fadeToTop,
  expandToRight,
  expandToLeft
};