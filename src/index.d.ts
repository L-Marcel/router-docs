declare type User = {
  id?: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
};

declare interface MePageProps {
  user: User;
};