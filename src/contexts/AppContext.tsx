import { useCallback, useState } from "react";
import { createContext } from "use-context-selector";

export const appContext = createContext({} as AppContext);

function AppProvider({ children }) {
  const [search, setSearch] = useState("");
  const _setSearch = useCallback((search: string) => 
    setSearch(search), 
  [setSearch]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    firstPage: 1,
    lastPage: 1
  });
  const _setCurrentPage = useCallback((page: number) => 
    setPagination(p => { 
      return {
        currentPage: page, 
        ...p
      };
    }),
  [setPagination]);
  const [user, setUser] = useState<User>({
    id: "none",
    username: "loading...",
    email: "loading...",
    avatar: "loading...",
    createdAt: new Date()
  });
  const _setUser = useCallback((user: User) => setUser(user), [setUser]);

  return (
    <appContext.Provider
      value={{
        search,
        setSearch: _setSearch,
        pagination,
        setCurrentPage: _setCurrentPage,
        user,
        setUser: _setUser
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };