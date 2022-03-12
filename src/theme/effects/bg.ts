import { BoxProps } from "@chakra-ui/react";
import { boxShadow } from "./shadow";
import style from "../sass/bg.module.scss";

interface BgOptions extends BoxProps { 
  hoverEffect?: boolean;
  cursorPointer?: boolean;
  stickyMode?: boolean;
  hoverEffectInBefore?: boolean;
  brightness?: number;
};

function bg({ 
  bg = "white", 
  opacity = 0.6, 
  hoverEffect = false, 
  cursorPointer = false, 
  borderRadius = 15,
  stickyMode = false,
  hoverEffectInBefore = false,
  brightness = 0.92,
  ...rest
}: BgOptions) {
  return {
    position: "relative",
    bg: "transparent",
    _before: {
      content: `""`,
      position: "absolute",
      top: 0,
      left: 0,
      w: "100%",
      h: "100%",
      zIndex: -5,
      opacity: stickyMode? 1:opacity,
      bg: stickyMode? "whitesmoke":bg,
      borderRadius,
      ...rest,
      ...boxShadow(),
    },
    _hover: hoverEffect && {
      filter: `brightness(${brightness})`,
      cursor: cursorPointer? "pointer":null
    },
    css: {
      "&": {
        "--bn": `${brightness}`
      }
    },
    className: hoverEffectInBefore && `${style.bgHoverBefore} ${cursorPointer? style.bgHoverCursorPointer:""}`
  } as BoxProps;
};

export { bg };