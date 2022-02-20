import { AnimateSharedLayout } from "framer-motion";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);
  
  if (!showChild) {
    return null;
  };

  return (
    <AllProviders resetCSS theme={theme}>
      <AnimateSharedLayout>
        <Component {...pageProps}/>
      </AnimateSharedLayout>
    </AllProviders>
  );
};

export default MyApp;
