export interface ISignIn {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  full_name: string;
  role: number;
  balance: number;
}

export interface IAUTH {
  info: IUser;
  loadingBtn: boolean;
  statusCode?: number;
  message: string;
}

export interface IPost {
  full_name: string;
  description: string;
  user_id: string;
  _id: string;
  status: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostReq{
  title: string;
  description: string;
  user_id: string;
}

export interface IUser {
  email: string;
  full_name: string;
  role: string;
  balance: number;
  _id: string;
}

export interface IComment {
  comment: string;
  user_id: string;
  full_name: string;
  post_id: string
  _id: string;
  createdAt: string;
  updatedAt: string;
}
