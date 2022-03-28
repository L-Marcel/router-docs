import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Icon, Tag, Text, Tooltip } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

interface OwnerNavigationVersionItemProps {
  projectVersion: ProjectVersion;
};

function OwnerNavigationVersionItem({ 
  projectVersion
}: OwnerNavigationVersionItemProps) {
  const controls = useDragControls();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { version } = projectVersion;

  return (
    <AccordionItem 
      as={Reorder.Item} 
      value={projectVersion}
      bgColor="gray.100"
      display="flex"
      flexDir="column"
      alignItems="center"
      fontWeight="bold"
      justifyContent="space-between"
      dragListener={false}
      dragControls={controls}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton 
            py={2}
            pl={5}
            pr={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            _hover={{
              filter: "brightness(.98)"
            }}
          >
            <HStack
              spacing={2}
            >
              <AccordionIcon/>
              <Tooltip 
                label="number of routes"
                bgColor="gray.200"
                color="primary.600"
              >
                <Tag
                  bgColor="gray.200"
                  color="primary.500"
                >
                  0
                </Tag>
              </Tooltip>
              <Text
                fontSize={15}
              >
                {version}
              </Text>
            </HStack>
            { !isExpanded && <Icon
              _hover={{
                cursor: isGrabbing? "grabbing":"grab",
                color: "gray.400"
              }}
              as={BsFillGrid3X3GapFill}
              color="gray.300"
              onPointerDown={(e) => {
                controls.start(e);
                setIsGrabbing(true);
              }}
              onPointerUp={() => {
                setIsGrabbing(false);
              }}
            /> }
          </AccordionButton>
          <AccordionPanel>
            
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export { OwnerNavigationVersionItem };