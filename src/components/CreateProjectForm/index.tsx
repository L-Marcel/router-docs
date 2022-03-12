import { FormControl, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { Select } from "../Select";

function CreateProjectForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <FormControl
      as={motion.form}
      mt={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <Input
          maxW="25%"
          placeholder="Project name"
          icon={MdDriveFileRenameOutline}
          {...register("example")}
        />
        <Select
          maxW="25%"
          placeholder="Project repository"
          onChange={() => {}}
          options={[
            { value: "Example", label: "Example", color: "var(--chakra-colors-primary-500)" },
            { value: "Example2", label: "Example2", color: "var(--chakra-colors-gray-500)" }
          ]}
        >
        </Select>
        <Input
          maxW="25%"
          placeholder="Project name"
          icon={MdDriveFileRenameOutline}
          {...register("name")}
        />
      </Stack>
    </FormControl>
  );
};

export { CreateProjectForm };