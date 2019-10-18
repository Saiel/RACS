export interface Role {
  name: string;
}
export interface UserPOST {
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  card_id: string;
  role?: string;
}

export interface User extends UserPOST {
  u_id: number;
  is_superuser: boolean;
}

export interface LockPOST {
  description: string;
  version: string;
}

export interface Lock extends LockPOST {
  id: number;
  is_on: boolean;
}

export interface LockAccessPOST {
  access_start: string;
  access_stop: string;
  lock: number;
  user: number;
}

export interface LockAccess extends LockAccessPOST {
  card_id: string;
}

export interface Log {
  l_id: string;
  u_id: string;
  try_time: string;
  result: boolean;
  first_name: string;
  last_name: string;
  description: string;
}
