import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,  HStack, Icon, Tag, Text, Tooltip } from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { usePORoutes } from "../../contexts/hooks/ProjectOwner/usePORoutes";
import { OwnerNavigationRouteItem } from "./OwnerNavigationRouteItem";

interface OwnerNavigationVersionItemProps {
  projectVersion: ProjectVersion;
};

function OwnerNavigationVersionItem({ 
  projectVersion
}: OwnerNavigationVersionItemProps) {
  const controls = useDragControls();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { version, id: versionId } = projectVersion;
  const { getRoutes, setRoutes } = usePORoutes();
  const routes = getRoutes(versionId);

  function handleOnChangeRouteOrder(routes: Route[]) {
    setRoutes(versionId, routes);
  };

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
                  {routes?.length}
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
          {routes?.length > 0? <AccordionPanel
            borderTop="2px solid"
            borderColor="gray.200"
            w="100%"
            display="flex"
            flexDir="column"
            p={0}
            as={Reorder.Group}
            axis="y"
            values={routes} 
            onReorder={handleOnChangeRouteOrder}
          >
            {routes.map(r => 
              <OwnerNavigationRouteItem 
                route={r}
                key={r.id}
              />
            )}
          </AccordionPanel>:<AccordionPanel>
            
          </AccordionPanel>}
        </>
      )}
    </AccordionItem>
  );
};

export { OwnerNavigationVersionItem };