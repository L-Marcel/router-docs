import { Tag, TagProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTop } from "../../theme/animations";

interface RouterTypesCount extends TagProps {
  insiderTagProps?: TagProps,
  count?: number;
  text: string;
};

function RouterTypesCount({
  count = 0,
  text,
  insiderTagProps,
  ...rest
}: RouterTypesCount) {
  return (
    <Tag
      as={m.div}
      pl={0}
      textTransform="capitalize"
      w="min-content"
      {...rest}
      colorScheme="gray"
      {...fadeToTop}
    >
      <Tag
        borderRightRadius={0}
        colorScheme={rest.colorScheme}
        mr={2}
        {...insiderTagProps}
      >{count}</Tag>
      {text}
    </Tag>
  );
};

export { RouterTypesCount };