
import { Box, Icon, Input, InputGroup, InputLeftElement, useBreakpointValue } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useSearch } from "../../contexts/hooks/useSearch";
import { Button } from "../Button";
import { DebounceInput } from "react-debounce-input";
import { fadeToTop } from "../../theme/animations";
import { motion } from "framer-motion";

function SearchBar() {
  const { setSearch } = useSearch();
  const isWideOrNormalVersion = useBreakpointValue({
    md: true,
    base: false
  });

  return (
    <Box
      display="flex"
      alignSelf="center"
      justifySelf="center"
      minW={["100%", "min-content"]}
      mr={1}
      ml={[2, 4]}
    >
      <InputGroup
        as={motion.div}
        size="md"
        minW={[null, 300, 200, 200, 300, 400]}
        maxW={["80%", "min-content"]}
        color="primary.500"
        _focusWithin={{
          color: "primary.500"
        }}
        {...fadeToTop}
      >
        <InputLeftElement
          pointerEvents='none'
        >
          <Icon 
            as={BiSearchAlt} 
            color="currentColor"
            w={19}
            h={19}
          />
        </InputLeftElement>
        <Input
          bgColor="white"
          as={DebounceInput}
          borderColor="var(--chakra-color-primary-400)!important"
          focusBorderColor="primary.400"
          pl="35px"
          placeholder="Search by name"
          minLength={2}
          debounceTimeout={500}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
      { isWideOrNormalVersion && <Button
        ml={5}
        px={4}
        colorScheme="primary"
        display="flex"
        justifyContent="center"
        alignItems="center"
        href="/me/projects/create"
      >
        add project
      </Button>}
    </Box>
  );
};

export { SearchBar };