import { APIResponse } from "./apiRequest";

type UserQuery = Record<keyof User, string>;
type LockQuery = Record<keyof Lock, string>;
type QueryParams<T> = Record<keyof T, string>;

export const API_URL = 'http://192.168.99.100:8000/api/v1/';
export const BASE_URL = 'http://192.168.99.100:8000/';
// export const API_URL = '/api/v1/';
// export const BASE_URL = '/';

export const API = {
  async get(path: string, params?: Record<string, string>) {
    const url = new URL(`${API_URL}${path}`, window.location.origin);

    if (params) {
      url.search = new URLSearchParams(params).toString();
    }

    const response = await fetch(url.href, {
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('ja')}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json() as Promise<Object>;
  },
  async post(path: string, data: FormData) {
    const url = new URL(path, API_URL);

    const response = await fetch(url.href, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: data
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  },
  async auth(data: FormData) {
    const url = new URL('token/auth/', API_URL);

    const response = await fetch(url.href, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: data
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  },
  async put(path: string, data: FormData) {
    const url = new URL(`${API_URL}${path}`, window.location.origin);

    const response = await fetch(url.href, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      body: data,
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    return response.json();
  },
  delete(path: string) {
    const url = new URL(path, API_URL);

    return fetch(url.href, {
      method: 'DELETE',
      mode: 'cors',
    });
  }
}

export function getRoles() {
  return API.get('roles') as Promise<APIResponse<Role>>;
}

export function getUsers(params?: QueryParams<User>) {
  return API.get('users', params) as Promise<APIResponse<User>>;
}

export function getLocks(params?: QueryParams<Lock>) {
  return API.get('locks', params) as Promise<APIResponse<Lock>>;
}

export function apiGet<T>(path: string, params?: QueryParams<T>) {
  return API.get(path, params) as Promise<APIResponse<T>>;
}

export function apiPost<T>(path: string, data: FormData) {
  return API.post(`${path}/`, data) as Promise<T>;
}

export function apiUpdate<T>(path: string, id: number | string, data: FormData) {	
  return API.put(`${path}/${id}/`, data) as Promise<T>;	
}

export function updateUser(id: string | number, data: FormData) {
  return API.put(`users/${id}/`, data) as Promise<User>;
}