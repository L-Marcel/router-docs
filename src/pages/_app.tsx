import { AppProps } from "next/app";
import { AllProviders } from "../contexts/AllProviders";
import { theme } from "../theme/default";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AllProviders resetCSS theme={theme}>
      <Component {...pageProps}/>
    </AllProviders>
  );
};

export default MyApp;
