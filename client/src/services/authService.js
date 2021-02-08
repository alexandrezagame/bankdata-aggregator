const baseURLDev = 'http://localhost:8080';
const baseURLProd = 'https://monity-backend.herokuapp.com';

export const getAccessToken = async (code) => {
  try {
    const response = await fetch(`${baseURLProd}/api/auth/${code}`);
    if (!response.ok) throw await response.json();
    const { access_token, refresh_token } = await response.json();

    sessionStorage.setItem('access_token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    return null;
  }
};

export const getAccessTokenFromRefresh = async () => {
  try {
    const token = localStorage.getItem('refreshToken');
    if (!token) return null;
    const response = await fetch(`${baseURLProd}/api/auth/refresh/${token}`);
    if (!response.ok) throw await response.json();
    const { access_token, refresh_token } = await response.json();
    sessionStorage.setItem('access_token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
    return access_token;
  } catch (error) {
    return null;
  }
};
