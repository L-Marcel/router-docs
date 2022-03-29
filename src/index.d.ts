

declare type Req = import("next").NextApiRequest;
declare type Res = import("next").NextApiResponse;
declare type Err = { message: string; };
declare type User = import("@prisma/client").User;
declare type Project = import("@prisma/client").Project;
declare type ProjectVersion = import("@prisma/client").ProjectVersion;
declare type Route = import("@prisma/client").Route;

declare interface ProjectWithVersions extends Project {
  versions: ProjectVersion[] | ProjectVersionWithRoutes[];
};

declare interface ProjectVersionWithRoutes extends ProjectVersion {
  routes: Route[];
};

declare interface ReqWithUser extends Req {
  user?: User;
  client?: string;
};

declare interface ResWithSocket extends Res {
  socket?: {
    server: {
      io: import("socket.io").Server<any>;
    };
  };
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
  posts: number;
  gets: number;
  puts: number;
  deletes: number;
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
  signOut: () => void;
  realtimeProgressState: RealtimeProgressState;
  setRealtimeProgressState: (
    realtimeProgressState: RealtimeProgressState
  ) => void;
  resetRealtimeProgressState: () => void;
  callToast: (data: ToastData) => void;
};

declare interface AppProviderProps {
  children: import("react").ReactNode;
};

declare type ProjectOwnerContext = {
  isSmallVersion: boolean;
  showNavigation: boolean;
  changeShowNavigation: () => void;
  project: ProjectWithVersions;
  setProject: (project: ProjectWithVersions) => void;
  getRoutes: (versionId: string) => Route[];
  setRoutes: (versionId: string, routes: Route[]) => void;
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

declare type Repository = {
  id: string;
  name: string;
  fullName: string;
  haveExpress: boolean;
  havePrisma: boolean;
  version: string;
  inUse?: boolean;
};

declare type RepositoryVersion = {
  fullName: string;
  haveExpress: boolean;
  havePrisma: boolean;
  version: string;
};

declare type Middleware = (
  req: ReqWithUser, 
  res: Res, 
  next: () => Promise<void>
) => Promise<void>;

declare type RealtimeProgress<T = any> = {
  progress: number;
  message?: string;
  data?: T;
};

declare interface RealtimeProgressState<T = any> extends RealtimeProgress {
  state: "Inactivity" | "Loading" | "Finished";
};

declare type GithubUser = {
  login: string;
  id: number | string;
  avatar_url: string;
  repos_url: string;
  name: string;
};

declare type ToastData = {
  title: string;
  description?: string;
  status?: number;
  type: "info" | "warning" | "error" | "success";
  onClose?: () => void;
  duration?: number;
};