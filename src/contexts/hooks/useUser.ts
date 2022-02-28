import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppContext";

function useUser() {
  const user = useContextSelector(appContext, c => c.user);
  const setUser = useContextSelector(appContext, c => c.setUser);

  return {
    user,
    setUser
  };
};

export { useUser };