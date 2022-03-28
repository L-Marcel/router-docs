import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { AppProps, NextWebVitalsMetric } from "next/app";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient } from "react-query";

import "focus-visible/dist/focus-visible.min.js";
import dynamic from "next/dynamic";

const DynamicAnimateSharedLayout = dynamic(() => import("framer-motion")
.then(mod => mod.AnimateSharedLayout), {
  ssr: false
});

const queryClient = new QueryClient();

export function reportWebVitals(metric: NextWebVitalsMetric) {
  //console.log(metric);
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders resetCSS theme={theme} client={queryClient}>
      <LazyMotion features={domAnimation}>
        <DynamicAnimateSharedLayout/>
          <MotionConfig
            reducedMotion="user"
          >
            <Component {...pageProps}/>
          </MotionConfig>
        <DynamicAnimateSharedLayout/>
      </LazyMotion>
      { process.env.NODE_ENV === "development" &&
        <ReactQueryDevtools position="top-right"/> 
      }
    </AllProviders>
  );
};

export default MyApp;
