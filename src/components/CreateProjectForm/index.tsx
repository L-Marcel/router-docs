import { FormControl, Stack, Tag, Text} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillFolderOpen, AiOutlineLink } from "react-icons/ai";
import { motion } from "framer-motion";
import { Select } from "../Select";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/hooks/useUser";
import { api } from "../../services/api";
import { Button } from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProjectSchema } from "../../services/validations/frontend/createProjectSchema";
import { useRouter } from "next/router";
import { createProjectFormStyle } from "../../theme/select/createProjectFormStyle";

function CreateProjectForm() {
  const router = useRouter();
  const { user } = useUser();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(createProjectSchema)
  });
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(true);
  const repository = watch("repository");
  const name = watch("name");

  function onSubmit(data: Project) {
    console.log(data);
    api.post("/projects", { 
      ...data,
      version: repositories.find(r => r.fullName === data.repository).version
    }, {
      headers: {
        user: user.id
      }
    }).then((res) => {
      console.log(res.data);
      router.push("/me/projects");
    });
  };

  useEffect(() => {
    if(!!user.id) {
      api.get(`/user/repositories`, {
        headers: {
          user: user.id
        }
      }).then((res) => {
        setIsLoadingRepositories(false);
        setRepositories(res.data);
      });
    };
  }, [setRepositories, user, api]);

  useEffect(() => {
    if(name === undefined) {
      setValue("name", repository);
    } else if(repositories.some(r => r.fullName === name)) {
      setValue("name", repository);
    };
  }, [repository, name]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <FormControl
      as={motion.form}
      mt={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack 
        spacing={3}
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Input
          placeholder="Name"
          icon={MdDriveFileRenameOutline}
          borderRadius={6}
          error={errors["name"]?.message}
          {...register("name")}
        />
        <Select
          options={
            isLoadingRepositories?
              [{ value: "", label: "Loading...", color: "var(--chakra-colors-primary-500)", isDisabled: true }]:
            repositories.length <= 0?
              [{ value: "", label: "No repository found", color: "var(--chakra-colors-primary-500)", isDisabled: true }]:
            repositories.map((r) => {
              return {
                value: r.fullName,
                label: ` ${r.version}#${r.name}`,
                color: "var(--chakra-colors-primary-500)"
              };
            })
          }
          labelFormat={({ label }) => {
            const [version, text] = label.split("#")
            return (
              <Text>
                <Tag 
                  mr={2}
                  colorScheme="primary"
                >
                  {version}
                </Tag>
                {text}
              </Text>
            );
          }}
          borderRadius={6}
          error={errors["repository"]?.message}
          register={register("repository")}
          selectStyles={createProjectFormStyle(6)}
          placeholder="Select repository"
        />
        <Input
          as={motion.textarea}
          pt={2}
          pb={4}
          minH={200}
          maxH={300}
          placeholder="Description"
          icon={BsPencilSquare}
          borderRadius={6}
          error={errors["description"]?.message}
          {...register("description")}
        />
        <Input
          placeholder="Root (default: /)"
          icon={AiFillFolderOpen}
          borderRadius={6}
          error={errors["root"]?.message}
          {...register("root")}
        />
        <Input
          placeholder="Application URL (optional)"
          icon={AiOutlineLink}
          mb={2}
          borderRadius={6}
          error={errors["baseUrl"]}
          {...register("baseUrl")}
        />
        <Button
          colorScheme="primary"
          type="submit"
        >
          create
        </Button>
      </Stack>
    </FormControl>
  );
};

export { CreateProjectForm };