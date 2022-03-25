import { BiError } from "react-icons/bi";
import { Button } from "../components/Button";
import { MdClose } from "react-icons/md";
import { Box, Heading, Icon, HStack, Stack, Text, Tag } from "@chakra-ui/react";
import { boxShadow } from "../theme/effects/shadow";

function Toast({
  title,
  description,
  status,
  type,
  onClose
}: ToastData) {
  const { 
    color,
    icon
  } = {
    "error": {
      color: "primary",
      icon: BiError
    }
  }[type];

  return (
    <Box
      m={5}
      minW={[200]}
      minH={[50]}
      bgColor={`${color}.50`}
      borderRadius={8}
      borderLeft="2px solid"
      borderColor={`${color}.500`}
      p={3}
      {...boxShadow()}
    >
      <HStack>
        <Icon
          color={`${color}.500`}
          as={icon}
          w={25}
          h={25}
          alignSelf="flex-start"
        />
        <Stack spacing="2px">
          <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack spacing="5px">
              {status && <Tag
                size="sm"
                colorScheme={color}
                variant="solid"
              >
                {status}
              </Tag>}
              <Heading
                lineHeight="initial"
                fontSize={18}
                color={`${color}.500`}
              >
                {title
                  .replace(String(status), "")
                  .replace("with status code", "")
                }
              </Heading>
            </HStack>
            <Button
              alignSelf="flex-start"
              colorScheme={color}
              h={5}
              minW={5}
              ml={5}
              isIconButton 
              icon={MdClose}
              onClick={onClose}
            />
          </Box>
          {description && <Text>
            {description}
          </Text>}
        </Stack>
      </HStack>
    </Box>
  );
};

export { Toast };