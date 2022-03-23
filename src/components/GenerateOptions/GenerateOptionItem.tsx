import { AccordionButton, AccordionItem, AccordionItemProps, AccordionPanel, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTop } from "../../theme/animations";
import { IconType } from "react-icons";
import { Button } from "../Button";
import { api } from "../../services/api";
import RealtimeClient from "../../services/pusher/client";
import { getProjectChannel } from "../../utils/getProjectChannel";
import { useRealtimeProgressState } from "../../contexts/hooks/useRealtimeProgressState";
import { sleep } from "../../utils/sleep";
import { useRouter } from "next/router";

interface GenerateOptionsItemProps extends AccordionItemProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  project: Project;
  title: string;
  description?: string;
  selectedVersion: {
    id: string;
    version: string;
  };
  icon?: IconType;
  onClick?: () => void;
};

function GenerateOptionsItem({ 
  title, 
  isSelected = false,
  isDisabled = false,
  description,
  project,
  selectedVersion,
  onClick,
  icon,
  ...rest
}: GenerateOptionsItemProps) {
  const route = useRouter();
  const { 
    setRealtimeProgressState,
    resetRealtimeProgressState
  } = useRealtimeProgressState();
  async function handleStartGeneration() {
    const v = selectedVersion;
    const channel = getProjectChannel(project, v);
    
    RealtimeClient.event<RealtimeProgressState>(channel, "template", async(data) => {
      setRealtimeProgressState({
        ...data
      });

      if(data.progress >= 100) {
        RealtimeClient.removeChannel(channel);
        await sleep(5000);
        route.push(`/me/projects/${project.id}`).then(() => {
          resetRealtimeProgressState();
        });
      };
    });

    setRealtimeProgressState({
      progress: 0,
      state: "Loading",
      message: "Sending request..."
    });

    api.post("/projects/doc/generate/blank", {
      project: project.id,
      version: v.version,
      id: v.id === "new" || 
      v.id === "invalid"? 
      undefined:v.id
    });
  };

  return (
    <AccordionItem
      isDisabled={isDisabled}
      as={motion.div}
      display="flex"
      flexDir="column"
      alignItems="center"
      minH={30}
      borderBottom="1px solid"
      bgColor={isDisabled? "gray.100":"gray.50"}
      color="primary.700"
      _hover={!isDisabled && {
        cursor: "pointer",
        bgColor: "primary.50",
        borderColor: !isSelected && 
        "var(--chakra-colors-primary-100)!important"
      }}
      borderColor={isSelected? 
        "var(--chakra-colors-primary-500)!important":
        "var(--chakra-colors-gray-200)!important"
      }
      _first={{
        borderTopRadius: 6,
        "button#accodion-button:first-of-type": {
          borderTopRadius: 6,
        }
      }}
      _last={{
        borderBottomRadius: 6,
        "button#accodion-button:first-of-type": {
          borderBottomRadius: !isSelected? 6:0,
        }
      }}
      {...rest}
      {...fadeToTop}
    >
      <AccordionButton
        id="accordion-button"
        px={5}
        pt={5}
        pb={isSelected? 1:5}
        onClick={() => onClick()}
        _hover={{}} //reset
      >
        <Icon 
          as={icon}
          mr={2}
        />
        <Text 
          as={motion.p}
          fontWeight="bold"
          {...fadeToTop}
        >
          {title}
        </Text>
      </AccordionButton>
      <AccordionPanel 
        pb={5} 
        px={5} 
        pt={0}
        display="flex"
        flexDir="column"
      >
        <Text 
          mb={3}
          whiteSpace="pre-wrap"
        >
          {description}
        </Text>
        <Button
          colorScheme="primary"
          alignSelf="flex-start"
          w="min-content"
          onClick={handleStartGeneration}
          disabled={selectedVersion.id === "" && selectedVersion.version === ""}
        >
          continue
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};

export { GenerateOptionsItem };