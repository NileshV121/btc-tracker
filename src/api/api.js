const getHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Content-Type"
  };
};

function statusHelper(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

export const apiCall = (url, method, body) => (
  fetch(`${url}`, {
    method,
    headers: getHeaders(),
    body: body,
    mode: 'cors',
  })
    .then(statusHelper)
    .catch(error => error)
    .then(response => response.json())
    .then(data => data)
);

export const getApiCall = (url, body) => {
  const data = JSON.stringify(body);
  return apiCall(url, 'GET', data);
}