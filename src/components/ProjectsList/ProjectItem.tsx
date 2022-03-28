import { Box, BoxProps, Heading, Stack, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTop } from "../../theme/animations";
import { bg } from "../../theme/effects/bg";
import { Button } from "../Button";
import { IoMdOpen } from "react-icons/io";
import { boxShadow } from "../../theme/effects/shadow";
import { ProjectItemRouterTypes } from "./ProjectItemRouterTypes";
import { useRouter } from "next/router";

interface ProjectItemProps extends BoxProps {
  project: FormattedProject
};

function ProjectItem({ project, ...rest }: ProjectItemProps) {
  const router = useRouter();

  const {
    id,
    formattedName: name,
    formattedCreatedAt: createdAt,
    formattedDescription: description
  } = project;

  return (
    <Box
      position="relative"
      as={m.div}
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
        opacity: 1
      })}
      {...rest}
      {...fadeToTop}
      onClick={() => router.push(`/me/projects/${id}`)}
    >
      <Box
        display="flex"
        flexDir="column"
        h="100%"
        justifyContent="space-between"
      >
        <Stack>
          <Heading
            maxW="100%"
            as={m.h1}
            lineHeight={["20px", "22px", "30px"]}
            fontSize={[20, 22, 30]}
            color="primary.800"
            mb={-1}
          >
            {name}
          </Heading>
          <Text
            fontSize={13}
            as={m.p}
            color="gray.800"
            mb={-2}
          >
            Created at: {createdAt}
          </Text>
          {description && description.length > 0 && <Text
            as={m.p}
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
        _active={{
          bgColor: "gray.100"
        }}
      />
    </Box>
  );
};

export { ProjectItem };