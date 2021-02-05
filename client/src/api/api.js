const baseUrl = 'http://localhost:8080/api/auth/';

export const fetchData = async (query, token) => {
  const response = await fetch(`${baseUrl}${query}/${token}`);
  const data = await response.json();
  return data;
};
