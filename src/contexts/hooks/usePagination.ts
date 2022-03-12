import { useContextSelector } from "use-context-selector";
import { appContext } from "../AppContext";

function usePagination() {
  const { currentPage, firstPage, lastPage } = useContextSelector(appContext, c => c.pagination);
  const setPagination = useContextSelector(appContext, c => c.setPagination);
  const setCurrentPage = useContextSelector(appContext, c => c.setCurrentPage);

  return {
    currentPage, 
    firstPage, 
    lastPage,
    setPagination,
    setCurrentPage
  };
};

export { usePagination };