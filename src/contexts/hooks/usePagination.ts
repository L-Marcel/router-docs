import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppContext";

function usePagination() {
  const pagination = useContextSelector(appContext, c => c.pagination);
  const setCurrentPage = useContextSelector(appContext, c => c.setCurrentPage);

  return {
    pagination,
    setCurrentPage
  };
};

export { usePagination };