import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { useLocalStorage } from "react-use";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { Box, useToast } from "@chakra-ui/react";
import { Toast } from "../components/Toast";


export const appContext = createContext({} as AppContext);

function AppProvider({ children }) {
  const router = useRouter();
  const toast = useToast();
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
  const [user, setUser] = useLocalStorage<User>("user", {
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
      localStorage.setItem("user", JSON.stringify({
        id: "",
        image: "",
        email: "",
        emailVerified: new Date(),
        name: "",
        createdAt: new Date()
      }));
    });
  }, [signOut, refresh]);

  const { data: session } = useSession();

  const callToast = useCallback(({
    onClose,
    title,
    type,
    description,
    status,
    duration
  }: ToastData) => {
    const id = status ?? title;
    const _duration = duration ?? 1000 * (
      (title.includes(" ")? title.split(" ").length:5) +
      (description && description.includes(" ")? description.split(" ").length:0)
    );
  
    !toast.isActive(id) && toast({
      id,
      status: type,
      render: ({ onClose: defaultOnClose }) => {
        return (
          <Toast
            title={title}
            type={type}
            status={status}
            description={description}
            onClose={() => {
              onClose && onClose();
              defaultOnClose();
            }}
          />
        );
      },
      isClosable: true,
      position: "top-right",
      duration: _duration
    });  
  }, [toast]);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && router.asPath !== "/") {
      signIn("github"); // Force sign in to hopefully resolve error
    };
  }, [session, router]);

  useEffect(() => {
    api.interceptors.response.use(config => config, (error) => {
      const { response: res, config } = error;
    
      if(res.status === 401 && !config._notFirstError) {
        error.config._notFirstError = true;

        callToast({
          title: error.message,
          type: "error",
          status: res.status
        });
    
        return api(config).catch(() => {
          signOut().then(() => {
            router.push("/");
            localStorage.removeItem("user");
          });
        });
      } else {
        callToast({
          title: error.message,
          type: "error",
          status: res.status
        });
      }; 
    
      return Promise.reject(error);
    });
  }, [toast, api]);
  
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
        resetRealtimeProgressState: _resetRealtimeProgressState,
        callToast
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };