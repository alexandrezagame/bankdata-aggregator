const baseURLDev = 'http://localhost:8080/api/auth';
const baseURLProd = 'https://monity-backend.herokuapp.com/api/auth';

export const fetchData = async (query, token) => {
  const response = await fetch(`${baseURLDev}/${query}/${token}`);
  const data = await response.json();
  return data;
};
