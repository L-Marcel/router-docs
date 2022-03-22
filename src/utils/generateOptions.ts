import { RiCheckboxMultipleBlankFill, RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { SiExpress, SiPrisma } from "react-icons/si";

function generateOptions(p: Project) {
  return [
    { 
      id: "prismic", 
      title: "Basic and prismatic", 
      icon: SiPrisma, 
      isDisabled: !p.havePrisma,
      description: "This method verify the Prisma scheme file to extract all models and generate a CRUD for each with " + 
      "the route, parameters, and response expected. \n\nFor default, the Router Docs add a description to models."
    },
    { 
      id: "express", 
      title: "Big and express", 
      icon: SiExpress, 
      isDisabled: !p.haveExpress,
      description: ""
    },
    { 
      id: "examples", 
      title: "With examples", 
      icon: RiCheckboxMultipleBlankFill,
      description: "A template with some examples to help in your first document. Entities, routes, and other " +
      "features not will extract of your repository.\n\nYou can override all so later with a dynamic generation method." + 
      "\n\nManually is an option too."
    },
    { 
      id: "blank", 
      title: "Realy blank", 
      icon: RiCheckboxMultipleBlankLine,
      description: "Just a blank template. Entities, routes, and other features not will extract of your repository." +
      "\n\nYou can override all so later with a dynamic generation method.\n\nManually is an option too."
    }
  ];
};

export { generateOptions };