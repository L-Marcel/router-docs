import { Box, Heading, Img, Text, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";

import { Layout } from "../components/Layout";
import { fadeToTop } from "../theme/animations";
import { bg } from "../theme/effects/bg";

function Error({ error }) {
  const isWideOrNormalVersion = useBreakpointValue({
    md: true,
    base: false
  });
  
  return (
    <Layout
      title="Routerdocs: Error"
      display="flex"
      justifyContent="center"
      flexDir="row"
      alignItems="center"
    >
      <Heading>{error}</Heading>
    </Layout>
  );
};

Error.getInitialProps = async({ res, err }) => {
  const error = {
    "login": {
      redirect: "/",
      img: "/protection.svg",
      message: "Couldn't authenticate",
      alt: "A boy with orange hair, white shirt and black pants on the side of a big red shield with a key lock icon in the center.  There are papers and a cog in around them too.",
      description: "Our server couldn't authenticate with Github's services. Pleace, try again later. If the problem continue, contact us."
    },
    "404": {
      redirect: "/me/projects",
      img: "/404.svg", 
      message: "We not found the page",
      alt: "A big and red 404 error message with a man with a red shirt and black hair inside the zero number searching something or someone.",
      description: "Our server refused to render this page. If the problem continue, contact us." 
    },
    "408": {
      redirect: "/me/projects",
      img: "/data.svg", 
      message: "Request timeout",
      alt: "A girl with orange hair, red shirt and black pants using a notebook sit on the side of a big data server. On the back of the server have a bit thicker and a cloud floating in the top.",
      description: "Our server is taking a long time to respond. Check your network and if the problem continue, contact us." 
    },
    "400": {
      redirect: "/me/projects",
      img: "/connection.svg", 
      message: "We received a bad request",
      alt: "A girl with orange hair, white shirt and black pants using a notebook sit on top of a red earth globe. Around have three clouds.",
      description: "Our server received an stranger request. Please, try again later. If the problem continue, contact us."
    },
    "401": {
      redirect: "/",
      img: "protection.svg",
      message: "Stop now!",
      alt: "A boy with orange hair, white shirt and black pants on the side of a big red shield with a key lock icon in the center.  There are papers and a cog in around them too.",
      description: "You not have authorization to continue. If this is a mistake, contact us."
    }
  };

  return ({
    props: {
      error: err.statusCode
    }
  });
};

export default Error;