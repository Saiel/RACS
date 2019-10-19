import { User, Log, Lock, LockAccess, UserPOST, Role, LockAccessPOST, LockPOST } from 'store/types';

export const API_HOST = '';
export const API_BASE = 'api/v1/';

// TO-DO: move to separate files

export const codeToMessage: Record<number, string> = {
  400: 'Некорректный запрос',
  404: 'Ресурс не найден',
  500: 'Ошибка на сервере',
};

export type Models = 'users' | 'logs' | 'locks' | 'accesses' | 'roles';

export type POSTModels = {
  users: UserPOST;
  logs: Log;
  locks: LockPOST;
  accesses: LockAccessPOST;
  roles: Role;
};

export type ModelTypes = {
  users: User;
  logs: Log;
  locks: Lock;
  accesses: LockAccess;
  roles: Role;
};

export type APIResponse<T> = {
  results: Array<T>;
  next: string | null;
  previous: string | null;
  count: number;
};

export type APIResponses = {
  users: APIResponse<ModelTypes['users']>;
  logs: APIResponse<ModelTypes['logs']>;
  locks: APIResponse<ModelTypes['locks']>;
  accesses: APIResponse<ModelTypes['accesses']>;
  roles: APIResponse<ModelTypes['roles']>;
};

export function getAPIUrl(endpoint: string) {
  // return new URL(endpoint, `${API_HOST}${API_BASE}`);
  return new URL(`${API_BASE}${endpoint}`, window.location.origin);
}

// TO-DO: profile

export function apiRequest(url: string, params: RequestInit = {}) {
  return new Promise((resolve, reject) => {
    let status = 0;

    fetch(`${url}/`, params)
      .then((response) => {
        status = response.status;

        if (status === 204) {
          return resolve({ status });
        }
        if (response.ok) {
          return response.json();
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json().then((json) => reject({ ...json, status }));
        }

        throw new Error(codeToMessage[status] ? codeToMessage[status] : `Ошибка: HTTP ${status}`);
      })
      .then((json: Object) => resolve({ ...json, status }))
      .catch((error) => {
        if (typeof error === 'undefined') reject(new Error('Ошибка при выполнении запроса'));
        if (error.message) {
          reject(error);
        } else {
          reject(new Error(error.toString()));
        }
      });
  });
}

export function apiDeleteRequest<T extends Models>(endpoint: T, id: number): Promise<Object> {
  return new Promise((resolve, reject) => {
    const url = getAPIUrl(`${endpoint}/${id}`);

    apiRequest(url.href, { method: 'DELETE' })
      .then((json) => resolve(json as Object))
      .catch((error) => reject(error));
  });
}

// TO-DO: fix unnecessary redirect
export function apiGetRequest<T extends Models>(
  endpoint: T,
  params: Record<string, string | number> = {},
): Promise<APIResponses[T]> {
  return new Promise((resolve, reject) => {
    const url = getAPIUrl(endpoint);

    for (const [param, value] of Object.entries(params)) {
      url.search += `${param}=${value}&`;
    }

    apiRequest(url.href, { mode: 'cors' })
      .then((json) => resolve(json as APIResponses[T]))
      .catch((error) => reject(error));
  });
}

export function apiPostRequest<T extends Models>(
  endpoint: T,
  data: POSTModels[T],
): Promise<ModelTypes[T]> {
  return new Promise((resolve, reject) => {
    const url = getAPIUrl(endpoint);
    console.log('POST data', data);
    apiRequest(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((json) => resolve(json as ModelTypes[T]))
      .catch((error) => reject(error));
  });
}
