import { Accordion } from "@chakra-ui/react";
import { m } from "framer-motion";
import { useState } from "react";
import { GenerateOptionsItem } from "./GenerateOptionItem";
import { generateOptions } from "../../utils/generateOptions";

interface GenerateOptionsProps {
  project: Project;
  selectedVersion: {
    id: string;
    version: string;
  };
};

function GenerateOptions({ 
  project,
  selectedVersion
}: GenerateOptionsProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const options = generateOptions(project);

  return (
    <>
      <Accordion
        as={m.div}
        maxW={400}
        my={2}
        alignItems="flex-start"
        filter="drop-shadow(0px 0px 0px rgba(0, 0, 0, 0))"
        whileHover={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
        whileTap={{
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        }}
      >
        {
          options.map(o => {
            return (
              <GenerateOptionsItem
                key={o.id}
                isSelected={selectedOption === o.id}
                onClick={() => setSelectedOption(o.id)}
                project={project}
                selectedVersion={selectedVersion}
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