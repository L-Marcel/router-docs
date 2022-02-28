declare type User = {
  id?: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
};

declare type Pagination = {
  currentPage: number;
  firstPage: number;
  lastPage: number;
};

declare type AppContext = {
  search: string;
  setSearch: (search: string) => void;
  pagination: Pagination;
  setCurrentPage: (page: number) => void;
  user: User;
  setUser: (user: User) => void;
};

declare interface AppProviderProps {
  children: import("react").ReactNode;
};

declare interface MePageProps {
  user: User;
};
