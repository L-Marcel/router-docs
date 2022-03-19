import { Accordion } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { GenerateOptionsItem } from "./GenerateOptionItem";
import { SiPrisma, SiExpress } from "react-icons/si";
import { RiCheckboxMultipleBlankFill, RiCheckboxMultipleBlankLine} from "react-icons/ri";

interface GenerateOptionsProps {
  project: Project;
};

function GenerateOptions({ project }: GenerateOptionsProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { id: "prismic", title: "Basic and prismatic", icon: SiPrisma, isDisabled: !project.havePrisma },
    { id: "express", title: "Big and express", icon: SiExpress, isDisabled: !project.haveExpress },
    { id: "examples", title: "With examples", icon: RiCheckboxMultipleBlankFill },
    { id: "blank", title: "Realy blank", icon: RiCheckboxMultipleBlankLine }
  ];

  return (
    <>
      <Accordion
        as={motion.div}
        maxW={400}
        my={2}
      >
        {
          options.map(o => {
            return (
              <GenerateOptionsItem
                key={o.id}
                isSelected={selectedOption === o.id}
                onClick={() => setSelectedOption(o.id)}
                {...o}
              />
            );
          })
        }
      </Accordion>
    </>
  );
};

export { GenerateOptions };