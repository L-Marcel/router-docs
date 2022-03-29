import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, Icon, Tag, Text, Tooltip } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

interface OwnerNavigationRouteItemProps {
  route: Route;
};

function OwnerNavigationRouteItem({ 
  route
}: OwnerNavigationRouteItemProps) {
  const controls = useDragControls();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { name } = route;

  return (
    <Box
      as={Reorder.Item} 
      value={route}
      bgColor="gray.100"
      display="flex"
      flexDir="column"
      w="100%"
      fontWeight="medium"
      justifyContent="space-between"
      dragListener={false}
      dragControls={controls}
      pl={4}
    >
      <Box 
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
        <Text
          fontSize={15}
        >
          {name}
        </Text>
        <Icon
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
        />
      </Box>
    </Box>
  );
};

export { OwnerNavigationRouteItem };