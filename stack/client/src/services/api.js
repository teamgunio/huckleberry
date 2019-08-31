const {
  REACT_APP_API_BASE,
} = process.env;

let authToken = ''

export const setAuthToken = (token) => {
  authToken = token;
}

export const get = async (path, options={}) => {
  return fetch(`${REACT_APP_API_BASE}/${path}`, {
    ...options,
    method: 'GET',
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
    }
  });
};

export const post = async (path, options={}) => {
  return fetch(`${REACT_APP_API_BASE}/${path}`, {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
};

export const put = async (path, options={}) => {
  return fetch(`${REACT_APP_API_BASE}/${path}`, {
    ...options,
    method: 'PUT',
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
};

export const del = async (path, options={}) => {
  return fetch(`${REACT_APP_API_BASE}/${path}`, {
    ...options,
    method: 'DELETE',
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  })
};
