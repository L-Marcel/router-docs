
import { Box, Icon, Input, InputGroup, InputLeftElement, useBreakpointValue } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import { useSearch } from "../../contexts/hooks/useSearch";
import { Button } from "../Button";

function SearchBar() {
  const { search, setSearch } = useSearch();
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
        size="md"
        minW={[null, 200, 300, 400]}
        maxW={["80%", "min-content"]}
        bgColor="white"
        color="gray.400"
        _focusWithin={{
          color: "primary.500"
        }}
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
          focusBorderColor="primary.400"
          pl="35px"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
        />
      </InputGroup>
      { isWideOrNormalVersion && <Button
        ml={5}
        px="30px"
        colorScheme="primary"
        icon={IoMdAdd}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        add project
      </Button>}
    </Box>
  );
};

export { SearchBar };