import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppContext";

function useCustomToast() {
  const toast = useContextSelector(appContext, c => c.callToast);

  return toast;
};

export { useCustomToast };