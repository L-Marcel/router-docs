import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppContext";

function useSignOut() {
  const signOut = useContextSelector(appContext, c => c.signOut);
  return signOut;
};

export { useSignOut };