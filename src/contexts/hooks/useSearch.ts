import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppProvider";

function useSearch() {
  const search = useContextSelector(appContext, c => c.search);
  const setSearch = useContextSelector(appContext, c => c.setSearch);

  return {
    search,
    setSearch
  };
};

export { useSearch };