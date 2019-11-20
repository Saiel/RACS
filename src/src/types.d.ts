interface Role {
  name: string;
  r_id: number;
}
interface UserPOST {
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  card_id: string;
  role?: string;
}

interface User extends UserPOST {
  u_id: number;
  is_superuser: boolean;
}

interface LockPOST {
  description: string;
  version: string;
  uuid: string;
  is_approved: boolean;
}

interface Lock extends LockPOST {
  l_id: number;
  is_on: boolean;
}

interface LockAccessPOST {
  access_start: string;
  access_stop: string;
  lock: number;
  user: number;
}

interface LockAccess extends LockAccessPOST {
  a_id: number;
  card_id: string;
  lock_desc: string;
  user_fio: string;
}

interface Log {
  lock: number;
  user: number;
  user_fio: string;
  lock_desc: string;
  try_time: string;
  result: boolean;
}

type deleteFn = (id: string | number) => void;
