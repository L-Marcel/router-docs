import { User } from "@prisma/client";
import { useCallback, useState } from "react";
import { createContext } from "use-context-selector";

export const appContext = createContext({} as AppContext);

function AppProvider({ children }) {
  const [refresh, setRefresh] = useState<Refresh>({
    remove: () => {},
    update: () => {}
  });
  const _setRefresh = useCallback((refresh: Refresh) => 
    setRefresh(refresh), 
  [setRefresh]);
  const _setRefreshRemove = useCallback((remove: () => void) => 
    setRefresh(r => {
      return {
        ...r,
        remove
      };
    }), 
  [setRefresh]);
  const _setRefreshUpdate = useCallback((remove: () => void) => 
    setRefresh(r => {
      return {
        ...r,
        remove
      };
    }), 
  [setRefresh]);
  const [search, setSearch] = useState("");
  const _setSearch = useCallback((search: string) => 
    setSearch(search), 
  [setSearch]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    firstPage: 1,
    lastPage: 1
  });
  const _setPagination = useCallback((pagination: Pagination) =>  
    setPagination(pagination),
  [setPagination])
  const _setCurrentPage = useCallback((page: number) => 
    setPagination(p => { 
      return {
        ...p,
        currentPage: page
      };
    }),
  [setPagination]);
  const [user, setUser] = useState<User>({
    id: "",
    image: "",
    email: "",
    emailVerified: new Date(),
    name: "",
    createdAt: new Date()
  });
  const _setUser = useCallback((user: User) => {
    setUser(user);
  }, [setUser]);

  return (
    <appContext.Provider
      value={{
        search,
        setSearch: _setSearch,
        pagination,
        setPagination: _setPagination,
        setCurrentPage: _setCurrentPage,
        user,
        setUser: _setUser,
        refresh,
        setRefresh: _setRefresh,
        setRefreshRemove: _setRefreshRemove,
        setRefreshUpdate: _setRefreshUpdate
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };