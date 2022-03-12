declare type Req = import("next").NextApiRequest;
declare type Res = import("next").NextApiResponse;
declare type Err = { message: string; };
declare type User = import("@prisma/client").User;
declare type Project = import("@prisma/client").Project;

declare interface ReqWithUser extends Req {
  user?: User;
};

declare type Pagination = {
  currentPage: number;
  firstPage: number;
  lastPage: number;
};

/*declare type ApiRouteType = "post" | "get" | "put" | "delete";

declare type ApiRoute = {
  type: ApiRouteType;
  route: string;
};*/

declare interface FormattedProject extends Project {
  formattedName?: string;
  formattedDescription?: string;
  haveExpress?: boolean;
  havePrisma?: boolean;
  fullName?: string;
  
  posts: number;
  gets: number;
  puts: number;
  deletes: number;

  formattedCreatedAt?: string;
}; 

declare type ProjectList = {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  projects: FormattedProject[]
};

declare type Refresh = {
  remove: () => void;
  update: () => void;
};

declare type AppContext = {
  user: User;
  setUser: (user: User) => void;
  search: string;
  setSearch: (search: string) => void;
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  setCurrentPage: (page: number) => void;
  refresh: Refresh;
  setRefresh: (refresh: Refresh) => void;
  setRefreshRemove: (remove: () => void) => void;
  setRefreshUpdate: (udapte: () => void) => void;
};

declare interface AppProviderProps {
  children: import("react").ReactNode;
};

declare interface SelectOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

declare type RouteTypesCount = {
  posts: number;
  gets: number;
  puts: number;
  deletes: number;
};