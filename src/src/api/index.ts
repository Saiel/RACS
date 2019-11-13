import { APIResponse } from "./apiRequest";

export const API_URL = 'http://192.168.99.100:8000/api/v1/';

const API = {
  async get(path: string, params?: Record<string, string>) {
    const url = new URL(path, API_URL);

    if (params) {
      url.search = new URLSearchParams(params).toString();
    }

    const response = await fetch(url.href);

    return response.json();
  },
  async put(path: string, data: FormData) {
    const url = new URL(path, API_URL);

    const response = await fetch(url.href, {
      method: 'PUT',
      mode: 'cors',
      body: data,
    });

    return response.json();
  }
}

export function getRoles() {
  return API.get('roles') as Promise<APIResponse<Role>>;
}

export function updateUser(id: string | number, data: FormData) {
  return API.put(`users/${id}/`, data) as Promise<User>;
}