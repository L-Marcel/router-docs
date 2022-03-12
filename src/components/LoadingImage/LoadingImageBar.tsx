import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeToTop } from "../../theme/animations";
import { LoadingImageBarNotAnimatedPath } from "./LoadingImageBarNotAnimatedPath";

interface LoadingImageBarProps {
  endPercent?: number;
  increment?: number;
  autoIncrement?: boolean;
  startPercent?: number;
  onEndLoading?: () => void;
};

function LoadingImageBar({ 
  endPercent = 100, 
  increment = 20, 
  autoIncrement = false, 
  startPercent = 0,
  onEndLoading
}: LoadingImageBarProps) {
  const [showText, setShowText] = useState(false);
  const [percent, setPercent] = useState(startPercent);
  const [text, setText] = useState("");

  useEffect(() => {
    let interval;

    if(percent < endPercent) {
      if(percent >= 38 && !showText) {
        setShowText(true);
      };

      if(autoIncrement) {
        interval = setInterval(() => {
          setPercent(p => p += increment);
          clearInterval(interval);
        }, 700);
      };
    } else {
      interval = setInterval(() => {
        onEndLoading && onEndLoading();
        clearInterval(interval);
      }, 1500);
    };

    return () => clearInterval(interval);
  }, [percent]);

  useEffect(() => {
    let interval;

    if(showText) {
      interval = setInterval(() => {
        const values = {
          "Carregando.": "Carregando..",
          "Carregando..": "Carregando...",
          "Carregando...": "Carregando.",
          "": "Carregando."
        };
  
        setText(p => values[p]);
        clearInterval(interval);
      }, 1000);
    };

    return () => clearInterval(interval);
  }, [showText, text]);

  const realValue = percent < 20? 19:percent;

  return (
    <svg 
      style={{
        zIndex: 5
      }} 
      id="Layer_1" 
      data-name="Layer 1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 436.02 275.39" 
      width="406" 
      height="306"
    >
      <motion.rect 
        x="8.74" y="145.63" 
        rx="23.59" 
        fill="#dc605c"
        height="47.17"
        width="60px"
        style={{
          minWidth: "60px"
        }}
        animate={{
          width: `${(418/100)*realValue}px`
        }}
      ></motion.rect>
      {
        realValue >= increment && <motion.text  
        y="176" 
        fill="white" 
        fontSize="20px"
        x="20px"
        animate={{
          x: `${(418/100)*realValue -(String(realValue).length + 1)*(23 - String(realValue).length + 1)}px`
        }}
        >{percent}%</motion.text>
      }
      { text !== "" && <motion.text 
        x="20" 
        y="176" 
        fill="white" 
        fontSize="20px"
        {...fadeToTop}
      >{text}</motion.text>}
      <LoadingImageBarNotAnimatedPath/>
    </svg>
  );
};

export { LoadingImageBar };