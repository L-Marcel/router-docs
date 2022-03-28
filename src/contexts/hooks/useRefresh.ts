import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppProvider";

function useRefresh() {
  const refresh = useContextSelector(appContext, c => c.refresh);
  const setRefresh = useContextSelector(appContext, c => c.setRefresh);
  const setRefreshRemove = useContextSelector(appContext, c => c.setRefreshRemove);
  const setRefreshUpdate = useContextSelector(appContext, c => c.setRefreshUpdate);

  return {
    refresh,
    setRefresh,
    setRefreshRemove,
    setRefreshUpdate
  };
};

export { useRefresh };