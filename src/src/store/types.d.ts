export interface Role {
  name: string;
  r_id: number;
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
  l_id: string;
  uuid: string;
  is_on: boolean;
  is_approved: boolean;
}

export interface LockAccessPOST {
  access_start: string;
  access_stop: string;
  lock: number;
  user: number;
}

export interface LockAccess extends LockAccessPOST {
  a_id: number;
  card_id: string;
  lock_desc: string;
}

export interface Log {
  lock: number;
  user: number;
  try_time: string;
  result: boolean;
}
