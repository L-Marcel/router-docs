import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppProvider";

function useRealtimeProgressState() {
  const realtimeProgressState = useContextSelector(appContext, c => c.realtimeProgressState);
  const setRealtimeProgressState = useContextSelector(appContext, c => c.setRealtimeProgressState);
  const resetRealtimeProgressState = useContextSelector(appContext, c => c.resetRealtimeProgressState)

  return {
    realtimeProgressState,
    setRealtimeProgressState,
    resetRealtimeProgressState
  };
};

export { useRealtimeProgressState };