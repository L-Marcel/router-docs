import { AnimateSharedLayout } from "framer-motion";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { useEffect, useState } from "react";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient } from "react-query";

import "focus-visible/dist/focus-visible.min.js";

const queryClient = new QueryClient();

export function reportWebVitals(metric: NextWebVitalsMetric) {
  //console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);
  
  if (!showChild) {
    return null;
  };

  return (
    <AllProviders resetCSS theme={theme} client={queryClient}>
      <AnimateSharedLayout>
        <Component {...pageProps}/>
      </AnimateSharedLayout>
      { process.env.NODE_ENV === "development" &&
        <ReactQueryDevtools position="top-right"/> 
      }
    </AllProviders>
  );
};

export default MyApp;
