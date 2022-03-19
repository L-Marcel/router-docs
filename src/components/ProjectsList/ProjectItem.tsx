import { Box, BoxProps, Grid, Heading, Img, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeCascate, fadeToTop } from "../../theme/animations";
import { bg } from "../../theme/effects/bg";
import { Button } from "../Button";
import { IoMdOpen } from "react-icons/io";
import { boxShadow } from "../../theme/effects/shadow";
import { RouterTypesCount } from "./RouterTypesCount";
import { ProjectItemRouterTypes } from "./ProjectItemRouterTypes";

interface ProjectItemProps extends BoxProps {
  project: FormattedProject
};

function ProjectItem({ project, ...rest }: ProjectItemProps) {
  const {
    id,
    formattedName: name,
    formattedCreatedAt: createdAt,
    formattedDescription: description
  } = project;

  return (
    <Box
      role="group"
      position="relative"
      as={motion.div}
      display="flex"
      w="100%"
      h={[300, 280, 300, 300, 280, 250]}
      p={8}
      cursor="pointer"
      whileHover={{
        scale: .98,
      }}
      whileTap={{
        scale: .95
      }}
      {...bg({ 
        bg: "gray.50",
        backgroundImage: "url(/assets/innovation.svg)",
        hoverEffectInBefore: true,
        borderBottomColor: "primary.400",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: description.length > 0? 
        ["145px 170px", "280px 150px", "175px 150px", "200px 165px", "175px 150px","220px 150px"]:
        ["70px 65px", "210px 55px", "90px 50px", "150px 60px", "70px 55px","200px 30px"],
        borderBottomWidth: 5,
        opacity: 1,
        brightness: 0.98
      })}
      {...rest}
      {...fadeToTop}
      onClick={() => console.log(id)}
    >
      <Box
        display="flex"
        flexDir="column"
        h="100%"
        justifyContent="space-between"
      >
        <Stack>
          <Heading
            maxW="90%"
            as={motion.h1}
            lineHeight="30px"
            fontSize={30}
            color="primary.800"
            mb={-1}
          >
            {name}
          </Heading>
          <Text
            fontSize={13}
            color="gray.800"
            mb={-2}
          >
            Created at: {createdAt}
          </Text>
          {description && description.length > 0 && <Text
            as={motion.p}
            lineHeight="19px"
            fontSize={[15, 14, 14, 16]}
          >
            {description}
          </Text>}
        </Stack>
        <ProjectItemRouterTypes
          {...project}
        />
      </Box>
      <Button
        position="absolute"
        color="primary.800"
        right={0}
        top={0}
        mr={4}
        mt={4}
        isIconButton
        icon={IoMdOpen}
        _groupHover={{
          scale: 1.1,
          ...boxShadow(true)
        }}
        _active={{
          bgColor: "gray.100"
        }}
      />
    </Box>
  );
};

export { ProjectItem };