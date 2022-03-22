import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { useLocalStorage } from "react-use";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { sleep } from "../utils/sleep";

export const appContext = createContext({} as AppContext);

function AppProvider({ children }) {
  const router = useRouter();
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
  const _setRefreshUpdate = useCallback((update: () => void) => 
    setRefresh(r => {
      return {
        ...r,
        update
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
  const [user, setUser, removeUser] = useLocalStorage<User>("user", {
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
  const [realtimeProgressState, setRealtimeProgressState] = useState<RealtimeProgressState>({
    progress: 0,
    message: "...",
    state: "Inactivity"
  });
  const _setRealtimeProgressState = useCallback((
      realtimeProgressState: Partial<RealtimeProgressState>
    ) => {
    setRealtimeProgressState(rps => {
      return {
        ...rps,
        message: "...",
        ...realtimeProgressState
      };
    });
  }, [setRealtimeProgressState]);

  const _resetRealtimeProgressState = useCallback(() => {
    setRealtimeProgressState({
      progress: 0,
      state: "Inactivity",
      data: undefined,
      message: undefined
    });
  }, [setRealtimeProgressState]);

  const callSignOut = useCallback(() => {
    signOut().then(() => {
      router.push("/");
      refresh.remove();
      removeUser();
    });
  }, [signOut, refresh, removeUser]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && router.asPath !== "/") {
      signIn("github"); // Force sign in to hopefully resolve error
    };
  }, [session, router]);
  
  useEffect(() => {
    api.defaults.headers.common["user"] = user.id;
  }, [user, api]);

  useEffect(() => {
    if(realtimeProgressState.progress >= 100) {
      sleep(5000).then(() => {
        _resetRealtimeProgressState();
      });
    };
  }, [
    sleep, 
    _resetRealtimeProgressState,
    realtimeProgressState.progress
  ]);

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
        setRefreshUpdate: _setRefreshUpdate,
        signOut: callSignOut,
        realtimeProgressState,
        setRealtimeProgressState: _setRealtimeProgressState,
        resetRealtimeProgressState: _resetRealtimeProgressState
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };